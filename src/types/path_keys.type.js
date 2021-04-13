import {
  healthPlanApi,
  patientApi,
  pharmacyChainApi,
  pharmacyStoreApi,
  userApi
} from "../api"
import { diseaseApi } from "../api/admin"

// The explicit filenames is necessary because pathKeys is imported into some of the helpers, which causes a circular
// import that fails to properly load these files if the import is done through the index.js file.
import { diseaseHelper } from "../helpers/admin/disease.helper"
import { healthPlanHelper } from "../helpers/health_plan.helper"
import { patientHelper } from "../helpers/patient.helper"
import { pharmacyChainHelper } from "../helpers/pharmacy_chain.helper"
import { pharmacyStoreHelper } from "../helpers/pharmacy_store.helper"
import { userHelper } from "../helpers/user.helper"

export const pathKeys = {
  "diseases": {
    api: diseaseApi,
    helper: diseaseHelper,
    modelName: "Disease"
  },
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
