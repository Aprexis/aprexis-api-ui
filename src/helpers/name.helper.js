import { fieldHelper, valueHelper } from "./"

export const nameHelper = {
  firstName,
  lastName,
  middleName,
  name
}

function firstName(namedModel, prefix = "") {
  return fieldHelper.getField(namedModel, "first_name", prefix)
}

function lastName(namedModel, prefix = "") {
  return fieldHelper.getField(namedModel, "last_name", prefix)
}

function middleName(namedModel, prefix = "") {
  return fieldHelper.getField(namedModel, "middle_name", prefix)
}

function name(namedModel, modelName, prefix = "") {
  if (!valueHelper.isValue(namedModel)) {
    return `No ${modelName}`
  }

  const firstName = nameHelper.firstName(namedModel, prefix)
  const middleName = nameHelper.middleName(namedModel, prefix)
  const lastName = nameHelper.lastName(namedModel, prefix)
  let result = ""
  let resultPrefix = ""

  if (valueHelper.isStringValue(firstName)) {
    result = firstName
    resultPrefix = " "
  }

  if (valueHelper.isStringValue(middleName)) {
    result = `${result}${resultPrefix}${middleName}`
    resultPrefix = " "
  }

  if (valueHelper.isStringValue(lastName)) {
    result = `${result}${resultPrefix}${lastName}`
  }

  return result
}