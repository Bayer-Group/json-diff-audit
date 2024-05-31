const { diff } = require("json-diff")
const { ADD, DELETE, UPDATE, ADDED_SUFFIX, DELETED_SUFFIX } = require("./util/auditConstants")

const validTypes = ["string", "number", "boolean"]

const copy = (value) => (value ? JSON.parse(JSON.stringify(value)) : value)

const collectObjPath = (currentPath, nextStep, index) => {
  console.info(`adding ${nextStep} to path ${currentPath}`)
  if (Number.isInteger(index)) {
    console.info(`adding index ${index} to current path`)
    currentPath[currentPath.length - 1] += `[${index}]`
  }

  currentPath.push(nextStep.replace(ADDED_SUFFIX, "").replace(DELETED_SUFFIX, ""))
  return currentPath
}

const joinPath = (path) => path.join(".")

const eventCanBeProcessed = (value) => {
  const typeCheck = validTypes.includes(typeof value)
  const keyCheck = value
    ? Object.prototype.hasOwnProperty.call(value, '__old') ||
      Object.prototype.hasOwnProperty.call(value, "__new")
    : false

  return typeCheck || keyCheck
}

const createEvent = (field, v, userId, date, objPath, index) => {
  const eventPath = collectObjPath(objPath, field, index)
  return !field.includes(ADDED_SUFFIX) &&
    !field.includes(DELETED_SUFFIX) &&
    !(String(v.__old)?.toLowerCase() != String(v.__new)?.toLowerCase())
    ? null
    : {
        path: joinPath(eventPath),
        user: userId,
        dateAndTime: date,
        field: field.replace(ADDED_SUFFIX, "").replace(DELETED_SUFFIX, ""),
        action: field.includes(ADDED_SUFFIX)
          ? ADD
          : field.includes(DELETED_SUFFIX)
            ? DELETE
            : UPDATE,
        ...(field.includes(ADDED_SUFFIX) && { newValue: v }),
        ...(field.includes(DELETED_SUFFIX) && { oldValue: v }),
        ...(!field.includes(DELETED_SUFFIX) &&
          !field.includes(ADDED_SUFFIX) &&
          String(v.__old).toLowerCase() != String(v.__new).toLowerCase() && {
            oldValue: v.__old,
            newValue: v.__new,
          }),
      }
}

const createNestedEvents = (field, action, userId, date, path, index) => {
  let addEvents = []
  if (field) {
    Object.keys(field)?.forEach((newField, _i) => {
      const pathLoop = copy(path)
      const eventPath = collectObjPath(pathLoop, newField, index)
      if (Array.isArray(field[newField])) {
        field[newField].forEach((nextField, i2) => {
          const pathLoopArr = copy(pathLoop)
          addEvents.push(...createNestedEvents(nextField, action, userId, date, pathLoopArr, i2))
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

const processAuditDiffs = (delta, nextEvent, userId, date, pathArg) => {
  let path = pathArg ? pathArg : []

  let tempEvents = []
  if (!delta) {
    console.info("No difference detected between objects")
    return []
  }
  //process each event of obj delta
  Object.keys(delta)?.forEach((k, index) => {
    const objPath = copy(path)

    //special processing if current delta subfield is array
    if (Array.isArray(delta[k])) {
      //object unchanged in nested arrays are represented by array with " "
      if (delta[k][0] === " ") console.info("Bypassing empty object event")
      //check first element of array for modification operators: "~", "+", "-"
      else if (delta[k][0] === "~") {
        //case for update
        //process second element of delta array, where diff data will be
        Object.keys(delta[k][1])?.forEach((l) => {
          const objPathArr = copy(objPath)
          if (Array.isArray(delta[k][1][l])) {
            tempEvents.push(
              ...processAuditDiffs(
                delta[k][1][l],
                nextEvent[k],
                userId,
                date,
                collectObjPath(objPathArr, l, index)
              )
            )
          } else {
            tempEvents.push(createEvent(l, delta[k][1][l], userId, date, objPathArr, index))
          }
        })
      } else if (["+", "-"].includes(delta[k][0])) {
        //case for addition/deletion
        //handle add/delete for single array element
        if (validTypes.includes(typeof delta[k][1])) {
          const previousField = objPath.pop()
          const suffixToAppend = delta[k][0] === "+" ? ADDED_SUFFIX : DELETED_SUFFIX
          const newField = previousField + suffixToAppend
          tempEvents.push(createEvent(newField, delta[k][1], userId, date, objPath))
        } else {
          //process second element of delta array, where diff data will be
          tempEvents.push(
            ...createNestedEvents(
              delta[k][1],
              delta[k][0] === "+" ? ADD : DELETE,
              userId,
              date,
              objPath,
              index
            )
          )
        }
      } else if (k.includes(ADDED_SUFFIX) || k.includes(DELETED_SUFFIX)) {
        console.info("processing new top level array")
        const eventPath = collectObjPath(objPath, k)
        tempEvents.push(
          ...createNestedEvents(
            delta[k][0],
            k.includes(ADDED_SUFFIX) ? ADD : DELETE,
            userId,
            date,
            eventPath,
            index
          )
        )
      } else {
        //if no modification operators are found, start another processing loop
        tempEvents.push(
          ...processAuditDiffs(delta[k], nextEvent[k], userId, date, collectObjPath(objPath, k))
        )
      }
    }
    //if current delta subfield is ready for event creation, generate audit event
    if (!Array.isArray(delta[k])) {
      if (eventCanBeProcessed(delta[k])) {
        const singleEvent = createEvent(k, delta[k], userId, date, objPath)
        if (singleEvent) tempEvents.push(singleEvent)
      } else {
        //subfield is not in state to create event, start additional processing loop
        tempEvents.push(
          ...processAuditDiffs(delta[k], nextEvent[k], userId, date, collectObjPath(objPath, k))
        )
      }
    }
  })
  return tempEvents
}

const process = (records, domainField = "data") => {
  if (records?.length < 2) {
    return []
  }

  let count = 1
  let events = []

  try {
    while (count < records.length) {
      const delta = diff(records[count - 1][domainField], records[count][domainField])

      console.info("NEW DELTA", JSON.stringify(delta))

      const iterateEvent = processAuditDiffs(
        delta,
        records[count][domainField],
        records[count].userId,
        records[count].date
      )
      events.push(...iterateEvent)

      ++count
    }
  } catch (error) {
    console.info("error processing audit events", error)
    return []
  }

  return events
}

module.exports = { process }
