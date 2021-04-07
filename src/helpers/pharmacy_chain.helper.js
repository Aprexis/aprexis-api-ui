import { userHelper, valueHelper } from '.'

export const pharmacyChainHelper = {
  canIndex,
  name
}

function canIndex(user) {
  return userHelper.hasRole(
    user,
    [
      'aprexis_admin',
      'aprexis_observer',
      'aprexis_user_admin',
      'pharmacy_chain_admin'
    ]
  )
}

function name(pharmacyChain) {
  if (!valueHelper.isValue(pharmacyChain)) {
    return 'No pharmacy chain'
  }

  return pharmacyChain.name
}
