const { diff } = require("json-diff")
const {
  ADD,
  DELETE,
  UPDATE,
  ADDED_SUFFIX,
  DELETED_SUFFIX,
  VALID_TYPES,
} = require("./util/auditConstants")
const { debugPrinter } = require("./util/debugPrinter")
const { copy, collectObjPath, joinPath, eventCanBeProcessed } = require("./util/helpers")

const createEvent = (field, value, userId, date, objPath, index) => {
  const eventPath = collectObjPath(objPath, field, index)
  if (
    !field.includes(ADDED_SUFFIX) &&
    !field.includes(DELETED_SUFFIX) &&
    !(String(value.__old)?.toLowerCase() != String(value.__new)?.toLowerCase())
  ) {
    return null
  }

  return {
    path: joinPath(eventPath),
    user: userId,
    dateAndTime: date,
    field: field.replace(ADDED_SUFFIX, "").replace(DELETED_SUFFIX, ""),
    action: field.includes(ADDED_SUFFIX) ? ADD : field.includes(DELETED_SUFFIX) ? DELETE : UPDATE,
    ...(field.includes(ADDED_SUFFIX) && { newValue: value }),
    ...(field.includes(DELETED_SUFFIX) && { oldValue: value }),
    ...(!field.includes(DELETED_SUFFIX) &&
      !field.includes(ADDED_SUFFIX) &&
      String(value.__old).toLowerCase() != String(value.__new).toLowerCase() && {
        oldValue: value.__old,
        newValue: value.__new,
      }),
  }
}

const createNestedEvents = (field, action, userId, date, path, index) => {
  const addEvents = []
  if (field) {
    Object.keys(field).forEach((newField) => {
      const pathLoop = copy(path)
      const eventPath = collectObjPath(pathLoop, newField, index)
      if (Array.isArray(field[newField])) {
        field[newField].forEach((nextField, i) => {
          const pathLoopArr = copy(pathLoop)
          addEvents.push(...createNestedEvents(nextField, action, userId, date, pathLoopArr, i))
        })
      } else {
        addEvents.push({
          user: userId,
          dateAndTime: date,
          action: action,
          field: newField,
          ...(action === ADD && { newValue: field[newField] }),
          ...(action === DELETE && { oldValue: field[newField] }),
          path: joinPath(eventPath),
        })
      }
    })
  }
  return addEvents
}

const processAuditDiffs = (delta, userId, date, pathArg = []) => {
  if (!delta) {
    debugPrinter("No difference detected between objects")
    return []
  }

  const tempEvents = []

  // process each event of obj delta
  Object.keys(delta).forEach((currentField, index) => {
    const objPath = copy(pathArg)
    const currentValue = delta[currentField]

    // special processing if current value subfield is array
    if (Array.isArray(currentValue)) {
      handleArrayDiffs(currentValue, currentField, userId, date, objPath, index, tempEvents)
    } else if (eventCanBeProcessed(currentValue)) {
      // if current value subfield is ready for event creation, generate audit event
      const singleEvent = createEvent(currentField, currentValue, userId, date, objPath)
      if (singleEvent) tempEvents.push(singleEvent)
    } else {
      // subfield is not in state to create event, start additional processing loop
      tempEvents.push(
        ...processAuditDiffs(currentValue, userId, date, collectObjPath(objPath, currentField))
      )
    }
  })
  return tempEvents
}

const handleArrayDiffs = (currentValue, currentField, userId, date, objPath, index, tempEvents) => {
  // object unchanged in nested arrays are represented by array with " "
  if (currentValue[0] === " ") debugPrinter("Bypassing empty object event")
  // check first element of array for modification operators: "~", "+", "-"
  else if (currentValue[0] === "~") {
    // case for update
    // process second element of value array, where diff data will be
    Object.keys(currentValue[1]).forEach((newField) => {
      const objPathArr = copy(objPath)
      if (Array.isArray(currentValue[1][newField])) {
        handleNestedArrayDiffs(currentValue, newField, userId, date, objPathArr, index, tempEvents)
      } else {
        tempEvents.push(
          createEvent(newField, currentValue[1][newField], userId, date, objPathArr, index)
        )
      }
    })
  } else if (["+", "-"].includes(currentValue[0])) {
    handleAddDeleteDiffs(currentValue, userId, date, objPath, index, tempEvents)
  } else if (currentField.includes(ADDED_SUFFIX) || currentField.includes(DELETED_SUFFIX)) {
    debugPrinter("processing new top level array")
    const eventPath = collectObjPath(objPath, currentField)
    tempEvents.push(
      ...createNestedEvents(
        currentValue[0],
        currentField.includes(ADDED_SUFFIX) ? ADD : DELETE,
        userId,
        date,
        eventPath,
        index
      )
    )
  } else {
    // if no modification operators are found, start another processing loop
    tempEvents.push(
      ...processAuditDiffs(currentValue, userId, date, collectObjPath(objPath, currentField))
    )
  }
}

const handleNestedArrayDiffs = (
  currentValue,
  newField,
  userId,
  date,
  objPathArr,
  index,
  tempEvents
) => {
  // special processing for add/delete fields for nested arrays and objects
  // decorate subfield with "+" or "-" to indicate addition or deletion before next iteration
  if (newField.includes(ADDED_SUFFIX) || newField.includes(DELETED_SUFFIX)) {
    const temp = currentValue[1][newField].map((item) => [
      newField.includes(ADDED_SUFFIX) ? "+" : "-",
      item,
    ])
    tempEvents.push(
      ...processAuditDiffs(temp, userId, date, collectObjPath(objPathArr, newField, index))
    )
  } else {
    tempEvents.push(
      ...processAuditDiffs(
        currentValue[1][newField],
        userId,
        date,
        collectObjPath(objPathArr, newField, index)
      )
    )
  }
}

const handleAddDeleteDiffs = (currentValue, userId, date, objPath, index, tempEvents) => {
  // case for addition/deletion
  // handle add/delete for single array element
  if (VALID_TYPES.includes(typeof currentValue[1])) {
    const previousField = objPath.pop()
    const suffixToAppend = currentValue[0] === "+" ? ADDED_SUFFIX : DELETED_SUFFIX
    const newField = previousField + suffixToAppend
    tempEvents.push(createEvent(newField, currentValue[1], userId, date, objPath))
  } else {
    // process second element of delta array, where diff data will be
    tempEvents.push(
      ...createNestedEvents(
        currentValue[1],
        currentValue[0] === "+" ? ADD : DELETE,
        userId,
        date,
        objPath,
        index
      )
    )
  }
}

const process = (records, domainField = "data") => {
  if (records?.length < 2) {
    return []
  }

  let count = 1
  const events = []
  try {
    while (count < records.length) {
      const delta = diff(records[count - 1][domainField], records[count][domainField])

      debugPrinter("NEW DELTA", JSON.stringify(delta))

      const iterateEvent = processAuditDiffs(delta, records[count].userId, records[count].date)
      events.push(...iterateEvent)

      ++count
    }
  } catch (error) {
    console.error("error processing audit events", error)
    return []
  }

  return events
}

module.exports = { process }
