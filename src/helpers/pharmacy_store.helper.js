import { userHelper, valueHelper } from "./"

export const pharmacyStoreHelper = {
  canIndex,
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

  return `${pharmacyStoreHelper.name(pharmacyStore)} #${pharmacyStoreHelper.storeNumber(pharmacyStore)}`
}
