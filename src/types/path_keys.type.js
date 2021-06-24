import {
  answerApi,
  healthPlanApi,
  interventionApi,
  labTestValueApi,
  patientApi,
  patientAllergyApi,
  patientMedicationApi,
  patientNoteApi,
  pharmacyChainApi,
  pharmacyClaimApi,
  pharmacyStoreApi,
  userApi
} from "../api"
import { diagnosisCodeApi, diseaseApi, labTestApi } from "../api/admin"
import { billingContractApi, billingContractPharmacyChainApi } from "../api/billing"

// The explicit filenames is necessary because pathKeys is imported into some of the helpers, which causes a circular
// import that fails to properly load these files if the import is done through the index.js file.
import { answerHelper } from "../helpers/answer.helper"
import { billingContractHelper } from "../helpers/billing/billing_contract.helper"
import { billingContractPharmacyChainHelper } from "../helpers/billing/billing_contract_pharmacy_chain.helper"
import { diagnosisCodeHelper } from "../helpers/admin/diagnosis_code.helper"
import { diseaseHelper } from "../helpers/admin/disease.helper"
import { healthPlanHelper } from "../helpers/health_plan.helper"
import { interventionHelper } from "../helpers/intervention.helper"
import { labTestHelper } from "../helpers/admin/lab_test.helper"
import { labTestValueHelper } from "../helpers/lab_test_value.helper"
import { patientAllergyHelper } from "../helpers/patient_allergy.helper"
import { patientHelper } from "../helpers/patient.helper"
import { patientMedicationHelper } from "../helpers/patient_medication.helper"
import { patientNoteHelper } from "../helpers/patient_note.helper"
import { pharmacyChainHelper } from "../helpers/pharmacy_chain.helper"
import { pharmacyClaimHelper } from "../helpers/pharmacy_claim.helper"
import { pharmacyStoreHelper } from "../helpers/pharmacy_store.helper"
import { userHelper } from "../helpers/user.helper"

export const pathKeys = {
  "answers": {
    api: answerApi,
    helper: answerHelper,
    modelName: "Answer"
  },
  "billing-contracts": {
    api: billingContractApi,
    helper: billingContractHelper,
    modelName: "BillingContract"
  },
  "billing-contract-pharmacies": {
    api: billingContractPharmacyChainApi,
    helper: billingContractPharmacyChainHelper,
    modelName: "BillingContractPharmacy"
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
  "patient-allergies": {
    api: patientAllergyApi,
    breadcrumb: "Allergies",
    helper: patientAllergyHelper,
    modelName: "PatientAllergy"
  },
  "patient-medications": {
    api: patientMedicationApi,
    breadcrumb: "Medications",
    helper: patientMedicationHelper,
    modelName: "PatientMedication"
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
  "pharmacy-claims": {
    api: pharmacyClaimApi,
    breadcrumb: "Pharmacy Claims",
    helper: pharmacyClaimHelper,
    modelName: "PharmacyClaim"
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
