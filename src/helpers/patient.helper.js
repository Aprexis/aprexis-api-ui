import { addressHelper, contactHelper, fieldHelper, healthPlanHelper, nameHelper, userHelper, valueHelper } from "./"

export const patientHelper = {
  canEdit,
  firstName,
  gender,
  hasSubscriber,
  hasUser,
  id,
  lastName,
  middleName,
  name,
  requiresPersonNumber,
  toBreadcrumb
}

function canEdit(user, patient, healthPlan, pharmacyStores) {
  switch (userHelper.role(user)) {
    case 'aprexis_admin':
      return true

    case 'health_plan_admin':
    case 'health_plan_user':
      return healthPlanCanEdit(user, patient)

    case 'pharmacy_store_admin':
    case 'pharmacy_store_tech':
    case 'pharmacy_store_user':
      return pharmacyStoreCanEdit(user, patient, healthPlan, pharmacyStores)

    default:
      return false
  }

  function healthPlanCanEdit(user, patient) {
    return userHelper.forHealthPlan(user, patientHelper.healthPlanId(patient))
  }

  function pharmacyStoreCanEdit(user, patient, healthPlan, pharmacyStores) {
    if (!valueHelper.isValue(healthPlan)) {
      return false
    }

    if (healthPlanHelper.isSegmented(healthPlan)) {
      return canEditForSegmentedHealthPlan(user, pharmacyStores)
    }

    return canEditForStandardHealthPlan(user, patient)
  }

  function canEditForSegmentedHealthPlan(user, pharmacyStores) {
    if (!valueHelper.isValue(pharmacyStores)) {
      return false
    }

    return userHelper.forAnyPharmacyStore(user, pharmacyStores)
  }

  function canEditForStandardHealthPlan(user, patient) {
    return userHelper.forHealthPlan(user, patientHelper.healthPlanId(patient))
  }
}

function firstName(patient, prefix = "") {
  return nameHelper.firstName(patient, prefix)
}

function gender(patient, prefix = "") {
  if (!valueHelper.isValue(patient)) {
    return ""
  }

  return fieldHelper.getField(patient, "gender", prefix)
}

function hasSubscriber(patient) {
  return valueHelper.isStringValue(addressHelper.address(patient, "subscriber")) ||
    valueHelper.isStringValue(addressHelper.city(patient, "subscriber")) ||
    valueHelper.isStringValue(patientHelper.gender(patient, "subscriber")) ||
    valueHelper.isStringValue(contactHelper.name(patient, "subscriber")) ||
    valueHelper.isStringValue(addressHelper.state(patient, "subscriber")) ||
    valueHelper.isStringValue(addressHelper.zipCode(patient, "subscriber"))
}

function hasUser(patient) {
  return valueHelper.isStringValue(addressHelper.address(patient, "user")) ||
    valueHelper.isStringValue(addressHelper.city(patient, "user")) ||
    valueHelper.isStringValue(patientHelper.gender(patient, "subscriber")) ||
    valueHelper.isStringValue(patientHelper.firstName(patient, "user")) ||
    valueHelper.isStringValue(patientHelper.lastName(patient, "user")) ||
    valueHelper.isStringValue(patientHelper.middleName(patient, "user")) ||
    valueHelper.isStringValue(contactHelper.phone(patient, "user")) ||
    valueHelper.isStringValue(addressHelper.state(patient, "user")) ||
    valueHelper.isStringValue(addressHelper.zipCode(patient, "user"))
}

function id(patient) {
  return fieldHelper.getField(patient, "id")
}

function lastName(patient, prefix = "") {
  return nameHelper.lastName(patient, prefix)
}

function middleName(patient, prefix = "") {
  return nameHelper.middleName(patient, prefix)
}

function name(patient, prefix = "") {
  return nameHelper.name(patient, "patient", prefix)
}

function requiresPersonNumber(patient) {
  if (!valueHelper.isValue(patient)) {
    return false
  }

  return valueHelper.isSet(patient.requires_person_number)
}

function toBreadcrumb(patient) {
  if (!valueHelper.isValue(patient)) {
    return "(no patient)"
  }

  return patientHelper.name(patient)
}
