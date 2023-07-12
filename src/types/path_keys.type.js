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
  patientSearchAlgorithmApi,
  patientSearchAlgorithmBatchApi,
  patientSupplementApi,
  pharmacyChainApi,
  pharmacyClaimApi,
  pharmacyStoreApi,
  reminderApi,
  userApi,
  faxApi,
  interventionMedicationApi,
  patientHealthPlanInsuranceDetailApi,
  diagnosisCodeApi,
  diseaseApi,
  labTestApi,
  medicationApi,
  physicianApi,
  billingClaimHistoryCollectionApi,
  billingClaimApi,
  billingContractApi,
  billingContractPharmacyChainApi,
  billingContractPharmacyStoreApi,
  labTestHelper,
  billingClaimHistoryCollectionHelper,
  billingClaimHelper,
  billingContractHelper,
  billingContractPharmacyChainHelper,
  billingContractPharmacyStoreHelper,
  diagnosisCodeHelper,
  diseaseHelper,
  programApi,
  programHelper,
  healthPlanHelper,
  healthPlanProgramLimitHelper,
  healthPlanPatientSearchAlgorithmHelper,
  healthPlanPatientSearchAlgorithmBatchHelper,
  interventionDocumentHelper,
  pharmacyChainHelper,
  pharmacyStoreHelper,
  physicianHelper,
  userHelper,
  medicationHelper,
  patientHelper,
  caregiverHelper,
  interventionHelper,
  answerHelper,
  appointmentHelper,
  labTestValueHelper,
  medicalClaimHelper,
  pharmacyClaimHelper,
  patientAllergyHelper,
  patientDiseaseHelper,
  patientMedicationHelper,
  patientNoteHelper,
  patientPhysicianHelper,
  patientSupplementHelper,
  reminderHelper,
  faxHelper,
  interventionMedicationHelper,
  patientHealthPlanInsuranceDetailHelper
} from "@aprexis/aprexis-api-utility"

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
  "batches": {
    api: patientSearchAlgorithmBatchApi,
    helper: healthPlanPatientSearchAlgorithmBatchHelper,
    modelName: 'PatientSearchAlgorithmBatch'
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
  "patient-search-algorithms": {
    api: patientSearchAlgorithmApi,
    breadcrumb: "Algorithms",
    helper: healthPlanPatientSearchAlgorithmHelper,
    modelName: 'PatoentSearchAlgorithm'
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
  "programs": {
    api: programApi,
    helper: programHelper,
    modelName: "Program"
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
