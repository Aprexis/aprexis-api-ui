import { fieldHelper } from "./field.helper"
import { patientHelper } from "./patient.helper"
import { valueHelper } from "./value.helper"

export const patientHealthPlanInsuranceDetailHelper = {
  canBeCreated,
  canDelete,
  canEdit,
  displayType,
  hasCommercialInsurance,
  hasMedicare,
  modelName,
  patient,
  patientName,
  planName,
  primaryInsuranceType,
  type
}

function canBeCreated(_user, _pathEntries) {
  return false
}

function canDelete(_user, _patientHealthPlanInsuranceDetail) {
  return false
}

function canEdit(_user, _patientHealthPlanInsuranceDetail) {
  return false
}

function displayType(patientHealthPlanInsuranceDetail) {
  return valueHelper.titleize(patientHealthPlanInsuranceDetailHelper.type(patientHealthPlanInsuranceDetail))
}

function hasCommercialInsurance(patientHealthPlanInsuranceDetail) {
  return fieldHelper.getField(patientHealthPlanInsuranceDetail, "has_commercial_insurance")
}

function hasMedicare(patientHealthPlanInsuranceDetail) {
  return fieldHelper.getField(patientHealthPlanInsuranceDetail, "has_medicate")
}

function modelName() {
  return 'patientHealthPlanInsuranceDetail'
}

function patient(patientHealthPlanInsuranceDetail) {
  return fieldHelper.getField(patientHealthPlanInsuranceDetail, "patient")
}

function patientName(patientHealthPlanInsuranceDetail) {
  return patientHelper.name(patientHealthPlanInsuranceDetailHelper.patient(patientHealthPlanInsuranceDetail))
}

function planName(patientHealthPlanInsuranceDetail) {
  return fieldHelper.getField(patientHealthPlanInsuranceDetail, "plan_name")
}

function primaryInsuranceType(patientHealthPlanInsuranceDetail) {
  return fieldHelper.getField(patientHealthPlanInsuranceDetail, "primary_insurance_type")
}

function type(patientHealthPlanInsuranceDetail) {
  return fieldHelper.getField(patientHealthPlanInsuranceDetail, "type")
}
