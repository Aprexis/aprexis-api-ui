import {
  answerApi,
  appointmentApi,
  caregiverApi,
  goldStandardDrugItemApi,
  goldStandardDrugItemActiveIngredientApi,
  goldStandardGenericProductClinicalApi,
  goldStandardGenericProductApi,
  goldStandardMarketedProductApi,
  goldStandardPackageApi,
  goldStandardPackageVersionApi,
  goldStandardProductApi,
  goldStandardSpecificDrugProductApi,
  goldStandardSpecificProductApi,
  goldStandardTherapeuticConceptApi,
  healthPlanApi,
  healthPlanProgramLimitApi,
  healthPlanProgramReportApi,
  interventionApi,
  interventionDocumentApi,
  labTestValueApi,
  loadProviderApi,
  mapTalkingPointApi,
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
  pharmacyReportApi,
  pharmacyStoreApi,
  pharmacyStoreProgramReportApi,
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
  potentiallyInappropriateMedicationApi,
  billingClaimHistoryCollectionApi,
  billingClaimApi,
  billingContractApi,
  billingContractPharmacyChainApi,
  billingContractPharmacyStoreApi,
  billingInvoiceApi,
  labTestHelper,
  billingClaimHistoryCollectionHelper,
  billingClaimHelper,
  billingContractHelper,
  billingContractPharmacyChainHelper,
  billingContractPharmacyStoreHelper,
  billingInvoiceHelper,
  diagnosisCodeHelper,
  diseaseHelper,
  goldStandardDrugItemHelper,
  goldStandardDrugItemActiveIngredientHelper,
  goldStandardGenericProductClinicalHelper,
  goldStandardGenericProductHelper,
  goldStandardSpecificDrugProductHelper,
  goldStandardMarketedProductHelper,
  goldStandardPackageHelper,
  goldStandardPackageVersionHelper,
  goldStandardProductHelper,
  goldStandardSpecificProductHelper,
  goldStandardTherapeuticConceptHelper,
  programApi,
  programHelper,
  healthPlanHelper,
  healthPlanProgramLimitHelper,
  healthPlanProgramReportHelper,
  dryRunProgramPatientAssignmentApi,
  dryRunProgramPatientAssignmentHelper,
  healthPlanPatientSearchAlgorithmHelper,
  healthPlanPatientSearchAlgorithmBatchHelper,
  interventionDocumentHelper,
  pharmacyChainHelper,
  pharmacyStoreHelper,
  pharmacyStoreProgramReportHelper,
  pharmacyReportHelper,
  physicianHelper,
  potentiallyInappropriateMedicationHelper,
  userHelper,
  loadProviderHelper,
  medicationHelper,
  patientHelper,
  caregiverHelper,
  interventionHelper,
  answerHelper,
  appointmentHelper,
  labTestValueHelper,
  mapTalkingPointHelper,
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
  "billing-invoices": {
    api: billingInvoiceApi,
    helper: billingInvoiceHelper,
    modelName: "BillingInvoice"
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
  "drug-items": {
    api: goldStandardDrugItemApi,
    breadcrumb: "Active Ingredients",
    helper: goldStandardDrugItemHelper,
    modelName: "DrugItem"
  },
  "drug-item-active-ingredients": {
    api: goldStandardDrugItemActiveIngredientApi,
    helper: goldStandardDrugItemActiveIngredientHelper,
    modelName: "DrugItemActiveIngredient"
  },
  "dry-run-program-patient-assignments": {
    api: dryRunProgramPatientAssignmentApi,
    helper: dryRunProgramPatientAssignmentHelper,
    modelName: "DryRunProgramPatientAssignment"
  },
  "faxes": {
    api: faxApi,
    helper: faxHelper,
    modelName: "Fax"
  },
  "generic-product-clinicals": {
    api: goldStandardGenericProductClinicalApi,
    helper: goldStandardGenericProductClinicalHelper,
    modelName: "GenericProductClinical"
  },
  "generic-products": {
    api: goldStandardGenericProductApi,
    helper: goldStandardGenericProductHelper,
    modelName: "GenericProduct"
  },
  "health-plans": {
    api: healthPlanApi,
    helper: healthPlanHelper,
    modelName: "HealthPlan"
  },
  "health-plan-program-limits": {
    api: healthPlanProgramLimitApi,
    helper: healthPlanProgramLimitHelper,
    modelName: "HealthPlanProgramLimit"
  },
  "health-plan-program-reports": {
    api: healthPlanProgramReportApi,
    helper: healthPlanProgramReportHelper,
    modelName: "HealthPlanProgramReport"
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
  "load-providers": {
    api: loadProviderApi,
    helper: loadProviderHelper,
    modelName: "LoadProvider"
  },
  "map-talking-points": {
    api: mapTalkingPointApi,
    helper: mapTalkingPointHelper,
    modelName: "MapTalkingPoint"
  },
  "marketed-products": {
    api: goldStandardMarketedProductApi,
    helper: goldStandardMarketedProductHelper,
    modelName: "MarketedProduct"
  },
  "medical-claims": {
    api: medicalClaimApi,
    helper: medicalClaimHelper,
    modelName: "MedicalClaim"
  },
  "medications": {
    api: medicationApi,
    breadcrumb: "Medications",
    helper: medicationHelper,
    modelName: "Medications"
  },
  "packages": {
    api: goldStandardPackageApi,
    helper: goldStandardPackageHelper,
    modelName: "Package"
  },
  "package-versions": {
    api: goldStandardPackageVersionApi,
    helper: goldStandardPackageVersionHelper,
    modelName: "PackageVersion"
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
    helper: pharmacyClaimHelper,
    modelName: "PharmacyClaim"
  },
  "pharmacy-reports": {
    api: pharmacyReportApi,
    breadcrumb: "Pharmacy Reports",
    helper: pharmacyReportHelper,
    modelName: "PharmacyReport"
  },
  "pharmacy-stores": {
    api: pharmacyStoreApi,
    breadcrumb: "Stores",
    helper: pharmacyStoreHelper,
    modelName: "PharmacyStore"
  },
  "pharmacy-store-program-reports": {
    api: pharmacyStoreProgramReportApi,
    helper: pharmacyStoreProgramReportHelper,
    modelName: "PharmacyStoreProgramReport"
  },
  "physicians": {
    api: physicianApi,
    helper: physicianHelper,
    modelName: "Physician"
  },
  "potentially-inappropriate-medications": {
    api: potentiallyInappropriateMedicationApi,
    helper: potentiallyInappropriateMedicationHelper,
    modelName: "PotentiallyInappropriateMedication"
  },
  "products": {
    api: goldStandardProductApi,
    helper: goldStandardProductHelper,
    modelName: "Product"
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
  "specific-drug-products": {
    api: goldStandardSpecificDrugProductApi,
    helper: goldStandardSpecificDrugProductHelper,
    modelName: "SpecificDrugProduct"
  },
  "specific-products": {
    api: goldStandardSpecificProductApi,
    helper: goldStandardSpecificProductHelper,
    modelName: "SpecificProduct"
  },
  "therapeutic-concepts": {
    api: goldStandardTherapeuticConceptApi,
    helper: goldStandardTherapeuticConceptHelper,
    modelName: "TherapeuticConcept"
  },
  "users": {
    api: userApi,
    helper: userHelper,
    modelName: "User"
  }
}
