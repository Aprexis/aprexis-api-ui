import { fieldHelper, userHelper, valueHelper } from "./"

export const healthPlanHelper = {
  canConfigure,
  canIndex,
  name,
  toBreadcrumb
}

function canConfigure(user) {
  return userHelper.hasRole(user, "aprexis_admin")
}

function canIndex(user) {
  return valueHelper.isValue(user)
}

function name(healthPlan) {
  return fieldHelper.getField(healthPlan, "name")
}

function toBreadcrumb(healthPlan) {
  if (!valueHelper.isValue(healthPlan)) {
    return "(no health plan)"
  }

  return healthPlanHelper.name(healthPlan)
}
