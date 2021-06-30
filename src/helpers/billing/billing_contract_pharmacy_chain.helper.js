import { billingContractHelper } from "./billing_contract.helper"
import { fieldHelper, pharmacyChainHelper } from "../"

export const billingContractPharmacyChainHelper = {
  canEdit,
  claimsEnabled,
  clinical,
  contract,
  healthPlanName,
  pharmacyChain,
  pharmacyChainName,
  pullsEnabled,
  transactional
}

function canEdit(user, billingContractPharmacyChain) {
  return false
}

function claimsEnabled(billingContractPharmacyChain) {
  return fieldHelper.getField(billingContractPharmacyChain, "claims_enabled")
}

function clinical(billingContractPharmacyChain) {
  return fieldHelper.getField(billingContractPharmacyChain, "clinical")
}

function contract(billingContractPharmacyChain) {
  return fieldHelper.getField(billingContractPharmacyChain, "contract")
}

function healthPlanName(billingContractPharmacyChain) {
  return billingContractHelper.healthPlanName(
    billingContractPharmacyChainHelper.contract(billingContractPharmacyChain)
  )
}

function pharmacyChain(billingContractPharmacyChain) {
  return fieldHelper.getField(billingContractPharmacyChain, "pharmacy")
}

function pharmacyChainName(billingContractPharmacyChain) {
  return pharmacyChainHelper.name(billingContractPharmacyChainHelper.pharmacyChain(billingContractPharmacyChain))
}

function pullsEnabled(billingContractPharmacyChain) {
  return fieldHelper.getField(billingContractPharmacyChain, "pulls_enabled")
}

function transactional(billingContractPharmacyChain) {
  return fieldHelper.getField(billingContractPharmacyChain, "transactional")
}
