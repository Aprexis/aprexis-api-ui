import { valueHelper } from './'
import { userRoles } from '../types'

export const userHelper = {
  canModifyUsers,
  displayRole,
  fullName
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
