import { billingContractHelper } from "./billing_contract.helper"
import { apiHelper, fieldHelper, pharmacyChainHelper, userHelper, valueHelper } from "../"

const billingContractPharmacyChainEditableFields = [
  "claims_enabled",
  "clinical",
  "pulls_enabled",
  "transactional"
]

const billingContractPharmacyChainKeys = [
  "id",
  "contract_id",
  "pharmacy_id",
  "clinical",
  "claims_enabled",
  "pulls_enabled",
  "transactional"
]

export const billingContractPharmacyChainHelper = {
  buildChanged,
  buildNewChanged,
  canBeCreated,
  canModifyField,
  canDelete,
  canEdit,
  changePharmacyChain,
  claimsEnabled,
  clinical,
  contract,
  contractId,
  healthPlanName,
  id,
  modelName,
  pharmacyChain,
  pharmacyChainId,
  pharmacyChainName,
  pullsEnabled,
  toJSON,
  transactional
}

function buildChanged(billingContractPharmacyChain, changedBillingContractPharmacyChain) {
  if (valueHelper.isValue(changedBillingContractPharmacyChain)) {
    return changedBillingContractPharmacyChain
  }

  if (valueHelper.isValue(billingContractPharmacyChain.id)) {
    return copyIdentifiers(billingContractPharmacyChain)
  }

  return billingContractHelper.buildNewChanged(billingContractPharmacyChain)

  function copyIdentifiers(billingContractPharmacyChain) {
    return {
      id: billingContractPharmacyChainHelper.id(billingContractPharmacyChain),
      contract_id: billingContractPharmacyChainHelper.contractId(billingContractPharmacyChain),
      pharmacy_id: billingContractPharmacyChainHelper.pharmacyChainId(billingContractPharmacyChain)
    }
  }
}

function buildNewChanged(billingContractPharmacyChain) {
  return {
    ...billingContractPharmacyChain
  }
}

function canBeCreated(user, billingContract) {
  if (!billingContractHelper.allowPharmacyChains(billingContract)) {
    return false
  }

  return userHelper.canCreateBillingContractPharmacyChain(user)
}

function canDelete(user, billingContractPharmacyChain) {
  return false
}

function canEdit(user, billingContractPharmacyChain) {
  return userHelper.hasRole(user, 'aprexis_admin')
}

function canModifyField(billingContractPharmacyChain, fieldName) {
  if (!valueHelper.isValue(billingContractPharmacyChainHelper.id(billingContractPharmacyChain))) {
    return true
  }

  return billingContractPharmacyChainEditableFields.includes(fieldName)
}

function changePharmacyChain(billingContractPharmacyChain, changedBillingContractPharmacyChain, pharmacyChain) {
  const myChangedPharmacyChain = this.buildChanged(billingContractPharmacyChain, changedBillingContractPharmacyChain)

  return {
    billingContractPharmacyChain: {
      ...billingContractPharmacyChain,
      pharmacy_id: pharmacyChainHelper.id(pharmacyChain),
      pharmacyChain
    },
    changedBillingContractPharmacyChain: {
      ...myChangedPharmacyChain,
      pharmacy_id: pharmacyChainHelper.id(pharmacyChain),
      pharmacyChain
    }
  }
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

function contractId(billingContractPharmacyChain) {
  return fieldHelper.getField(billingContractPharmacyChain, "contract_id")
}

function healthPlanName(billingContractPharmacyChain) {
  return billingContractHelper.healthPlanName(
    billingContractPharmacyChainHelper.contract(billingContractPharmacyChain)
  )
}

function id(billingContractPharmacyChain) {
  return fieldHelper.getField(billingContractPharmacyChain, "id")
}

function modelName() {
  return "billingContractPharmacy"
}

function pharmacyChain(billingContractPharmacyChain) {
  return fieldHelper.getField(billingContractPharmacyChain, "pharmacy")
}

function pharmacyChainId(billingContractPharmacyChain) {
  return fieldHelper.getField(billingContractPharmacyChain, "pharmacy_id")
}

function pharmacyChainName(billingContractPharmacyChain) {
  return pharmacyChainHelper.name(billingContractPharmacyChainHelper.pharmacyChain(billingContractPharmacyChain))
}

function pullsEnabled(billingContractPharmacyChain) {
  return fieldHelper.getField(billingContractPharmacyChain, "pulls_enabled")
}

function toJSON(billingContractPharmacyChain) {
  return apiHelper.toJSON(billingContractPharmacyChain, billingContractPharmacyChainKeys)
}

function transactional(billingContractPharmacyChain) {
  return fieldHelper.getField(billingContractPharmacyChain, "transactional")
}
