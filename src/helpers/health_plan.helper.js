import { userHelper } from './'

export const healthPlanHelper = {
  canViewHealthPlans
}

function canViewHealthPlans(user) {
  return userHelper.hasRole(user, ['aprexis_admin', 'health_plan_admin', 'health_plan_user'])
}
