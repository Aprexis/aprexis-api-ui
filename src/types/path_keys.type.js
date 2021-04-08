import {
  healthPlanApi,
  pharmacyChainApi,
  pharmacyStoreApi,
  userApi
} from '../api'
import {
  healthPlanHelper,
  pharmacyChainHelper,
  pharmacyStoreHelper,
  userHelper
} from '../helpers'

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
  "pharmacy-stores": {
    api: pharmacyStoreApi,
    helper: pharmacyStoreHelper,
    modelName: "PharmacyStore"
  },
  "users": {
    api: userApi,
    helper: userHelper,
    modelName: "User"
  }
}
