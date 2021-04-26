import {
  healthPlanHelper,
  patientHelper,
  pharmacyStoreHelper,
  programHelper,
  userHelper,
  valueHelper
} from "./"

export const interventionHelper = {
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
  dateOfService,
  healthPlanName,
  patientName,
  pharmacistDisplay,
  pharmacyStoreDisplay,
  programDisplay,
  programName,
  programType,
  state,
  userEnded,
  userName,
  userStarted
}

function closedReason(intervention) {
  return valueHelper.getField(intervention, "closed_reason")
}

function closedReasonDetail(intervention) {
  return valueHelper.getField(intervention, "closed_reason_detail")
}

function consentFormInitiatedAt(intervention) {
  return valueHelper.getField(intervention, "consent_form_initiated_at")
}

function consentFormInitiator(intervention) {
  return userHelper.fullName(valueHelper.getField(intervention, "consent_form_initiator"))
}

function consentFormOnFile(intervention) {
  return valueHelper.getField(intervention, "consent_form_on_file")
}

function consultEnded(intervention) {
  return valueHelper.getField(intervention, "consult_end_date")
}

function consultSessionDuration(intervention) {
  return valueHelper.getField(intervention, "consult_session_duration")
}

function consultSessionDurationExact(intervention) {
  return valueHelper.getField(intervention, "consult_session_duration_exact")
}

function consultSessionDurationFaceToFace(intervention) {
  return valueHelper.getField(intervention, "consult_session_duration_face_to_face")
}


function consultStarted(intervention) {
  return valueHelper.getField(intervention, "consult_start_date")
}

function dateOfService(intervention) {
  return valueHelper.getField(intervention, "date_of_service")
}

function healthPlanName(intervention) {
  return healthPlanHelper.name(valueHelper.getField(intervention, "health_plan"))
}

function patientName(intervention) {
  return patientHelper.name(valueHelper.getField(intervention, "patient"))
}

function pharmacistDisplay(intervention) {
  return userHelper.pharmacistDisplay(valueHelper.getField(intervention, "pharmacist"))
}

function pharmacyStoreDisplay(intervention) {
  return pharmacyStoreHelper.display(valueHelper.getField(intervention, "pharmacy_store"))
}

function programDisplay(intervention) {
  return programHelper.display(valueHelper.getField(intervention, "program"))
}

function programName(intervention) {
  return programHelper.name(valueHelper.getField(intervention, "program"))
}

function programType(intervention) {
  return programHelper.type(valueHelper.getField(intervention, "program"))
}

function state(intervention) {
  return valueHelper.titleize(valueHelper.getField(intervention, "state"))
}

function userEnded(intervention) {
  return valueHelper.getField(intervention, "user_end_date")
}

function userName(intervention) {
  return userHelper.fullName(valueHelper.getField(intervention, "user"))
}

function userStarted(intervention) {
  return valueHelper.getField(intervention, "user_start_date")
}
