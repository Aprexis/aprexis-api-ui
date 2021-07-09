import { fieldHelper, nameHelper, patientHelper, valueHelper } from "./"

export const caregiverHelper = {
  canEdit,
  displayIsCurrentCaregiver,
  isCurrentCaregiver,
  name,
  patient,
  patientName,
  relationship
}

function canEdit(currentUser, caregiver) {
  return false
}

function displayIsCurrentCaregiver(caregiver) {
  return valueHelper.yesNo(caregiverHelper.isCurrentCaregiver(caregiver))
}

function isCurrentCaregiver(caregiver) {
  return fieldHelper.getField(caregiver, "is_current_caregiver")
}

function name(caregiver) {
  return nameHelper.name(caregiver, "caregiver")
}

function patient(caregiver) {
  return fieldHelper.getField(caregiver, "patient")
}

function patientName(caregiver) {
  return patientHelper.name(caregiverHelper.patient(caregiver))
}

function relationship(caregiver) {
  return fieldHelper.getField(caregiver, "relationship")
}
