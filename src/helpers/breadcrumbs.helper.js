import {
  billingContractHelper,
  diagnosisCodeHelper,
  diseaseHelper,
  goldStandardDrugItemHelper,
  goldStandardDrugItemActiveIngredientHelper,
  goldStandardDrugItemInactiveIngredientHelper,
  goldStandardGenericProductClinicalHelper,
  goldStandardGenericProductHelper,
  goldStandardMaintenanceMedicationHelper,
  goldStandardMarketedProductHelper,
  goldStandardPackageHelper,
  goldStandardPackageVersionHelper,
  goldStandardProductHelper,
  goldStandardSpecificDrugProductHelper,
  goldStandardSpecificProductHelper,
  goldStandardTherapeuticConceptHelper,
  healthPlanHelper,
  patientHelper,
  pharmacyChainHelper,
  pharmacyStoreHelper,
  potentiallyInappropriateMedicationHelper,
  programHelper,
  userHelper,
  valueHelper
} from "@aprexis/aprexis-api-utility"

export const breadcrumbsHelper = {
  toBreadcrumb
}

const pathKeyToBreadcrumb = {
  'billing-contracts': billingContractToBreadcrumb,
  'diagnosis-codes': diagnosisCodeToBreadcrumb,
  'diseases': diseaseToBreadcrumb,
  'drug-items': drugItemToBreadcrumb,
  'drug-item-active-ingredients': drugItemActiveIngredientToBreadcrumb,
  'drug-item-inactive-ingredients': drugItemInactiveIngredientToBreadcrumb,
  'generic-product-clinicals': genericProductClinicalToBreadcrumb,
  'generic-products': genericProductToBreadcrumb,
  'health-plans': healthPlanToBreadcrumb,
  'maintenance-medications': maintenanceMedicationToBreadcrumb,
  'marketed-products': marketedProductToBreadcrumb,
  'packages': packageToBreadcrumb,
  'package-versions': packageVersionToBreadcrumb,
  'products': productToBreadcrumb,
  'patients': patientToBreadcrumb,
  'pharmacy-chains': pharmacyChainToBreadcrumb,
  'pharmacy-stores': pharmacyStoreToBreadcrumb,
  'potentially-inappropriate-medications': potentialllyInappropriateMedicationToBreadcrumb,
  'programs': programToBreadcrumb,
  'specific-drug-products': specificDrugProductToBreadcrumb,
  'specific-products': specificProductToBreadcrumb,
  'therapeutic-concepts': therapeuticConceptToBreadcrumb,
  'users': userToBreadcrumb
}

function toBreadcrumb(pathKey, model) {
  if (valueHelper.isFunction(pathKeyToBreadcrumb[pathKey])) {
    return pathKeyToBreadcrumb[pathKey](model)
  }

  return `${model.id}`
}

function billingContractToBreadcrumb(billingContract) {
  if (!valueHelper.isValue(billingContract)) {
    return "(no billing contract)"
  }

  return billingContractHelper.name(billingContract)
}

function diagnosisCodeToBreadcrumb(diagnosisCode) {
  if (!valueHelper.isValue(diagnosisCode)) {
    return "(no diagnosis code)"
  }

  return `${diagnosisCodeHelper.typeLabel(diagnosisCode)} ${diagnosisCodeHelper.code(diagnosisCode)}`
}

function diseaseToBreadcrumb(disease) {
  if (!valueHelper.isValue(disease)) {
    return "(no disease)"
  }

  const nameString = diseaseHelper.name(disease)
  if (valueHelper.isStringValue(nameString)) {
    return nameString
  }

  return diseaseHelper.questionKey(disease)
}

function drugItemToBreadcrumb(drugItem) {
  if (!valueHelper.isValue(drugItem)) {
    return "(no drug item)"
  }

  return goldStandardDrugItemHelper.itemNameLong(drugItem)
}

function drugItemActiveIngredientToBreadcrumb(drugItemActiveIngredient) {
  if (!valueHelper.isValue(drugItemActiveIngredient)) {
    return "(no active ingredient)"
  }

  return goldStandardDrugItemActiveIngredientHelper.label(drugItemActiveIngredient)
}


function drugItemInactiveIngredientToBreadcrumb(drugItemInactiveIngredient) {
  if (!valueHelper.isValue(drugItemInactiveIngredient)) {
    return "(no active ingredient)"
  }

  return goldStandardDrugItemInactiveIngredientHelper.label(drugItemInactiveIngredient)
}

function genericProductClinicalToBreadcrumb(genericProductClinical) {
  return goldStandardGenericProductClinicalHelper.name(genericProductClinical)
}

function genericProductToBreadcrumb(genericProduct) {
  return goldStandardGenericProductHelper.name(genericProduct)
}

function healthPlanToBreadcrumb(healthPlan) {
  if (!valueHelper.isValue(healthPlan)) {
    return "(no health plan)"
  }

  return healthPlanHelper.name(healthPlan)
}

function maintenanceMedicationToBreadcrumb(maintenanceMedication) {
  return goldStandardMaintenanceMedicationHelper.ndc11(maintenanceMedication)
}

function marketedProductToBreadcrumb(marketedProduct) {
  return goldStandardMarketedProductHelper.name(marketedProduct)
}

function packageToBreadcrumb(gsPackage) {
  return goldStandardPackageHelper.packageDescription(gsPackage)
}

function packageVersionToBreadcrumb(gsPackageVersion) {
  return goldStandardPackageVersionHelper.packageVersionDescription(gsPackageVersion)
}

function patientToBreadcrumb(patient) {
  if (!valueHelper.isValue(patient)) {
    return "(no patient)"
  }

  return patientHelper.name(patient)
}

function pharmacyChainToBreadcrumb(pharmacyChain) {
  if (!valueHelper.isValue(pharmacyChain)) {
    return "(no pharmacy chain)"
  }

  return pharmacyChainHelper.name(pharmacyChain)
}

function pharmacyStoreToBreadcrumb(pharmacyStore) {
  if (!valueHelper.isValue(pharmacyStore)) {
    return "(no pharmacy store)"
  }

  const pharmacyStoreName = pharmacyStoreHelper.name(pharmacyStore)
  const pharmacyStoreNumber = pharmacyStoreHelper.storeNumber(pharmacyStore)
  let pharmacyStoreId = pharmacyStoreName
  if (valueHelper.isStringValue(pharmacyStoreNumber)) {
    pharmacyStoreId = `${pharmacyStoreId} #${pharmacyStoreNumber}`
  }

  return pharmacyStoreId
}

function potentialllyInappropriateMedicationToBreadcrumb(potentiallyInappropriateMedication) {
  return potentiallyInappropriateMedicationHelper.specificProductId(potentiallyInappropriateMedication)
}

function productToBreadcrumb(product) {
  return goldStandardProductHelper.productNameLong(product)
}

function programToBreadcrumb(program) {
  return programHelper.display(program)
}

function specificDrugProductToBreadcrumb(specificDrugProduct) {
  return goldStandardSpecificDrugProductHelper.name(specificDrugProduct)
}

function specificProductToBreadcrumb(specificProduct) {
  return goldStandardSpecificProductHelper.name(specificProduct)
}

function therapeuticConceptToBreadcrumb(therapeuticConcept) {
  return goldStandardTherapeuticConceptHelper.conceptName(therapeuticConcept)
}

function userToBreadcrumb(user) {
  if (!valueHelper.isValue(user)) {
    return "(no user)"
  }

  return userHelper.username(user)
}
