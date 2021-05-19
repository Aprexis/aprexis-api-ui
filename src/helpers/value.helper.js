export const valueHelper = {
  capitalizeWords,
  changedModelName,
  compareWithCast,
  getCircularReplacer,
  hashGet,
  hashSet,
  humanize,
  importantProps,
  isFunction,
  isSet,
  isNumberValue,
  isStringValue,
  isValue,
  makeString,
  snakeCase,
  splitCapitalized,
  titleize,
  yesNo
}

function capitalizeWords(str) {
  if (!valueHelper.isStringValue(str)) {
    return str
  }

  return str.replace(/\w\S*/g, (txt) => { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase() })
}

function changedModelName(modelName) {
  return `changed${modelName.charAt(0).toUpperCase()}${modelName.substring(1)}`
}

function compareWithCast(value1, value2) {
  switch (typeof value1) {
    case "undefined":
      return !valueHelper.isValue(value2)

    case "boolean":
      return value1 == valueHelper.isSet(value2)

    default:
      return value1 == value2
  }
}

function getCircularReplacer() {
  const seen = new WeakSet()
  return (key, value) => {
    if (typeof value === 'object' && valueHelper.isValue(value)) {
      if (seen.has(value)) {
        return key
      }

      seen.add(value)
    }

    return value
  }
}

function hashSet(hash, field, value) {
  if (typeof field === 'string') {
    valueHelper.hashSet(hash, field.split("."), value)
    return
  }

  if (field.length === 1) {
    hash[field[0]] = value
    return
  }

  if (!valueHelper.isValue(hash[field[0]])) {
    hash[field[0]] = {}
  }
  valueHelper.hashSet(hash[field[0]], field.slice(1), value)
}

function hashGet(hash, field) {
  if (typeof field === 'string') {
    return valueHelper.hashGet(hash, field.split("."))
  }

  if (field.length === 1) {
    return hash[field[0]]
  }

  return valueHelper.hashGet(hash[field[0]], field.slice(1))
}

function humanize(str) {
  if (!valueHelper.isStringValue(str)) {
    return ""
  }

  const myStr = str.replaceAll("_", " ").replace(/\s{2,}/g, " ")
  const myStrSplit = valueHelper.splitCapitalized(myStr)
  if (myStrSplit.length === 0) {
    return ""
  }
  const firstWord = valueHelper.capitalizeWords(myStrSplit.shift())
  if (myStrSplit.length === 0) {
    return firstWord
  }

  const additionalWords = myStrSplit.map((word) => word.toLowerCase())
  return `${firstWord} ${additionalWords.join(" ")}`
}

function isNumberValue(value) {
  if (!valueHelper.isValue(value)) {
    return false
  }

  return !isNaN(value)
}

function importantProps(props) {
  const {
    clearAlert,
    error,
    modalClose,
    modalIsOpen,
    modalOpen
  } = props

  return {
    clearAlert,
    error,
    modalClose,
    modalIsOpen,
    modalOpen
  }
}

function isFunction(value) {
  return valueHelper.isValue(value) && typeof value === 'function'
}

function isSet(value) {
  if (valueHelper.isStringValue(value)) {
    return !['FALSE', 'NO', 'F'].includes(value.trim().toUpperCase())
  }

  return !!value
}

function isStringValue(value) {
  return valueHelper.isValue(value) && typeof value === 'string' && value.trim() !== ''
}

function isValue(value) {
  return typeof value !== 'undefined' && value !== null && value != 'null'
}

function makeString(value) {
  if (!valueHelper.isValue(value)) {
    return ''
  }

  if (!valueHelper.isStringValue(value)) {
    return `${value}`
  }

  return value
}

function snakeCase(str) {
  return str.replace(" ", "_").replace("-", "_").toLowerCase()
}

function splitCapitalized(str) {
  return str.split(/(?=[A-Z ])/)
}

function titleize(str) {
  return valueHelper.capitalizeWords(valueHelper.humanize(str))
}

function yesNo(value) {
  if (valueHelper.isSet(value)) {
    return "Yes"
  }

  return "No"
}
