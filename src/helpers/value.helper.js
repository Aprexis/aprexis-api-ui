export const valueHelper = {
  capitalizeWords,
  isFunction,
  isSet,
  isStringValue,
  isValue,
  makeString
}

function capitalizeWords(str) {
  return str.replace(/\w\S*/g, (txt) => { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase() })
}

function isFunction(value) {
  return valueHelper.isValue(value) && typeof value === 'function'
}

function isSet(value) {
  if (!valueHelper.isValue(value)) {
    return false
  }

  if (valueHelper.isStringValue(value)) {
    return ['TRUE', 'YES'].includes(value.trim().toUpperCase())
  }

  const intValue = parseInt(value)
  if (!isNaN(intValue)) {
    return intValue !== 0
  }

  return value
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
