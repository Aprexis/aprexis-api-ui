import { fieldHelper, medicationHelper, patientHelper, pharmacyStoreHelper, physicianHelper } from "./"

export const pharmacyClaimHelper = {
  canBeCreated,
  canEdit,
  claimNumber,
  daysSupply,
  fillDate,
  medication,
  medicationLabel,
  memberNumber,
  patient,
  patientName,
  personNumber,
  pharmacyStore,
  pharmacyStoreIdentification,
  physician,
  physicianName,
  ndc
}

function canBeCreated(currentUser, pathEntries) {
  return false
}

function canEdit(currentUser, pharmacyClaim) {
  return false
}

function claimNumber(pharmacyClaim) {
  return fieldHelper.getField(pharmacyClaim, "claim_number")
}

function daysSupply(pharmacyClaim) {
  return fieldHelper.getField(pharmacyClaim, "days_supply")
}

function fillDate(pharmacyClaim) {
  return fieldHelper.getField(pharmacyClaim, "fill_date")
}

function medication(pharmacyClaim) {
  return fieldHelper.getField(pharmacyClaim, "medication")
}

function medicationLabel(pharmacyClaim) {
  return medicationHelper.label(pharmacyClaimHelper.medication(pharmacyClaim))
}

function memberNumber(pharmacyClaim) {
  return fieldHelper.getField(pharmacyClaim, "member_number")
}

function patient(pharmacyClaim) {
  return fieldHelper.getField(pharmacyClaim, "patient")
}

function patientName(pharmacyClaim) {
  return patientHelper.name(pharmacyClaimHelper.patient(pharmacyClaim))
}

function personNumber(pharmacyClaim) {
  return fieldHelper.getField(pharmacyClaim, "person_number")
}

function pharmacyStore(pharmacyClaim) {
  return fieldHelper.getField(pharmacyClaim, "pharmacy_store")
}

function pharmacyStoreIdentification(pharmacyClaim) {
  return pharmacyStoreHelper.identification(pharmacyClaimHelper.pharmacyStore(pharmacyClaim))
}

function ndc(pharmacyClaim) {
  return fieldHelper.getField(pharmacyClaim, "ndc")
}

function physician(pharmacyClaim) {
  return fieldHelper.getField(pharmacyClaim, "physician")
}

function physicianName(pharmacyClaim) {
  return physicianHelper.name(pharmacyClaimHelper.physician(pharmacyClaim))
}
