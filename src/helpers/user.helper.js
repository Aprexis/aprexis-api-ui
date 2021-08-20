import React from "react"
import { UncontrolledTooltip } from "reactstrap"
import { faCalendarMinus, faLock, faUserSlash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { valueHelper } from "./value.helper"
import { fieldHelper } from "./field.helper"
import { pathHelper } from "./path.helper"
import { userRoles } from "../types"
import { contactHelper } from "./contact.helper"

export const userHelper = {
  canCreateAppointment,
  canCreateBillingContract,
  canCreateBillingContractPharmacyChain,
  canCreatePatient,
  canCreatePatientAllergy,
  canCreatePatientMedication,
  canCreatePatientPhysician,
  canCreatePatientNote,
  canDelete,
  canEdit,
  canHaveNpi,
  canIndexAll,
  canModifyUsers,
  displayRole,
  email,
  firstName,
  forHealthPlan,
  forPharmacyStore,
  fullName,
  getCurrentUser,
  hasRole,
  healthPlans,
  id,
  isAccessLocked,
  isExpired,
  isLoginAllowed,
  lastName,
  modelName,
  patient,
  pharmacistDisplay,
  pharmacistNPI,
  pharmacyChains,
  pharmacyStores,
  phone,
  renderAccess,
  role,
  rolesToOptions,
  setCurrentUser,
  state,
  timeZone,
  toBreadcrumb,
  username
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

    default:
      return false
  }
}

function canDelete(currentUser, user) {
  return false
}

function canEdit(currentUser, user) {
  return false
}

function canHaveNpi(user) {
  return userRoles[userHelper.role(user)].has_npi
}

function canIndexAll(user) {
  return userHelper.hasRole(user, ["aprexis_admin", "aprexis_observer", "aprexis_user_admin"])
}

function canModifyUsers(user) {
  return userHelper.hasRole(
    user,
    ["aprexis_admin", "aprexis_user_admin", "health_plan_admin", "pharmacy_chain_admin", "pharmacy_store_admin"]
  )
}

function displayRole(user) {
  return userRoles[userHelper.role(user)].label
}

function email(user) {
  return contactHelper.email(user)
}

function firstName(user) {
  return fieldHelper.getField(user, "first_name")
}

function forHealthPlan(user, healthPlanId) {
  const healthPlans = userHelper.healthPlans(user)
  if (!valueHelper.isValue(healthPlans)) {
    return false
  }

  return valueHelper.isValue(healthPlans.find((healthPlan) => healthPlan.id == healthPlanId))
}

function forPharmacyStore(user, pharmacyStoreId) {
  if (!valueHelper.isValue(pharmacyStoreId)) {
    return true
  }

  const pharmacyStores = userHelper.pharmacyStores(user)

  return valueHelper.isValue(pharmacyStores.find((ps) => ps.id == pharmacyStoreId))
}

function fullName(user) {
  if (!valueHelper.isValue(user)) {
    return ""
  }

  return `${userHelper.firstName(user)} ${userHelper.lastName(user)}`
}

function getCurrentUser() {
  const currentUserJson = sessionStorage.getItem("aprexis-api-ui-current-user")

  return JSON.parse(currentUserJson)
}

function hasRole(user, role) {
  const userRole = userHelper.role(user)

  if (Array.isArray(role)) {
    return role.includes(userRole)
  }

  return userRole == role
}

function healthPlans(user) {
  return fieldHelper.getField(user, "health_plans")
}

function id(user) {
  return fieldHelper.getField(user, "id")
}

function isAccessLocked(user) {
  return valueHelper.isSet(fieldHelper.getField(user, "access_locked"))
}

function isExpired(user) {
  return valueHelper.isSet(fieldHelper.getField(user, "expired"))
}

function isLoginAllowed(user) {
  return valueHelper.isSet(fieldHelper.getField(user, "allow_login"))
}

function lastName(user) {
  return fieldHelper.getField(user, "last_name")
}

function modelName() {
  return "user"
}

function patient(user) {
  return fieldHelper.getField(user, "patient")
}

function pharmacistDisplay(user) {
  if (userHelper.hasRole(user, ['pharmacy_store_admin', 'pharmacy_store_user'])) {
    return "(no pharmacist)"
  }

  return `${userHelper.fullName(user)} - #${userHelper.pharmacistNPI(user)}`
}

function pharmacistNPI(user) {
  return fieldHelper.getField(user, "pharmacist_npi")
}

function pharmacyChains(user) {
  return fieldHelper.getField(user, "pharmacies")
}

function pharmacyStores(user) {
  return fieldHelper.getField(user, "pharmacy_stores")
}

function phone(user) {
  return contactHelper.phone(user)
}

function renderAccess(user) {
  if (!valueHelper.isValue(user)) {
    return
  }

  const accessLocked = renderAccessLocked(user)
  const allowLogin = renderAllowLogin(user)
  const expired = renderExpired(user)

  return (<React.Fragment>{expired}{accessLocked}{allowLogin}</React.Fragment>)

  function renderAccessLocked(user) {
    if (!userHelper.isAccessLocked(user)) {
      return
    }

    return (
      <span>
        &nbsp;
        <FontAwesomeIcon className="ml-1 red" icon={faLock} id={`access-locked-${user.id}`} />
        <UncontrolledTooltip placement="top" boundariesElement="window" target={`access-locked-${user.id}`}>
          Account is temporarily locked
        </UncontrolledTooltip>
      </span>
    )
  }

  function renderAllowLogin(user) {
    if (userHelper.isLoginAllowed(user)) {
      return
    }

    return (
      <span>
        &nbsp;
        <FontAwesomeIcon className="ml-1 red" icon={faUserSlash} id={`disallow-login-${user.id}`} />
        <UncontrolledTooltip placement="top" boundariesElement="window" target={`disallow-login-${user.id}`}>
          Login not allowed
        </UncontrolledTooltip>
      </span>
    )
  }

  function renderExpired(user) {
    if (!userHelper.isExpired(user)) {
      return
    }

    return (
      <span>
        &nbsp;
        <FontAwesomeIcon className="ml-1 red" icon={faCalendarMinus} id={`disallow-login-${user.id}`} />
        <UncontrolledTooltip placement="top" boundariesElement="window" target={`disallow-login-${user.id}`}>
          Account has expired
        </UncontrolledTooltip>
      </span>
    )
  }
}

function role(user) {
  return fieldHelper.getField(user, "role")
}

function rolesToOptions() {
  return Object.keys(userRoles).map(
    (key) => {
      return {
        id: key,
        value: userRoles[key].label
      }
    }
  )
}

function setCurrentUser(currentUser) {
  const currentUserJson = JSON.stringify(currentUser)

  sessionStorage.setItem("aprexis-api-ui-current-user", currentUserJson)
}

function state(user) {
  return fieldHelper.getField(user, "state")
}

function timeZone(user) {
  return fieldHelper.getField(user, "time_zone")
}

function toBreadcrumb(user) {
  if (!valueHelper.isValue(user)) {
    return "(no user)"
  }

  return userHelper.username(user)
}

function username(user) {
  return fieldHelper.getField(user, "username")
}
