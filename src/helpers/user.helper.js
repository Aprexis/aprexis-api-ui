import React from 'react'
import { UncontrolledTooltip } from 'reactstrap'
import { faCalendarMinus, faLock, faUserSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { valueHelper } from './'
import { userRoles } from '../types'

export const userHelper = {
  canHaveNpi,
  canModifyUsers,
  displayRole,
  fullName,
  isAccessLocked,
  isExpired,
  isLoginAllowed,
  renderAccess
}

function canHaveNpi(user) {
  if (!valueHelper.isValue(user)) {
    return false
  }

  return userRoles[user.role].has_npi
}

function canModifyUsers(user) {
  if (!valueHelper.isValue(user)) {
    return false
  }

  return ['aprexis_admin', 'aprexis_user_admin', 'health_plan_admin', 'pharmacy_chain_admin', 'pharmacy_store_admin'].includes(user.role)
}

function displayRole(user) {
  if (!valueHelper.isValue(user)) {
    return '(no user)'
  }

  return userRoles[user.role].label
}

function fullName(user) {
  if (!valueHelper.isValue(user)) {
    return ''
  }

  return `${user.first_name} ${user.last_name}`
}

function isAccessLocked(user) {
  if (!valueHelper.isValue(user)) {
    return false
  }

  return valueHelper.isSet(user.access_locked)
}

function isExpired(user) {
  if (!valueHelper.isValue(user)) {
    return false
  }

  return valueHelper.isSet(user.expired)
}

function isLoginAllowed(user) {
  if (!valueHelper.isValue(user)) {
    return false
  }

  return valueHelper.isSet(user.allow_login)
}

function renderAccess(user) {
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
        <FontAwesomeIcon className='ml-1 red' icon={faLock} id={`access-locked-${user.id}`} />
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
        <FontAwesomeIcon className='ml-1 red' icon={faUserSlash} id={`disallow-login-${user.id}`} />
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
        <FontAwesomeIcon className='ml-1 red' icon={faCalendarMinus} id={`disallow-login-${user.id}`} />
        <UncontrolledTooltip placement="top" boundariesElement="window" target={`disallow-login-${user.id}`}>
          Account has expired
        </UncontrolledTooltip>
      </span>
    )
  }
}
