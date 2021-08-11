import { valueHelper } from "./value.helper"
import { fieldHelper } from "./field.helper"
import { addressHelper } from "./address.helper"
import { contactHelper } from "./contact.helper"
import { userHelper } from "./user.helper"

export const pharmacyChainHelper = {
  address,
  canEdit,
  canIndex,
  ccdCode,
  city,
  einNumber,
  fullAddress,
  logo,
  name,
  notes,
  npi,
  parentOrganizationLbn,
  pharmacyStoreCount,
  phone,
  state,
  toBreadcrumb,
  zipCode
}

function address(pharmacyChain) {
  return addressHelper.address(pharmacyChain)
}

function canEdit(user, pharmacyChain) {
  return false
}

function canIndex(user) {
  return userHelper.hasRole(
    user,
    [
      "aprexis_admin",
      "aprexis_observer",
      "aprexis_user_admin",
      "pharmacy_chain_admin"
    ]
  )
}

function ccdCode(pharmacyChain) {
  return fieldHelper.getField(pharmacyChain, "ccd_code")
}

function city(pharmacyChain) {
  return addressHelper.city(pharmacyChain)
}

function einNumber(pharmacyChain) {
  return fieldHelper.getField(pharmacyChain, "ein_number")
}

function fullAddress(pharmacyChain) {
  return addressHelper.fullAddress(pharmacyChain)
}

function logo(pharmacyChain) {
  return fieldHelper.getField(pharmacyChain, "logo")
}

function name(pharmacyChain) {
  return fieldHelper.getField(pharmacyChain, "name")
}

function notes(pharmacyChain) {
  return fieldHelper.getField(pharmacyChain, "notes")
}

function npi(pharmacyChain) {
  return fieldHelper.getField(pharmacyChain, "npi")
}

function parentOrganizationLbn(pharmacyChain) {
  return fieldHelper.getField(pharmacyChain, "parent_organization_lbn")
}

function pharmacyStoreCount(pharmacyChain) {
  return fieldHelper.getField(pharmacyChain, "pharmacy_store_count")
}

function phone(pharmacyChain) {
  return contactHelper.phone(pharmacyChain)
}

function state(pharmacyChain) {
  return addressHelper.state(pharmacyChain)
}

function toBreadcrumb(pharmacyChain) {
  if (!valueHelper.isValue(pharmacyChain)) {
    return "(no pharmacy chain)"
  }

  return pharmacyChainHelper.name(pharmacyChain)
}

function zipCode(pharmacyChain) {
  return addressHelper.zipCode(pharmacyChain)
}
