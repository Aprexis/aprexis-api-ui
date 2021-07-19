import { billingContractHelper } from "./"
import { fieldHelper, valueHelper } from "../"

export const billingContractTermHelper = {
  canEdit,
  contract,
  diagnosis,
  displayPullsEnabled,
  displayPushesEnabled,
  healthPlanName,
  pullsEnabled,
  pushesEnabled,
  type
}

function canEdit(currentUser, billingContractTerm) {
  return false
}

function contract(billingContractTerm) {
  return fieldHelper.getField(billingContractTerm, "contract")
}

function diagnosis(billingContractTerm) {
  return fieldHelper.getField("billingContractTerm", "diagnosis")
}

function displayPullsEnabled(billingContractTerm) {
  return valueHelper.yesNo(billingContractTermHelper.pullsEnabled(billingContractTerm))
}

function displayPushesEnabled(billingContractTerm) {
  return valueHelper.yesNo(billingContractTermHelper.pushesEnabled(billingContractTerm))
}

function healthPlanName(billingContractTerm) {
  return billingContractHelper.healthPlanName(billingContractTermHelper.contract(billingContractTerm))
}

function pullsEnabled(billingContractTerm) {
  return fieldHelper.getField(billingContractTerm, "pulls_enabled")
}

function pushesEnabled(billingContractTerm) {
  return fieldHelper.getField(billingContractTerm, "pushes_enabled")
}

function type(billingContractTerm) {
  return fieldHelper.getField(billingContractTerm, "type")
}
