import { fieldHelper } from "./field.helper"
import { patientHelper } from "./patient.helper"
import { physicianHelper } from "./admin"

export const patientSupplementHelper = {
  canDelete,
  canEdit,
  id,
  modelName,
  name,
  patient,
  patientName,
  physician,
  physicianFirstName,
  physicianLastName,
  physicianMiddleName,
  physicianName,
  physicianNameAndNpi,
  physicianNpi,
  startDate
}

function canDelete(user, patientSupplement) {
  return false
}

function canEdit(user, patientSupplement) {
  return false
}

function id(patientSupplement) {
  return fieldHelper.getField(patientSupplement, "id")
}

function modelName() {
  return "patientSupplement"
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

function physicianFirstName(patientSupplement) {
  return physicianHelper.firstName(patientSupplementHelper.physician(patientSupplement))
}

function physicianLastName(patientSupplement) {
  return physicianHelper.lastName(patientSupplementHelper.physician(patientSupplement))
}

function physicianMiddleName(patientSupplement) {
  return physicianHelper.middleName(patientSupplementHelper.physician(patientSupplement))
}

function physicianName(patientSupplement) {
  return physicianHelper.name(patientSupplementHelper.physician(patientSupplement))
}

function physicianNameAndNpi(patientSupplement) {
  return physicianHelper.nameAndNpi(patientSupplementHelper.physician(patientSupplement))
}

function physicianNpi(patientSupplement) {
  return physicianHelper.npi(patientSupplementHelper.physician(patientSupplement))
}

function startDate(patientSupplement) {
  return fieldHelper.getField(patientSupplement, "start_date")
}
