import { addressHelper, contactHelper, fieldHelper, userHelper, valueHelper } from "./"

export const healthPlanHelper = {
  activePatients,
  address,
  canConfigure,
  canIndex,
  city,
  code,
  fullAddress,
  name,
  phone,
  state,
  toBreadcrumb,
  zipCode
}

function activePatients(healthPlan) {
  return fieldHelper.getField(healthPlan, "active_patients")
}

function address(healthPlan) {
  return addressHelper.address(healthPlan)
}

function canConfigure(user) {
  return userHelper.hasRole(user, "aprexis_admin")
}

function canIndex(user) {
  return valueHelper.isValue(user)
}

function city(healthPlan) {
  return addressHelper.city(healthPlan)
}

function code(healthPlan) {
  return fieldHelper.getField(healthPlan, "code")
}

function fullAddress(healthPlan) {
  return addressHelper.fullAddress(healthPlan)
}

function name(healthPlan) {
  return fieldHelper.getField(healthPlan, "name")
}

function phone(healthPlan) {
  return contactHelper.phone(healthPlan)
}

function state(healthPlan) {
  return addressHelper.state(healthPlan)
}

function toBreadcrumb(healthPlan) {
  if (!valueHelper.isValue(healthPlan)) {
    return "(no health plan)"
  }

  return healthPlanHelper.name(healthPlan)
}

function zipCode(healthPlan) {
  return addressHelper.zipCode(healthPlan)
}
