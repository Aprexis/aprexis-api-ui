import { fieldHelper, pharmacyChainHelper, userHelper, valueHelper } from "./"

export const pharmacyStoreHelper = {
  canIndex,
  display,
  id,
  identification,
  name,
  storeNumber,
  store,
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

  const pharmacyChainName = pharmacyChainHelper.name(fieldHelper.getField(pharmacyStore, "pharmacy"))
  return `${pharmacyChainName} - ${identification(pharmacyStore)}`
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

function name(pharmacyStore) {
  return fieldHelper.getField(pharmacyStore, "name")
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
