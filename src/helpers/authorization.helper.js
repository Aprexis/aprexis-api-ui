import { userHelper, valueHelper } from '@aprexis/aprexis-api-utility'
import { pathHelper } from './path.helper'

export const authorizationHelper = {
  canCreateAppointment,
  canCreateBillingContract,
  canCreateBillingContractPharmacyChain,
  canCreateBillingContractPharmacyStore,
  canCreateLabTestValue,
  canCreatePatient,
  canCreatePatientAllergy,
  canCreatePatientMedication,
  canCreatePatientPhysician,
  canCreatePatientNote,
  canCreateReminder
}

function canCreateForHealthPlan(user, pathEntries) {
  if (!userHelper.hasRole(user, "health_plan_admin", "health_plan_user")) {
    return false
  }

  const { healthPlans } = user
  const healthPlanId = pathHelper.id(pathEntries, "health_plans")
  return valueHelper.isValue(healthPlans.find((hp) => hp.id == healthPlanId))
}

function canCreateForPharmacyStore(user, pathEntries, allowNil = false) {
  if (!userHelper.hasRole(user, "pharmacy_store_admin", "pharmacy_store_tech", "pharmacy_store_user")) {
    return false
  }

  const { pharmacyStores } = user
  const pharmacyStoreId = pathHelper.id(pathEntries, "pharmacy-stores")
  if (!valueHelper.isValue(pharmacyStoreId)) {
    return allowNil
  }

  return valueHelper.isValue(pharmacyStores.find((ps) => ps.id == pharmacyStoreId))
}

function canCreateAppointment(user) {
  return userHelper.hasRole(
    user,
    ["aprexis_admin", "pharmacy_store_admin", "pharmacy_store_tech", "pharmacy_store_user"]
  )
}

function canCreateBillingContract(user) {
  return userHelper.hasRole(user, "aprexis_admin")
}

function canCreateBillingContractPharmacyChain(user) {
  return userHelper.hasRole(user, "aprexis_admin")
}

function canCreateBillingContractPharmacyStore(user) {
  return userHelper.hasRole(user, "aprexis_admin")
}

function canCreateLabTestValue(user, _pathEntries) {
  switch (userHelper.role(user)) {
    case "aprexis_admin":
      return true

    case "health_plan_admin":
    case "health_plan_user":
      return false

    case "pharmacy_store_admin":
    case "pharmacy_store_tech":
    case "pharmacy_store_user":
      return true

    case "patient_user_role":
      return true

    default:
      return false
  }
}

function canCreatePatient(user, pathEntries) {
  if (userHelper.hasRole(user, "aprexis_admin")) {
    return true
  }

  return canCreateForHealthPlan(user, pathEntries)
}

function canCreatePatientAllergy(user, pathEntries) {
  switch (userHelper.role(user)) {
    case "aprexis_admin":
      return true

    case "health_plan_admin":
    case "health_plan_user":
      return canCreateForHealthPlan(user, pathEntries)

    case "pharmacy_store_admin":
    case "pharmacy_store_tech":
    case "pharmacy_store_user":
      return true

    case "patient_user_role":
      return true

    default:
      return false
  }
}

function canCreatePatientMedication(user, pathEntries) {
  switch (userHelper.role(user)) {
    case "aprexis_admin":
      return true

    case "health_plan_admin":
    case "health_plan_user":
      return canCreateForHealthPlan(user, pathEntries)

    case "pharmacy_store_admin":
    case "pharmacy_store_tech":
    case "pharmacy_store_user":
      return true

    case "patient_user_role":
      return true

    default:
      return false
  }
}

function canCreatePatientNote(user, pathEntries) {
  if (userHelper.hasRole(user, "aprexis_admin")) {
    return true
  }

  return canCreateForPharmacyStore(user, pathEntries)
}

function canCreatePatientPhysician(user, pathEntries) {
  switch (userHelper.role(user)) {
    case "aprexis_admin":
      return true

    case "health_plan_admin":
    case "health_plan_user":
      return canCreateForHealthPlan(user, pathEntries)

    case "pharmacy_store_admin":
    case "pharmacy_store_tech":
    case "pharmacy_store_user":
      return true

    case "patient_user_role":
      return true

    default:
      return false
  }
}

function canCreateReminder(user, _pathEntries) {
  switch (userHelper.role(user)) {
    case "aprexis_admin":
      return true

    case "pharmacy_store_admin":
    case "pharmacy_store_tech":
    case "pharmacy_store_user":
      return true

    case "patient_user_role":
      return true

    default:
      return false
  }
}
