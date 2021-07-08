import { billingContractHelper } from "./billing_contract.helper"
import { fieldHelper, pharmacyStoreHelper } from "../"

export const billingContractPharmacyStoreHelper = {
  canEdit,
  claimsEnabled,
  clinical,
  contract,
  healthPlanName,
  pharmacyStore,
  pharmacyStoreName,
  pharmacyStoreNumber,
  pullsEnabled,
  transactional
}

function canEdit(user, billingContractPharmacyStore) {
  return false
}

function claimsEnabled(billingContractPharmacyStore) {
  return fieldHelper.getField(billingContractPharmacyStore, "claims_enabled")
}

function clinical(billingContractPharmacyStore) {
  return fieldHelper.getField(billingContractPharmacyStore, "clinical")
}

function contract(billingContractPharmacyStore) {
  return fieldHelper.getField(billingContractPharmacyStore, "contract")
}

function healthPlanName(billingContractPharmacyStore) {
  return billingContractHelper.healthPlanName(
    billingContractPharmacyStoreHelper.contract(billingContractPharmacyStore)
  )
}

function pharmacyStore(billingContractPharmacyStore) {
  return fieldHelper.getField(billingContractPharmacyStore, "pharmacy_store")
}

function pharmacyStoreName(billingContractPharmacyStore) {
  return pharmacyStoreHelper.name(billingContractPharmacyStoreHelper.pharmacyStore(billingContractPharmacyStore))
}

function pharmacyStoreNumber(billingContractPharmacyStore) {
  return pharmacyStoreHelper.storeNumber(billingContractPharmacyStoreHelper.pharmacyStore(billingContractPharmacyStore))
}

function pullsEnabled(billingContractPharmacyStore) {
  return fieldHelper.getField(billingContractPharmacyStore, "pulls_enabled")
}

function transactional(billingContractPharmacyStore) {
  return fieldHelper.getField(billingContractPharmacyStore, "transactional")
}
