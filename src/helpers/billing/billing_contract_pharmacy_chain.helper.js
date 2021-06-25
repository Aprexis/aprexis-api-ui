import { fieldHelper, pharmacyChainHelper } from "../"

export const billingContractPharmacyChainHelper = {
  canEdit,
  claimsEnabled,
  clinical,
  pharmacyChainName,
  pullsEnabled,
  transactional
}

function canEdit(currentUser, billingContractPharmacyChain) {
  return false
}

function claimsEnabled(billingContractPharmacyChain) {
  return fieldHelper.getField(billingContractPharmacyChain, "claims_enabled")
}

function clinical(billingContractPharmacyChain) {
  return fieldHelper.getField(billingContractPharmacyChain, "clinical")
}

function pharmacyChainName(billingContractPharmacyChain) {
  return pharmacyChainHelper.name(fieldHelper.getField(billingContractPharmacyChain, "pharmacy"))
}

function pullsEnabled(billingContractPharmacyChain) {
  return fieldHelper.getField(billingContractPharmacyChain, "pulls_enabled")
}

function transactional(billingContractPharmacyChain) {
  return fieldHelper.getField(billingContractPharmacyChain, "transactional")
}
