import { userHelper, valueHelper } from "./"

export const pharmacyChainHelper = {
  canIndex,
  name,
  toBreadcrumb
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

function name(pharmacyChain) {
  if (!valueHelper.isValue(pharmacyChain)) {
    return "No pharmacy chain"
  }

  return pharmacyChain.name
}

function toBreadcrumb(pharmacyChain) {
  if (!valueHelper.isValue(pharmacyChain)) {
    return "(no pharmacy chain)"
  }

  return pharmacyChainHelper.name(pharmacyChain)
}
