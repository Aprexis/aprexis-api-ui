import { userHelper, valueHelper } from './'

export const healthPlanHelper = {
  canConfigure,
  canIndex,
  name
}

function canConfigure(user) {
  return userHelper.hasRole(user, 'aprexis_admin')
}

function canIndex(user) {
  return true
}

function name(healthPlan) {
  if (!valueHelper.isValue(healthPlan)) {
    return 'No health plan'
  }

  return healthPlan.name
}
