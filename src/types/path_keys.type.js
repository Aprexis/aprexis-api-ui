import { healthPlanApi, userApi } from '../api'
import { healthPlanHelper, userHelper } from '../helpers'

export const pathKeys = {
  "health-plans": {
    api: healthPlanApi,
    helper: healthPlanHelper,
    modelName: "HealthPlan"
  },
  "users": {
    api: userApi,
    helper: userHelper,
    modelName: "User"
  }
}
