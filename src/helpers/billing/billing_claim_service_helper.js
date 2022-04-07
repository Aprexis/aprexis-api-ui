import { dateHelper, fieldHelper, placeOfServiceHelper } from '..'

export const billingClaimServiceHelper = {
  charge,
  cptCode,
  dateOfServiceStart,
  diagnosis,
  displayDateOfServiceStart,
  npi,
  placeOfService,
  placeOfServiceName,
  userMod,
  unit
}

function charge(claimService) {
  return fieldHelper.getField(claimService, "charge")
}

function cptCode(claimService) {
  return fieldHelper.getField(claimService, "cpt_code")
}

function dateOfServiceStart(claimService) {
  return fieldHelper.getField(claimService, "date_of_service_start")
}

function diagnosis(claimService) {
  return fieldHelper.getField(claimService, "diagnosis")
}

function displayDateOfServiceStart(claimService) {
  return dateHelper.displayDate(billingClaimServiceHelper.dateOfServiceStart(claimService))
}

function npi(claimService) {
  return fieldHelper.getField(claimService, "npi")
}

function placeOfService(claimService) {
  return fieldHelper.getField(claimService, "place_of_service")
}

function placeOfServiceName(claimService) {
  return placeOfServiceHelper.name(billingClaimServiceHelper.placeOfService(claimService))
}

function userMod(claimService) {
  return fieldHelper.getField(claimService, "user_mod")
}

function unit(claimService) {
  return fieldHelper.getField(claimService, "unit")
}
