import {
  healthPlanApi,
  patientApi,
  pharmacyChainApi,
  pharmacyStoreApi,
  userApi
} from '../api'
import {
  healthPlanHelper,
  patientHelper,
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
  "patients": {
    api: patientApi,
    helper: patientHelper,
    modelName: "Patient"
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
