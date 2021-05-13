import React from "react"
import { UncontrolledTooltip } from "reactstrap"
import { faCalendarMinus, faLock, faUserSlash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { fieldHelper, pathHelper, valueHelper } from "./"
import { userRoles } from "../types"

export const userHelper = {
  canCreatePatientMedication,
  canCreatePatientNote,
  canHaveNpi,
  canIndexAll,
  canModifyUsers,
  displayRole,
  firstName,
  fullName,
  getCurrentUser,
  hasRole,
  isAccessLocked,
  isExpired,
  isLoginAllowed,
  lastName,
  pharmacistDisplay,
  pharmacistNPI,
  renderAccess,
  role,
  rolesToOptions,
  setCurrentUser,
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

function canCreateForPharmacyStore(user, pathEntries) {
  if (!userHelper.hasRole(user, "pharmacy_store_admin", "pharmacy_store_tech", "pharmacy_store_admin")) {
    return false
  }

  const { pharmacyStores } = user
  const pharmacyStoreId = pathHelper.id(pathEntries, "pharmacy-stores")
  return valueHelper.isValue(pharmacyStores.find((ps) => ps.id == pharmacyStoreId))
}

function canCreatePatientMedication(user, pathEntries) {
  if (userHelper.hasRole(user, "aprexis_admin")) {
    return true
  }

  return canCreateForHealthPlan(user, pathEntries) || canCreateForPharmacyStore(user, pathEntries)
}


function canCreatePatientNote(user, pathEntries) {
  if (userHelper.hasRole(user, "aprexis_admin")) {
    return true
  }

  return canCreateForPharmacyStore(user, pathEntries)
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
  return userRoles[userHelper.role(user)]
}

function firstName(user) {
  return fieldHelper.getField(user, "first_name")
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

function pharmacistDisplay(user) {
  if (userHelper.hasRole(user, ['pharmacy_store_admin', 'pharmacy_store_user'])) {
    return "(no pharmacist)"
  }

  return `${userHelper.fullName(user)} - #${userHelper.pharmacistNPI(user)}`
}

function pharmacistNPI(user) {
  return fieldHelper.getField(user, "pharmacist_npi")
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

function toBreadcrumb(user) {
  if (!valueHelper.isValue(user)) {
    return "(no user)"
  }

  return userHelper.username(user)
}

function username(user) {
  return fieldHelper.getField(user, "username")
}
