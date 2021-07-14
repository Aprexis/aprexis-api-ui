import { fieldHelper, patientHelper, physicianHelper } from "./"
import { valueHelper } from "./value.helper"

export const patientSupplementHelper = {
  canEdit,
  name,
  patient,
  patientName,
  physician,
  physicianNameAndNpi,
  startDate
}

function canEdit(currentUser, patientSupplement) {
  return false
}

function name(patientSupplement) {
  return fieldHelper.getField(patientSupplement, "name")
}

function patient(patientSupplement) {
  return fieldHelper.getField(patientSupplement, "patient")
}

function patientName(patientSupplement) {
  return patientHelper.name(patientSupplementHelper.patient(patientSupplement))
}

function physician(patientSupplement) {
  return fieldHelper.getField(patientSupplement, "physician")
}

function physicianNameAndNpi(patientSupplement) {
  const physician = patientSupplementHelper.physician(patientSupplement)
  if (!valueHelper.isValue(physician)) {
    return ""
  }

  return physicianHelper.nameAndNpi(physician)
}

function startDate(patientSupplement) {
  return fieldHelper.getField(patientSupplement, "start_date")
}
