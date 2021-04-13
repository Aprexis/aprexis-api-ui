import {
  healthPlanApi,
  patientApi,
  pharmacyChainApi,
  pharmacyStoreApi,
  userApi
} from "../api"
import { diagnosisCodeApi, diseaseApi } from "../api/admin"

// The explicit filenames is necessary because pathKeys is imported into some of the helpers, which causes a circular
// import that fails to properly load these files if the import is done through the index.js file.
import { diagnosisCodeHelper } from "../helpers/admin/diagnosis_code.helper"
import { diseaseHelper } from "../helpers/admin/disease.helper"
import { healthPlanHelper } from "../helpers/health_plan.helper"
import { patientHelper } from "../helpers/patient.helper"
import { pharmacyChainHelper } from "../helpers/pharmacy_chain.helper"
import { pharmacyStoreHelper } from "../helpers/pharmacy_store.helper"
import { userHelper } from "../helpers/user.helper"

export const pathKeys = {
  "diagnosis-codes": {
    api: diagnosisCodeApi,
    helper: diagnosisCodeHelper,
    modelName: "DiagnosisCode"
  },
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
