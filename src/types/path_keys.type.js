import {
  answerApi,
  appointmentApi,
  caregiverApi,
  healthPlanApi,
  healthPlanProgramLimitApi,
  interventionApi,
  interventionDocumentApi,
  labTestValueApi,
  medicalClaimApi,
  patientApi,
  patientAllergyApi,
  patientDiseaseApi,
  patientMedicationApi,
  patientNoteApi,
  patientPhysicianApi,
  patientSupplementApi,
  pharmacyChainApi,
  pharmacyClaimApi,
  pharmacyStoreApi,
  reminderApi,
  userApi,
  faxApi,
  interventionMedicationApi,
  patientHealthPlanInsuranceDetailApi
} from "../api"
import { diagnosisCodeApi, diseaseApi, labTestApi, medicationApi, physicianApi } from "../api/admin"
import {
  billingClaimHistoryCollectionApi,
  billingClaimApi,
  billingContractApi,
  billingContractPharmacyChainApi,
  billingContractPharmacyStoreApi
} from "../api/billing"

// The explicit filenames is necessary because pathKeys is imported into some of the helpers, which causes a circular
// import that fails to properly load these files if the import is done through the index.js file.
import { labTestHelper } from "../helpers/admin/lab_test.helper"
import { billingClaimHistoryCollectionHelper } from "../helpers/billing/billing_claim_history_collection.helper"
import { billingClaimHelper } from "../helpers/billing/billing_claim.helper"
import { billingContractHelper } from "../helpers/billing/billing_contract.helper"
import { billingContractPharmacyChainHelper } from "../helpers/billing/billing_contract_pharmacy_chain.helper"
import { billingContractPharmacyStoreHelper } from "../helpers/billing/billing_contract_pharmacy_store.helper"
import { diagnosisCodeHelper } from "../helpers/admin/diagnosis_code.helper"
import { diseaseHelper } from "../helpers/admin/disease.helper"
import { healthPlanHelper } from "../helpers/health_plan.helper"
import { healthPlanProgramLimitHelper } from "../helpers/health_plan_program_limit.helper"
import { interventionDocumentHelper } from "../helpers/intervention_document.helper"
import { pharmacyChainHelper } from "../helpers/pharmacy_chain.helper"
import { pharmacyStoreHelper } from "../helpers/pharmacy_store.helper"
import { physicianHelper } from "../helpers/admin/physician.helper"
import { userHelper } from "../helpers/user.helper"
import { medicationHelper } from "../helpers/admin/medication.helper"
import { patientHelper } from "../helpers/patient.helper"
import { caregiverHelper } from "../helpers/caregiver.helper"
import { interventionHelper } from "../helpers/intervention.helper"
import { answerHelper } from "../helpers/answer.helper"
import { appointmentHelper } from "../helpers/appointment.helper"
import { labTestValueHelper } from "../helpers/lab_test_value.helper"
import { medicalClaimHelper } from "../helpers/medical_claim.helper"
import { pharmacyClaimHelper } from "../helpers/pharmacy_claim.helper"
import { patientAllergyHelper } from "../helpers/patient_allergy.helper"
import { patientDiseaseHelper } from "../helpers/patient_disease.helper"
import { patientMedicationHelper } from "../helpers/patient_medication.helper"
import { patientNoteHelper } from "../helpers/patient_note.helper"
import { patientPhysicianHelper } from "../helpers/patient_physician.helper"
import { patientSupplementHelper } from "../helpers/patient_supplement.helper"
import { reminderHelper } from "../helpers/reminder.helper"
import { faxHelper } from "../helpers/fax.helper"
import { interventionMedicationHelper } from "../helpers/intervention_medication.helper"
import { patientHealthPlanInsuranceDetailHelper } from "../helpers/patient_health_plan_insurance_detail.helper"

export const pathKeys = {
  "answers": {
    api: answerApi,
    helper: answerHelper,
    modelName: "Answer"
  },
  "appointments": {
    api: appointmentApi,
    helper: appointmentHelper,
    modelName: "Appointment"
  },
  "billing-claim-history-collections": {
    api: billingClaimHistoryCollectionApi,
    helper: billingClaimHistoryCollectionHelper,
    modelName: "BillingClaimHistoryCollection"
  },
  "billing-claims": {
    api: billingClaimApi,
    helper: billingClaimHelper,
    modelName: "BillingClaim"
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
  "billing-contract-pharmacy-stores": {
    api: billingContractPharmacyStoreApi,
    helper: billingContractPharmacyStoreHelper,
    modelName: "BillingContractPharmacyStore"
  },
  "caregivers": {
    api: caregiverApi,
    helper: caregiverHelper,
    modelName: "Caregiver"
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
  "faxes": {
    api: faxApi,
    helper: faxHelper,
    modelName: "Fax"
  },
  "health-plans": {
    api: healthPlanApi,
    helper: healthPlanHelper,
    modelName: "HealthPlan"
  },
  "health-plan-program-limits": {
    api: healthPlanProgramLimitApi,
    helper: healthPlanProgramLimitHelper,
    modelName: "healthPlanProgramLimit"
  },
  "intervention-documents": {
    api: interventionDocumentApi,
    helper: interventionDocumentHelper,
    modelName: "InterventionDocument"
  },
  "intervention-medications": {
    api: interventionMedicationApi,
    helper: interventionMedicationHelper,
    modelName: "interventionMedication"
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
  "medical-claims": {
    api: medicalClaimApi,
    breadcrumb: "Medical Claims",
    helper: medicalClaimHelper,
    modelName: "MedicalClaim"
  },
  "medications": {
    api: medicationApi,
    breadcrumb: "Medications",
    helper: medicationHelper,
    modelName: "Medications"
  },
  "patient-allergies": {
    api: patientAllergyApi,
    breadcrumb: "Allergies",
    helper: patientAllergyHelper,
    modelName: "PatientAllergy"
  },
  "patient-diseases": {
    api: patientDiseaseApi,
    breadcrumb: "Diseases",
    helper: patientDiseaseHelper,
    modelName: "PatientDisease"
  },
  "patient-health-plan-insurance-details": {
    api: patientHealthPlanInsuranceDetailApi,
    helper: patientHealthPlanInsuranceDetailHelper,
    modelName: "PatientHealthPlanInsuranceDetail"
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
  "patient-physicians": {
    api: patientPhysicianApi,
    breadcrumb: "HCPs",
    helper: patientPhysicianHelper,
    modelName: "PatientPhysician"
  },
  "patient-supplements": {
    api: patientSupplementApi,
    breadcrumb: "Supplements",
    helper: patientSupplementHelper,
    modelName: "PatientSupplement"
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
  "physicians": {
    api: physicianApi,
    helper: physicianHelper,
    modelName: "Physician"
  },
  "reminders": {
    api: reminderApi,
    helper: reminderHelper,
    modelName: "Reminder"
  },
  "users": {
    api: userApi,
    helper: userHelper,
    modelName: "User"
  }
}
