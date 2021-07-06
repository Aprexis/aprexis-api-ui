import { fieldHelper, patientHelper, valueHelper } from "./"

export const medicalClaimHelper = {
  canBeCreated,
  canEdit,
  claimNumber,
  healthPlanPatientMedicalClaimIdentifier,
  memberNumber,
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

function canBeCreated(currentUser, pathEntries) {
  return false
}

function canEdit(currentUser, medicalClaim) {
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
