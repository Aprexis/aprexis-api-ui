import { valueHelper } from "./value.helper"
import { fieldHelper } from "./field.helper"
import { nameHelper } from "./name.helper"
import { patientHelper } from "./patient.helper"

export const caregiverHelper = {
  canDelete,
  canEdit,
  displayIsCurrentCaregiver,
  isCurrentCaregiver,
  modelName,
  name,
  patient,
  patientName,
  relationship,
  usePatientAddress
}

function canDelete(user, caregiver) {
  return false
}

function canEdit(user, caregiver) {
  return false
}

function displayIsCurrentCaregiver(caregiver) {
  return valueHelper.yesNo(caregiverHelper.isCurrentCaregiver(caregiver))
}

function isCurrentCaregiver(caregiver) {
  return fieldHelper.getField(caregiver, "is_current_caregiver")
}

function modelName() {
  return "caregiver"
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

function usePatientAddress(caregiver) {
  return fieldHelper.getField(caregiver, "use_patient_address")
}
