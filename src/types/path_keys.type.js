import {
  answerApi,
  healthPlanApi,
  interventionApi,
  labTestValueApi,
  patientApi,
  patientNoteApi,
  pharmacyChainApi,
  pharmacyStoreApi,
  userApi
} from "../api"
import { diagnosisCodeApi, diseaseApi, labTestApi } from "../api/admin"

// The explicit filenames is necessary because pathKeys is imported into some of the helpers, which causes a circular
// import that fails to properly load these files if the import is done through the index.js file.
import { answerHelper } from "../helpers/answer.helper"
import { diagnosisCodeHelper } from "../helpers/admin/diagnosis_code.helper"
import { diseaseHelper } from "../helpers/admin/disease.helper"
import { healthPlanHelper } from "../helpers/health_plan.helper"
import { interventionHelper } from "../helpers/intervention.helper"
import { labTestHelper } from "../helpers/admin/lab_test.helper"
import { labTestValueHelper } from "../helpers/lab_test_value.helper"
import { patientHelper } from "../helpers/patient.helper"
import { patientNoteHelper } from "../helpers"
import { pharmacyChainHelper } from "../helpers/pharmacy_chain.helper"
import { pharmacyStoreHelper } from "../helpers/pharmacy_store.helper"
import { userHelper } from "../helpers/user.helper"

export const pathKeys = {
  "answers": {
    api: answerApi,
    helper: answerHelper,
    modelName: "Answer"
  },
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
  "interventions": {
    api: interventionApi,
    helper: interventionHelper,
    modelName: "Intervention"
  },
  "lab-tests": {
    api: labTestApi,
    helper: labTestHelper,
    modelName: "LabTest"
  },
  "lab-test-values": {
    api: labTestValueApi,
    breadcrumb: "Tests",
    helper: labTestValueHelper,
    modelName: "LabTestValue"
  },
  "patient-notes": {
    api: patientNoteApi,
    breadcrumb: "Notes",
    helper: patientNoteHelper,
    modelName: "PatientNote"
  },
  "patients": {
    api: patientApi,
    helper: patientHelper,
    modelName: "Patient"
  },
  "pharmacy-chains": {
    api: pharmacyChainApi,
    breadcrumb: "Pharmacies",
    helper: pharmacyChainHelper,
    modelName: "PharmacyChain"
  },
  "pharmacy-stores": {
    api: pharmacyStoreApi,
    breadcrumbs: "Stores",
    helper: pharmacyStoreHelper,
    modelName: "PharmacyStore"
  },
  "users": {
    api: userApi,
    helper: userHelper,
    modelName: "User"
  }
}
