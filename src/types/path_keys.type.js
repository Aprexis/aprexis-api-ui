import { healthPlanApi, pharmacyChainApi, userApi } from '../api'
import { healthPlanHelper, pharmacyChainHelper, userHelper } from '../helpers'

export const pathKeys = {
  "health-plans": {
    api: healthPlanApi,
    helper: healthPlanHelper,
    modelName: "HealthPlan"
  },
  "pharmacy-chains": {
    api: pharmacyChainApi,
    helper: pharmacyChainHelper,
    modelName: "PharmacyChain"
  },
  "users": {
    api: userApi,
    helper: userHelper,
    modelName: "User"
  }
}
