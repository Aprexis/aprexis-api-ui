import { fieldHelper } from "./field.helper"

export const healthPlanPatientSearchAlgorithmHelper = {
  canDelete,
  canEdit,
  lastRun,
  modelName,
  name,
  type
}

function canDelete(user, healthPlanPatientSearchAlgorithm) {
  return false
}

function canEdit(user, healthPlanPatientSearchAlgorithm) {
  return false
}

function lastRun(healthPlanPatientSearchAlgorithm) {
  return fieldHelper.getField(healthPlanPatientSearchAlgorithm, "last_run")
}

function modelName() {
  return "healthPlanPatientSearchAlgorithm"
}

function name(healthPlanPatientSearchAlgorithm) {
  return fieldHelper.getField(healthPlanPatientSearchAlgorithm, "name")
}

function type(healthPlanPatientSearchAlgorithm) {
  return fieldHelper.getField(healthPlanPatientSearchAlgorithm, "type")
}
