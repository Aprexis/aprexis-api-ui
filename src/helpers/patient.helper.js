import { addressHelper, contactHelper, fieldHelper, nameHelper, valueHelper } from "./"

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
  return nameHelper.firstName(patient, prefix)
}

function gender(patient, prefix = "") {
  if (!valueHelper.isValue(patient)) {
    return ""
  }

  return fieldHelper.getField(patient, "gender", prefix)
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
  return nameHelper.lastName(patient, prefix)
}

function middleName(patient, prefix = "") {
  return nameHelper.middleName(patient, prefix)
}

function name(patient, prefix = "") {
  return nameHelper.name(patient, "patient", prefix)
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
