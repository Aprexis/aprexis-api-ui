import {
  dateHelper,
  fieldHelper,
  healthPlanHelper,
  interventionHelper,
  patientHelper,
  pharmacyStoreHelper
} from "../"

export const billingClaimHelper = {
  amountPaid,
  canEdit,
  displaySubmittedAt,
  healthPlan,
  healthPlanName,
  intervention,
  interventionIdentification,
  patient,
  patientName,
  pharmacyStore,
  pharmacyStoreIdentification,
  submittedAt,
  totalCharge
}

function amountPaid(billingClaim) {
  return fieldHelper.getField(billingClaim, "amount_paid")
}

function canEdit(currentUser, billingClaim) {
  return false
}

function displaySubmittedAt(billingClaim) {
  return dateHelper.displayDateTime(billingClaimHelper.submittedAt(billingClaim))
}

function healthPlan(billingClaim) {
  return fieldHelper.getField(billingClaim, "health_plan")
}

function healthPlanName(billingClaim) {
  return healthPlanHelper.name(billingClaimHelper.healthPlan(billingClaim))
}

function intervention(billingClaim) {
  return fieldHelper.getField(billingClaim, "intervention")
}

function interventionIdentification(billingClaim) {
  return interventionHelper.identification(billingClaimHelper.intervention(billingClaim))
}

function patient(billingClaim) {
  return fieldHelper.getField(billingClaim, "patient")
}

function patientName(billingClaim) {
  return patientHelper.name(billingClaimHelper.patient(billingClaim))
}

function pharmacyStore(billingClaim) {
  return fieldHelper.getField(billingClaim, "pharmacy_store")
}

function pharmacyStoreIdentification(billingClaim) {
  return pharmacyStoreHelper.identifier(billingClaimHelper.pharmacyStore(billingClaim))
}

function submittedAt(billingClaim) {
  return fieldHelper.getField(billingClaim, "submitted_at")
}

function totalCharge(billingClaim) {
  return fieldHelper.getField(billingClaim, "total_charge")
}
