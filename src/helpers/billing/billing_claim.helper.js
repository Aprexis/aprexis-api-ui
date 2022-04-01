import React from "react"
import { UncontrolledTooltip } from "reactstrap"
import {
  dateHelper,
  fieldHelper,
  healthPlanHelper,
  interventionHelper,
  patientHelper,
  pharmacyStoreHelper,
  programHelper,
  userHelper
} from "../"
import { valueHelper } from "../value.helper"

export const billingClaimHelper = {
  amountPaid,
  billingStatus,
  canDelete,
  canEdit,
  claimFacility,
  claimFacilityFullAddress,
  claimFacilityName,
  claimFacilityNpi,
  claimPatient,
  claimPatientDateOfBirth,
  claimPatientFullAddress,
  claimPatientMemberNumber,
  claimPatientName,
  claimPatientPersonNumber,
  claimPatientPhone,
  claimPayer,
  claimPayerName,
  claimPharmacist,
  claimPharmacistName,
  claimProgram,
  claimProgramName,
  claimProvider,
  claimProviderEinNumber,
  claimProviderName,
  displayAprexisReferenceNumber,
  displayBillingStatus,
  displayClaimPatientHealthPlanNumber,
  displayPharmacyReferenceNumber,
  displayPayerClaimTrackingNumber,
  displayReferenceNumbers,
  displaySubmittedAt,
  healthPlan,
  healthPlanName,
  intervention,
  interventionIdentification,
  modelName,
  patient,
  patientName,
  payerClaimTrackingNumber,
  pharmacyStore,
  pharmacyStoreIdentification,
  referenceNumber,
  statusDescription,
  submittedAt,
  totalCharge
}

function amountPaid(billingClaim) {
  return fieldHelper.getField(billingClaim, "amount_paid")
}

function billingStatus(billingClaim) {
  return fieldHelper.getField(billingClaim, "billing_status")
}

function canDelete(user, billingClaim) {
  return false
}

function canEdit(user, billingClaim) {
  return false
}

function claimFacility(billingClaim) {
  return fieldHelper.getField(billingClaim, "claim_facility")
}

function claimFacilityFullAddress(billingClaim) {
  return pharmacyStoreHelper.fullAddress(billingClaimHelper.claimFacility(billingClaim))
}

function claimFacilityName(billingClaim) {
  return pharmacyStoreHelper.name(billingClaimHelper.claimFacility(billingClaim))
}

function claimFacilityNpi(billingClaim) {
  return pharmacyStoreHelper.npi(billingClaimHelper.claimFacility(billingClaim))
}

function claimPatient(billingClaim) {
  return fieldHelper.getField(billingClaim, "claim_patient")
}

function claimPatientDateOfBirth(billingClaim) {
  return patientHelper.dateOfBirth(billingClaimHelper.claimPatient(billingClaim))
}

function claimPatientFullAddress(billingClaim) {
  return patientHelper.fullAddress(billingClaimHelper.claimPatient(billingClaim))
}

function claimPatientMemberNumber(billingClaim) {
  return patientHelper.memberNumber(billingClaimHelper.claimPatient(billingClaim))
}

function claimPatientName(billingClaim) {
  return patientHelper.name(billingClaimHelper.claimPatient(billingClaim))
}

function claimPatientPersonNumber(billingClaim) {
  return patientHelper.personNumber(billingClaimHelper.claimPatient(billingClaim))
}

function claimPatientPhone(billingClaim) {
  return patientHelper.phone(billingClaimHelper.claimPatient(billingClaim))
}

function claimPayer(billingClaim) {
  return fieldHelper.getField(billingClaim, "claim_payer")
}

function claimPayerName(billingClaim) {
  return healthPlanHelper.name(billingClaimHelper.claimPayer(billingClaim))
}

function claimPharmacist(billingClaim) {
  return fieldHelper.getField(billingClaim, "claim_pharmacist")
}

function claimPharmacistName(billingClaim) {
  return userHelper.fullName(billingClaimHelper.claimPharmacist(billingClaim))
}

function claimProgram(billingClaim) {
  return fieldHelper.getField(billingClaim, "claim_program")
}

function claimProgramName(billingClaim) {
  return programHelper.name(billingClaimHelper.claimProgram(billingClaim))
}

