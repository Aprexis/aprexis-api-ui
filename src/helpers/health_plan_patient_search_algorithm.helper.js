import { fieldHelper } from "./field.helper"

export const healthPlanPatientSearchAlgorithmHelper = {
  canEdit,
  lastRun,
  name,
  type
}

function canEdit(user, healthPlanPatientSearchAlgorithm) {
  return false
}

function lastRun(healthPlanPatientSearchAlgorithm) {
  return fieldHelper.getField(healthPlanPatientSearchAlgorithm, "last_run")
}

function name(healthPlanPatientSearchAlgorithm) {
  return fieldHelper.getField(healthPlanPatientSearchAlgorithm, "name")
}

function type(healthPlanPatientSearchAlgorithm) {
  return fieldHelper.getField(healthPlanPatientSearchAlgorithm, "type")
}
