import { pharmacyChainHelper, userHelper, valueHelper } from "./"

export const pharmacyStoreHelper = {
  canIndex,
  display,
  name,
  storeNumber,
  toBreadcrumb
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

function display(pharmacyStore) {
  if (!valueHelper.isValue(pharmacyStore)) {
    return "(no pharmacy store)"
  }

  const pharmacyChainName = pharmacyChainHelper.name(valueHelper.getField(pharmacyStore, "pharmacy"))
  const pharmacyStoreName = pharmacyStoreHelper.name(pharmacyStore)
  const pharmacyStoreNumber = pharmacyStoreHelper.storeNumber(pharmacyStore)
  let pharmacyStoreId = pharmacyStoreName
  if (valueHelper.isStringValue(pharmacyStoreNumber)) {
    pharmacyStoreId = `${pharmacyStoreId} #${pharmacyStoreNumber}`
  }

  if (!valueHelper.isStringValue(pharmacyChainName)) {
    return pharmacyStoreId
  }

  return `${pharmacyChainName} - ${pharmacyStoreId}`
}

function name(pharmacyStore) {
  return valueHelper.getField(pharmacyStore, "name")
}

function storeNumber(pharmacyStore) {
  return valueHelper.getField(pharmacyStore, "store_number")
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
