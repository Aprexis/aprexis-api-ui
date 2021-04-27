import {
  fieldHelper,
  healthPlanHelper,
  patientHelper,
  pharmacyStoreHelper,
  programHelper,
  userHelper,
  valueHelper
} from "./"
import { diagnosisCodeHelper, placeOfServiceHelper } from "./admin"

export const interventionHelper = {
  billLater,
  closedReason,
  closedReasonDetail,
  consentFormInitiatedAt,
  consentFormInitiator,
  consentFormOnFile,
  consultEnded,
  consultSessionDuration,
  consultSessionDurationExact,
  consultSessionDurationFaceToFace,
  consultStarted,
  contactAttempts,
  dateOfService,
  diagnosisCode,
  diagnosisCodeLongDescription,
  dryRunProgramPatientAssignmentId,
  faxBypassed,
  healthPlanName,
  medicarePaymentAmount,
  medicarePaymentStatus,
  newPatient,
  patientName,
  pendingUntil,
  pharmacistAgreedToSubmitClaimAt,
  pharmacistDisplay,
  pharmacyClaimTrackingNumber,
  pharmacyStoreDisplay,
  physiciansResponse,
  physiciansResponseRecordedAt,
  programDisplay,
  programName,
  programType,
  providerFee,
  serviceLocation,
  state,
  userEnded,
  userName,
  userStarted,
  venue
}

function billLater(intervention) {
  return fieldHelper.getField(intervention, "bill_later")
}

function closedReason(intervention) {
  return fieldHelper.getField(intervention, "closed_reason")
}

function closedReasonDetail(intervention) {
  return fieldHelper.getField(intervention, "closed_reason_detail")
}

function consentFormInitiatedAt(intervention) {
  return fieldHelper.getField(intervention, "consent_form_initiated_at")
}

function consentFormInitiator(intervention) {
  return userHelper.fullName(fieldHelper.getField(intervention, "consent_form_initiator"))
}

function consentFormOnFile(intervention) {
  return fieldHelper.getField(intervention, "consent_form_on_file")
}

function consultEnded(intervention) {
  return fieldHelper.getField(intervention, "consult_end_date")
}

function consultSessionDuration(intervention) {
  return fieldHelper.getField(intervention, "consult_session_duration")
}

function consultSessionDurationExact(intervention) {
  return fieldHelper.getField(intervention, "consult_session_duration_exact")
}

function consultSessionDurationFaceToFace(intervention) {
  return fieldHelper.getField(intervention, "consult_session_duration_face_to_face")
}

function consultStarted(intervention) {
  return fieldHelper.getField(intervention, "consult_start_date")
}

function contactAttempts(intervention) {
  return fieldHelper.getField(intervention, "contact_attempts")
}

function dateOfService(intervention) {
  return fieldHelper.getField(intervention, "date_of_service")
}

function diagnosisCode(intervention) {
  return diagnosisCodeHelper.code(fieldHelper.getField(intervention, "diagnosis_code"))
}

function diagnosisCodeLongDescription(intervention) {
  return diagnosisCodeHelper.longDescription(fieldHelper.getField(intervention, "diagnosis_code"))
}

function dryRunProgramPatientAssignmentId(intervention) {
  return fieldHelper.getField(intervention, "dry_run_program_patient_id")
}

function faxBypassed(intervention) {
  return fieldHelper.getField(intervention, "fax_bypassed")
}

function healthPlanName(intervention) {
  return healthPlanHelper.name(fieldHelper.getField(intervention, "health_plan"))
}

function medicarePaymentAmount(intervention) {
  return fieldHelper.getField(intervention, "medicare_payment_amount")
}

function medicarePaymentStatus(intervention) {
  return fieldHelper.getField(intervention, "medicare_payment_status")
}

function newPatient(intervention) {
  return fieldHelper.getField(intervention, "new_patient")
}

function patientName(intervention) {
  return patientHelper.name(fieldHelper.getField(intervention, "patient"))
}

function pharmacistAgreedToSubmitClaimAt(intervention) {
  return fieldHelper.getField(intervention, "pharmacist_agreed_to_submit_claim_at")
}

function pharmacistDisplay(intervention) {
  return userHelper.pharmacistDisplay(fieldHelper.getField(intervention, "pharmacist"))
}

function pendingUntil(intervention) {
  return fieldHelper.getField(intervention, "pending_until")
}

function pharmacyClaimTrackingNumber(intervention) {
  return fieldHelper.getField(intervention, "pharmacy_claim_tracking_number")
}

function pharmacyStoreDisplay(intervention) {
  return pharmacyStoreHelper.display(fieldHelper.getField(intervention, "pharmacy_store"))
}

function physiciansResponse(intervention) {
  return fieldHelper.getField(intervention, "physicians_response")
}

function physiciansResponseRecordedAt(intervention) {
  return fieldHelper.getField(intervention, "physicians_response_recorded_at")
}

function programDisplay(intervention) {
  return programHelper.display(fieldHelper.getField(intervention, "program"))
}

function programName(intervention) {
  return programHelper.name(fieldHelper.getField(intervention, "program"))
}

function programType(intervention) {
  return programHelper.type(fieldHelper.getField(intervention, "program"))
}

function providerFee(intervention) {
  return fieldHelper.getField(intervention, "provider_fee")
}

function serviceLocation(intervention) {
  return placeOfServiceHelper.name(fieldHelper.getField(intervention, "service_location"))
}

function state(intervention) {
  return valueHelper.titleize(fieldHelper.getField(intervention, "state"))
}

function userEnded(intervention) {
  return fieldHelper.getField(intervention, "user_end_date")
}

function userName(intervention) {
  return userHelper.fullName(fieldHelper.getField(intervention, "user"))
}

function userStarted(intervention) {
  return fieldHelper.getField(intervention, "user_start_date")
}

function venue(intervention) {
  return fieldHelper.getField(intervention, "venue")
}
