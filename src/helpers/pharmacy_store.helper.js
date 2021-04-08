import { userHelper, valueHelper } from "./"

export const pharmacyStoreHelper = {
  canIndex,
  name,
  storeNumber
}

function canIndex(user) {
  return userHelper.hasRole(
    user,
    [
      'aprexis_admin',
      'aprexis_observer',
      'aprexis_user_admin',
      'pharmacy_chain_admin',
      'pharmacy_store_admin',
      'pharmacy_store_tech',
      'pharmacy_store_user'
    ]
  )
}

function name(pharmacyStore) {
  if (!valueHelper.isValue(pharmacyStore)) {
    return "No pharmacy store"
  }

  return pharmacyStore.name
}

function storeNumber(pharmacyStore) {
  if (!valueHelper.isValue(pharmacyStore)) {
    return ""
  }

  return pharmacyStore.store_number
}
