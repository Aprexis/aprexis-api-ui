import { fieldHelper } from "./field.helper"
import { diseaseHelper } from "./disease.helper"

export const patientDiseaseHelper = {
  canBeCreated,
  canDelete,
  canEdit,
  disease,
  diseaseDescription,
  diseaseName,
  modelName
}

function canBeCreated(user, pathEntries) {
  return false
}

function canDelete(user, patientDisease) {
  return false
}

function canEdit(user, patientDisease) {
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