function claimProvider(billingClaim) {
  return fieldHelper.getField(billingClaim, "claim_provider")
}

function claimProviderEinNumber(billingClaim) {
  return pharmacyStoreHelper.einNumber(billingClaimHelper.claimProvider(billingClaim))
}

function claimProviderName(billingClaim) {
  return pharmacyStoreHelper.name(billingClaimHelper.claimProvider(billingClaim))
}

function displayAprexisReferenceNumber(billingClaim) {
  const referenceNumber = billingClaimHelper.referenceNumber(billingClaim)
  if (!valueHelper.isStringValue(referenceNumber)) {
    return "Not available"
  }

  const dash = referenceNumber.lastIndexOf("-")
  if (dash === -1) {
    return referenceNumber
  }

  return referenceNumber.substring(dash + 1)
}

function displayBillingStatus(billingClaim, showToolTip = false) {
  const billingStatus = billingClaimHelper.billingStatus(billingClaim)
  if (!showToolTip) {
    return billingStatus
  }

  const statusDescription = billingClaimHelper.statusDescription(billingClaim)
  if (!valueHelper.isStringValue(statusDescription)) {
    return billingStatus
  }

  return (
    <React.Fragment>
      <span id="billing-status">{billingStatus}</span>
      <UncontrolledTooltip placement="top" boundariesElement="window" target="billing-status">
        {statusDescription}
      </UncontrolledTooltip>
    </React.Fragment>
  )
}

function displayClaimPatientHealthPlanNumber(billingClaim) {
  const memberNumber = billingClaimHelper.claimPatientMemberNumber(billingClaim)
  const personNumber = billingClaimHelper.claimPatientPersonNumber(billingClaim)

  if (!valueHelper.isStringValue(personNumber)) {
    return memberNumber
  }

  return `${memberNumber}-${personNumber}`
}

function displayPayerClaimTrackingNumber(billingClaim) {
  const payerNumber = billingClaimHelper.payerClaimTrackingNumber(billingClaim)
  if (!valueHelper.isStringValue(payerNumber)) {
    return "Not available"
  }

  return payerNumber
}

function displayPharmacyReferenceNumber(billingClaim) {
  const referenceNumber = billingClaimHelper.referenceNumber(billingClaim)
  if (!valueHelper.isStringValue(referenceNumber)) {
    return "Not available"
  }

  const dash = referenceNumber.lastIndexOf("-")
  if (dash === -1) {
    return 'Not available'
  }

  return referenceNumber.substring(0, dash - 1)
}

function displayReferenceNumbers(billingClaim) {
  const pharmacyNumber = billingClaimHelper.displayPharmacyReferenceNumber(billingClaim)
  const aprexisNumber = billingClaimHelper.displayAprexisReferenceNumber(billingClaim)
  const payerNumber = billingClaimHelper.displayPayerClaimTrackingNumber(billingClaim)

  return (
    <React.Fragment>
      <label>{pharmacyNumber}</label><br />
      <label>{aprexisNumber}</label><br />
      <label>{payerNumber}</label>
    </React.Fragment>
  )
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

function modelName() {
  return "billingClaim"
}

function patient(billingClaim) {
  return fieldHelper.getField(billingClaim, "patient")
}

function patientName(billingClaim) {
  return patientHelper.name(billingClaimHelper.patient(billingClaim))
}

function payerClaimTrackingNumber(billingClaim) {
  return fieldHelper.getField(billingClaim, "payer_claim_tracking_number")
}

function pharmacyStore(billingClaim) {
  return fieldHelper.getField(billingClaim, "pharmacy_store")
}

function pharmacyStoreIdentification(billingClaim) {
  return pharmacyStoreHelper.id(billingClaimHelper.pharmacyStore(billingClaim))
}

function referenceNumber(billingClaim) {
  return fieldHelper.getField(billingClaim, "reference_number")
}

function statusDescription(billingClaim) {
  return fieldHelper.getField(billingClaim, "status_description")
}

function submittedAt(billingClaim) {
  return fieldHelper.getField(billingClaim, "submitted_at")
}

function totalCharge(billingClaim) {
  return fieldHelper.getField(billingClaim, "total_charge")
}
