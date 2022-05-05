import { medicationHelper } from "./admin"
import { fieldHelper } from "./field.helper"
import { interventionHelper } from "./intervention.helper"
import { valueHelper } from "./value.helper"

export const interventionMedicationHelper = {
  canDelete,
  canEdit,
  displayType,
  intervention,
  interventionIdentification,
  medication,
  medicationLabel,
  medicationText,
  modelName,
  patientName,
  pharmacyStoreIdentification,
  type
}

function canDelete(_user, _interventionMedication) {
  return false
}

function canEdit(_user, _interventionMedication) {
  return false
}

function displayType(interventionMedication) {
  return valueHelper.titleize(interventionMedicationHelper.type(interventionMedication))
}

function intervention(interventionMedication) {
  return fieldHelper.getField(interventionMedication, "intervention")
}

function interventionIdentification(interventionMedication) {
  return interventionHelper.identification(interventionMedicationHelper.intervention(interventionMedication))
}

function medication(interventionMedication) {
  return fieldHelper.getField(interventionMedication, "medication")
}

function medicationLabel(interventionMedication) {
  return medicationHelper.label(interventionMedicationHelper.medication(interventionMedication))
}

function medicationText(interventionMedication) {
  return fieldHelper.getField(interventionMedication, "medication_text")
}

function modelName() {
  return "interventionMedication"
}

function patientName(interventionMedication) {
  return interventionHelper.patientName(interventionMedicationHelper.intervention(interventionMedication))
}

function pharmacyStoreIdentification(interventionMedication) {
  return interventionHelper.pharmacyStoreIdentification(interventionMedicationHelper.intervention(interventionMedication))
}

function type(interventionMedication) {
  return fieldHelper.getField(interventionMedication, "type")
}
