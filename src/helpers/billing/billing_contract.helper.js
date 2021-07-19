import { fieldHelper, healthPlanHelper, valueHelper } from "../"
import { dateHelper } from "../date.helper"

export const billingContractHelper = {
  active,
  canEdit,
  healthPlan,
  healthPlanName,
  name,
  startDate,
  stopDate,
  toBreadcrumb
}

function active(billingContract) {
  const active = fieldHelper.getField(billingContract, "active")

  /* TODO:
     the active field does not seem to be in use at this time and is always empty, so we'll assume that it
     means that the contract stop date should be used to determine whether it is active.
  */
  if (!valueHelper.isValue(active) || active == "") {
    const stopDateValue = billingContractHelper.stopDate(billingContract)
    if (!dateHelper.isValidDate(stopDateValue)) {
      // Assume that no stop date is the same as being active.
      return true
    }

    const stopDate = dateHelper.makeDate(stopDateValue)
    const now = new Date()
    return +now <= +stopDate
  }

  return active
}

function canEdit(user, billingContract) {
  return healthPlanHelper.canConfigure(user, billingContractHelper.healthPlan(billingContract))
}

function healthPlan(billingContract) {
  return fieldHelper.getField(billingContract, "health_plan")
}

function healthPlanName(billingContract) {
  return healthPlanHelper.name(billingContractHelper.healthPlan(billingContract))
}

function name(billingContract) {
  return fieldHelper.getField(billingContract, "name")
}

function startDate(billingContract) {
  return fieldHelper.getField(billingContract, "start_date")
}

function stopDate(billingContract) {
  return fieldHelper.getField(billingContract, "stop_date")
}

function toBreadcrumb(billingContract) {
  if (!valueHelper.isValue(billingContract)) {
    return "(no billing contract)"
  }

  return billingContractHelper.name(billingContract)
}
