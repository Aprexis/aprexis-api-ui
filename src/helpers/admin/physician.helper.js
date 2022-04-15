import { fieldHelper } from "../field.helper"
import { addressHelper } from "../address.helper"
import { dateHelper } from "../date.helper"
import { nameHelper } from "../name.helper"

export const physicianHelper = {
  businessPhone,
  canDelete,
  canEdit,
  city,
  clinic,
  displayNpiDeactivationDate,
  displayNpiReactivationDate,
  firstName,
  fullAddress,
  lastName,
  middleName,
  modelName,
  name,
  nameAndNpi,
  npi,
  npiDeactivationDate,
  npiReactivationDate,
  state
}

function businessPhone(physician) {
  return fieldHelper.getField(physician, "business_phone")
}

function canDelete(user, physician) {
  return false
}

function canEdit(user, physician) {
  return false
}

function city(physician) {
  return addressHelper.city(physician)
}

function clinic(physician) {
  return fieldHelper.getField(physician, "clinic")
}

function displayNpiDeactivationDate(physician) {
  const npiDeactivationDate = physicianHelper.npiDeactivationDate(physician)

  return dateHelper.displayDate(npiDeactivationDate)
}

function displayNpiReactivationDate(physician) {
  const npiDeactivationDate = physicianHelper.npiReactivationDate(physician)

  return dateHelper.displayDate((npiDeactivationDate))
}

function firstName(physician, prefix = "") {
  return nameHelper.firstName(physician, prefix)
}

function fullAddress(physician) {
  return addressHelper.fullAddress(physician)
}

function lastName(physician, prefix = "") {
  return nameHelper.lastName(physician, prefix)
}

function middleName(physician, prefix = "") {
  return nameHelper.middleName(physician, prefix)
}

function modelName() {
  return "physician"
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

function npiDeactivationDate(physician) {
  return fieldHelper.getField(physician, "npi_deactivation_date")
}

function npiReactivationDate(physician) {
  return fieldHelper.getField(physician, "npi_reactivation_date")
}

function state(physician) {
  return addressHelper.state(physician)
}
