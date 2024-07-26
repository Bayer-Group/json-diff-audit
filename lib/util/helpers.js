const { ADDED_SUFFIX, DELETED_SUFFIX, VALID_TYPES } = require("./auditConstants")
const { debugPrinter } = require("./debugPrinter")

const copy = (value) => (value ? JSON.parse(JSON.stringify(value)) : value)

const collectObjPath = (currentPath, nextStep, index) => {
  debugPrinter(`adding ${nextStep} to path ${currentPath}`)
  if (Number.isInteger(index)) {
    debugPrinter(`adding index ${index} to current path`)
    currentPath[currentPath.length - 1] += `[${index}]`
  }

  currentPath.push(nextStep.replace(ADDED_SUFFIX, "").replace(DELETED_SUFFIX, ""))
  return currentPath
}

const joinPath = (path) => path.join(".")

const eventCanBeProcessed = (value) => {
  const typeCheck = VALID_TYPES.includes(typeof value)
  const keyCheck = value
    ? Object.prototype.hasOwnProperty.call(value, "__old") ||
      Object.prototype.hasOwnProperty.call(value, "__new")
    : false

  return typeCheck || keyCheck
}

module.exports = {
  copy,
  collectObjPath,
  joinPath,
  eventCanBeProcessed,
}
