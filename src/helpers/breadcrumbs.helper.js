import {
  billingContractHelper,
  diagnosisCodeHelper,
  diseaseHelper,
  healthPlanHelper,
  patientHelper,
  pharmacyChainHelper,
  pharmacyStoreHelper,
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
  'health-plans': healthPlanToBreadcrumb,
  'patients': patientToBreadcrumb,
  'pharmacy-chains': pharmacyChainToBreadcrumb,
  'pharmacy-stores': pharmacyStoreToBreadcrumb,
  'programs': programToBreadcrumb,
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


function healthPlanToBreadcrumb(healthPlan) {
  if (!valueHelper.isValue(healthPlan)) {
    return "(no health plan)"
  }

  return healthPlanHelper.name(healthPlan)
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

function programToBreadcrumb(program) {
  return programHelper.display(program)
}


function userToBreadcrumb(user) {
  if (!valueHelper.isValue(user)) {
    return "(no user)"
  }

  return userHelper.username(user)
}
