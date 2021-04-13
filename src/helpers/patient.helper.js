import { addressHelper, contactHelper, valueHelper } from "./"

export const patientHelper = {
  firstName,
  gender,
  hasSubscriber,
  hasUser,
  lastName,
  middleName,
  name,
  requiresPersonNumber,
  toBreadcrumb
}

function firstName(patient, prefix = "") {
  if (!valueHelper.isValue(patient)) {
    return ""
  }

  return valueHelper.getField(patient, "first_name", prefix)
}

function gender(patient, prefix = "") {
  if (!valueHelper.isValue(patient)) {
    return ""
  }

  return valueHelper.getField(patient, "gender", prefix)
}

function hasSubscriber(patient) {
  return valueHelper.isStringValue(addressHelper.address(patient, "subscriber")) ||
    valueHelper.isStringValue(addressHelper.city(patient, "subscriber")) ||
    valueHelper.isStringValue(patientHelper.gender(patient, "subscriber")) ||
    valueHelper.isStringValue(contactHelper.name(patient, "subscriber")) ||
    valueHelper.isStringValue(addressHelper.state(patient, "subscriber")) ||
    valueHelper.isStringValue(addressHelper.zipCode(patient, "subscriber"))
}

function hasUser(patient) {
  return valueHelper.isStringValue(addressHelper.address(patient, "user")) ||
    valueHelper.isStringValue(addressHelper.city(patient, "user")) ||
    valueHelper.isStringValue(patientHelper.gender(patient, "subscriber")) ||
    valueHelper.isStringValue(patientHelper.firstName(patient, "user")) ||
    valueHelper.isStringValue(patientHelper.lastName(patient, "user")) ||
    valueHelper.isStringValue(patientHelper.middleName(patient, "user")) ||
    valueHelper.isStringValue(contactHelper.phone(patient, "user")) ||
    valueHelper.isStringValue(addressHelper.state(patient, "user")) ||
    valueHelper.isStringValue(addressHelper.zipCode(patient, "user"))
}

function lastName(patient, prefix = "") {
  if (!valueHelper.isValue(patient)) {
    return ""
  }

  return valueHelper.getField(patient, "last_name", prefix)
}

function middleName(patient, prefix = "") {
  if (!valueHelper.isValue(patient)) {
    return ""
  }

  return valueHelper.getField(patient, "middle_name", prefix)
}

function name(patient, prefix = "") {
  if (!valueHelper.isValue(patient)) {
    return "No patient"
  }

  const firstName = patientHelper.firstName(patient, prefix)
  const middleName = patientHelper.middleName(patient, prefix)
  const lastName = patientHelper.lastName(patient, prefix)
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

function requiresPersonNumber(patient) {
  if (!valueHelper.isValue(patient)) {
    return false
  }

  return valueHelper.isSet(patient.requires_person_number)
}

function toBreadcrumb(patient) {
  if (!valueHelper.isValue(patient)) {
    return "(no patient)"
  }

  return patientHelper.name(patient)
}
