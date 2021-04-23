import {
  dateHelper,
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
  consultEnded,
  consultStarted,
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

function consultEnded(intervention) {
  return dateHelper.displayDateTime(valueHelper.getField(intervention, "consult_end_date"))
}

function consultStarted(intervention) {
  return dateHelper.displayDateTime(valueHelper.getField(intervention, "consult_start_date"))
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
  return dateHelper.displayDateTime(valueHelper.getField(intervention, "user_end_date"))
}

function userName(intervention) {
  return userHelper.fullName(valueHelper.getField(intervention, "user"))
}

function userStarted(intervention) {
  return dateHelper.displayDateTime(valueHelper.getField(intervention, "user_start_date"))
}
