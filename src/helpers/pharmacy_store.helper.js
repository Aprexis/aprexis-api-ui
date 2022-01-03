import { valueHelper } from "./value.helper"
import { fieldHelper } from "./field.helper"
import { addressHelper } from "./address.helper"
import { contactHelper } from "./contact.helper"
import { pharmacyChainHelper } from "./pharmacy_chain.helper"
import { userHelper } from "./user.helper"

export const pharmacyStoreHelper = {
  address,
  canDelete,
  canEdit,
  canIndex,
  ccdCode,
  city,
  display,
  einNumber,
  fullAddress,
  id,
  identification,
  latitude,
  longitude,
  modelName,
  nabp,
  name,
  npi,
  npiDeactivationDate,
  npiDeactivationReasonCode,
  npiReactivationDate,
  notes,
  overridePharmacyOrganizationBillingInfo,
  phone,
  state,
  storeNumber,
  store,
  stripeCustomer,
  stripePharmacistLicensePrice,
  stripePharmacyTechnicianLicensePrice,
  stripeSubscription,
  toBreadcrumb,
  zipCode
}

function address(pharmacyStore) {
  return addressHelper.address(pharmacyStore)
}

function canDelete(user, pharmacyStore) {
  return false
}

function canEdit(user, pharmacyStore) {
  return false
}

function canIndex(user) {
  return userHelper.hasRole(
    user,
    [
      "aprexis_admin",
      "aprexis_observer",
      "aprexis_user_admin",
      "pharmacy_chain_admin",
      "pharmacy_store_admin",
      "pharmacy_store_tech",
      "pharmacy_store_user"
    ]
  )
}

function ccdCode(pharmacyStore) {
  return fieldHelper.getField(pharmacyStore, "ccd_code")
}

function city(pharmacyStore) {
  return addressHelper.city(pharmacyStore)
}

function display(pharmacyStore) {
  if (!valueHelper.isValue(pharmacyStore)) {
    return "(no pharmacy store)"
  }

  const pharmacyChainName = pharmacyChainHelper.name(fieldHelper.getField(pharmacyStore, "pharmacy"))
  return `${pharmacyChainName} - ${identification(pharmacyStore)}`
}

function einNumber(pharmacyStore) {
  return fieldHelper.getField(pharmacyStore, "ein_number")
}

function fullAddress(pharmacyStore) {
  return addressHelper.fullAddress(pharmacyStore)
}

function id(pharmacyStore) {
  return fieldHelper.getField(pharmacyStore, "id")
}

function identification(pharmacyStore) {
  const id = pharmacyStoreHelper.id(pharmacyStore)
  const name = pharmacyStoreHelper.name(pharmacyStore)
  const number = pharmacyStoreHelper.storeNumber(pharmacyStore)

  if (valueHelper.isStringValue(number)) {
    return `${name} ${number}`
  }

  return `${name} (#${id})`
}

function latitude(pharmacyStore) {
  return fieldHelper.getField(pharmacyStore, "latitude")
}

function longitude(pharmacyStore) {
  return fieldHelper.getField(pharmacyStore, "longitude")
}

function modelName() {
  return "pharmacyStore"
}

function nabp(pharmacyStore) {
  return fieldHelper.getField(pharmacyStore, "nabp")
}

function name(pharmacyStore) {
  return fieldHelper.getField(pharmacyStore, "name")
}

function notes(pharmacyStore) {
  return fieldHelper.getField(pharmacyStore, "notes")
}

function npi(pharmacyStore) {
  return fieldHelper.getField(pharmacyStore, "npi")
}

function npiDeactivationDate(pharmacyStore) {
  return fieldHelper.getField(pharmacyStore, "npi_deactivation_date")
}

function npiDeactivationReasonCode(pharmacyStore) {
  return fieldHelper.getField(pharmacyStore, "npi_deactivation_reason_code")
}

function npiReactivationDate(pharmacyStore) {
  return fieldHelper.getField(pharmacyStore, "npi_reactivation_date")
}

function overridePharmacyOrganizationBillingInfo(pharmacyStore) {
  return fieldHelper.getField(pharmacyStore, "override_pharmacy_organization_billing_info")
}

function phone(pharmacyStore) {
  return contactHelper.phone(pharmacyStore)
}

function state(pharmacyStore) {
  return addressHelper.state(pharmacyStore)
}

function store(pharmacyStore) {
  let store = fieldHelper.getField(pharmacyStore, "store")
  if (valueHelper.isStringValue(store)) {
    return store
  }

  const name = pharmacyStoreHelper.name(pharmacyStore)
  const storeNumber = pharmacyStoreHelper.storeNumber(pharmacyStore)
  if (!valueHelper.isStringValue(storeNumber)) {
    return name
  }

  return `${name} (#${storeNumber})`
}

function storeNumber(pharmacyStore) {
  return fieldHelper.getField(pharmacyStore, "store_number")
}

function stripeCustomer(pharmacyStore) {
  return fieldHelper.getField(pharmacyStore, "stripe_customer")
}

function stripePharmacistLicensePrice(pharmacyStore) {
  return fieldHelper.getField(pharmacyStore, "stripe_pharmacist_license_price")
}

function stripePharmacyTechnicianLicensePrice(pharmacyStore) {
  return fieldHelper.getField(pharmacyStore, "stripe_pharmacy_technician_license_price")
}

function stripeSubscription(pharmacyStore) {
  return fieldHelper.getField(pharmacyStore, "stripe_subscription")
}

function toBreadcrumb(pharmacyStore) {
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

function zipCode(pharmacyStore) {
  return addressHelper.zipCode(pharmacyStore)
}
