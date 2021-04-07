import { userHelper } from "./"

export const pharmacyStoreHelper = {
  canIndex
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
