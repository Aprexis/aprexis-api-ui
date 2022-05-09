import { fieldHelper } from "./field.helper"
import { diseaseHelper } from "./disease.helper"
import { patientHelper } from "./patient.helper"

export const patientDiseaseHelper = {
  canBeCreated,
  canDelete,
  canEdit,
  disease,
  diseaseDescription,
  diseaseName,
  modelName,
  patient,
  patientName
}

function canBeCreated(_user, _pathEntries) {
  return false
}

function canDelete(_user, _patientDisease) {
  return false
}

function canEdit(_user, _patientDisease) {
  return false
}

function disease(patientDisease) {
  return fieldHelper.getField(patientDisease, "disease")
}

function diseaseDescription(patientDisease) {
  return diseaseHelper.description(patientDiseaseHelper.disease(patientDisease))
}

function diseaseName(patientDisease) {
  return diseaseHelper.name(patientDiseaseHelper.disease(patientDisease))
}

function modelName() {
  return "patientDisease"
}

function patient(patientDisease) {
  return fieldHelper.getField(patientDisease, "patient")
}

function patientName(patientDisease) {
  return patientHelper.name(patientDiseaseHelper.patient(patientDisease))
}
