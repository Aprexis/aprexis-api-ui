import { fieldHelper } from "./field.helper"
import { addressHelper } from "./address.helper"
import { nameHelper } from "./name.helper"

export const physicianHelper = {
  city,
  firstName,
  lastName,
  middleName,
  name,
  nameAndNpi,
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

function nameAndNpi(physician) {
  return `${physicianHelper.name(physician)} [${physicianHelper.npi(physician)}]`
}

function npi(physician) {
  return fieldHelper.getField(physician, "npi")
}

function state(physician) {
  return addressHelper.state(physician)
}
