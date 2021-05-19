import { addressHelper, fieldHelper, nameHelper } from "./"

export const physicianHelper = {
  city,
  firstName,
  lastName,
  middleName,
  name,
  npi,
  state
}

function city(physician) {
  return addressHelper.city(physician)
}

function firstName(physician, prefix = "") {
  return nameHelper.firstName(physician, prefix)
}

function lastName(physician, prefix = "") {
  return nameHelper.lastName(physician, prefix)
}

function middleName(physician, prefix = "") {
  return nameHelper.middleName(physician, prefix)
}

function name(physician, prefix = "") {
  return nameHelper.name(physician, "physician", prefix)
}

function npi(physician) {
  return fieldHelper.getField(physician, "npi")
}

function state(physician) {
  return addressHelper.state(physician)
}
