import { valueHelper } from "./value.helper"
import { fieldHelper } from "./field.helper"
import { patientHelper } from "./patient.helper"

export const medicalClaimHelper = {
  canBeCreated,
  canDelete,
  canEdit,
  claimNumber,
  healthPlanPatientMedicalClaimIdentifier,
  memberNumber,
  modelName,
  patient,
  patientName,
  personNumber,
  processedDate,
  providerNpi,
  serviceDate,
  uploadId,
  uploadType,
  wasUploaded
}

function canBeCreated(user, pathEntries) {
  return false
}

function canDelete(user, medicalClaim) {
  return false
}

function canEdit(user, medicalClaim) {
  return false
}

function claimNumber(medicalClaim) {
  return fieldHelper.getField(medicalClaim, "claim_number")
}

function healthPlanPatientMedicalClaimIdentifier(medicalClaim) {
  return fieldHelper.getField(medicalClaim, "health_plan_patient_medical_claim_identifier")
}

function memberNumber(medicalClaim) {
  return fieldHelper.getField(medicalClaim, "member_number")
}

function modelName() {
  return "medicalClaim"
}

function patient(medicalClaim) {
  return fieldHelper.getField(medicalClaim, "patient")
}

function patientName(medicalClaim) {
  return patientHelper.name(medicalClaimHelper.patient(medicalClaim))
}

function personNumber(medicalClaim) {
  return fieldHelper.getField(medicalClaim, "person_number")
}

function processedDate(medicalClaim) {
  return fieldHelper.getField(medicalClaim, "processed_date")
}

function providerNpi(medicalClaim) {
  return fieldHelper.getField(medicalClaim, "provider_npi")
}

function serviceDate(medicalClaim) {
  return fieldHelper.getField(medicalClaim, "service_date")
}

function uploadId(medicalClaim) {
  return fieldHelper.getField(medicalClaim, "upload_id")
}

function uploadType(medicalClaim) {
  return fieldHelper.getField(medicalClaim, "upload_type")
}

function wasUploaded(pharmacyClaim) {
  return valueHelper.isStringValue(medicalClaimHelper.uploadType(pharmacyClaim)) &&
    valueHelper.isValue(medicalClaimHelper.uploadId(pharmacyClaim))
}
