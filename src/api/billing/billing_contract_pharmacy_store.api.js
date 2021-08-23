import { API } from "../"
import { billingContractPharmacyStoreHelper } from "../../helpers/billing"

function toJSON(billingContractPharmacyStore) {
  return {
    billing_contract_pharmacy_store: billingContractPharmacyStoreHelper.toJSON(billingContractPharmacyStore)
  }
}

export const billingContractPharmacyStoreApi = {
  buildNewForBillingContract,
  create,
  edit,
  listForBillingContract,
  profile,
  show,
  update
}

function buildNewForBillingContract(userCredentials, billing_contract_id, onSuccess, onFailure) {
  if (!API.validateId("billing contract ID", billing_contract_id, onFailure)) {
    return
  }

  const method = "GET"
  const path = `/billing/contracts/${billing_contract_id}/contract_pharmacy_stores/new`
  API.perform(method, path, "", userCredentials, undefined, onSuccess, onFailure)
}

function create(userCredentials, billingContractPharmacyStore, onSuccess, onFailure) {
  if (!API.validateId("contract ID", billingContractPharmacyStore.contract_id, onFailure)) {
    return
  }
  if (!API.validateId("pharmacy store ID", billingContractPharmacyStore.pharmacy_store_id, onFailure)) {
    return
  }

  const method = "POST"
  const path = `/billing/contracts/${billingContractPharmacyStore.contract_id}/contract_pharmacy_stores`
  API.perform(method, path, "", userCredentials, toJSON(billingContractPharmacyStore), onSuccess, onFailure)
}

function edit(userCredentials, contract_pharmacy_store_id, onSuccess, onFailure) {
  if (!API.validateId("contract pharmacy ID", contract_pharmacy_store_id, onFailure)) {
    return
  }

  const method = "GET"
  const path = `/billing/contract_pharmacy_stores/${contract_pharmacy_store_id}/edit`
  API.perform(method, path, "", userCredentials, undefined, onSuccess, onFailure)
}


function listForBillingContract(userCredentials, billing_contract_id, params, onSuccess, onFailure) {
  if (!API.validateId("billing contract ID", billing_contract_id, onFailure)) {
    return
  }

  const method = "GET"
  const path = `/billing/contracts/${billing_contract_id}/contract_pharmacy_stores/list`
  API.perform(method, path, API.buildQueryString(params), userCredentials, undefined, onSuccess, onFailure)
}

function profile(userCredentials, id, onSuccess, onFailure) {
  if (!API.validateId("contract pharmacy store ID", id, onFailure)) {
    return
  }

  const method = "GET"
  const path = `/billing/contract_pharmacy_stores/${id}/profile`
  API.perform(method, path, "", userCredentials, undefined, onSuccess, onFailure)
}

function show(userCredentials, id, onSuccess, onFailure) {
  if (!API.validateId("contract pharmacy store ID", id, onFailure)) {
    return
  }

  const method = "GET"
  const path = `/billing/contract_pharmacy_stores/${id}`
  API.perform(method, path, "", userCredentials, undefined, onSuccess, onFailure)
}

function update(userCredentials, billingContractPharmacyStore, onSuccess, onFailure) {
  const method = "PUT"
  const path = `/billing/contract_pharmacy_stores/${billingContractPharmacyStore.id}`
  API.perform(method, path, "", userCredentials, toJSON(billingContractPharmacyStore), onSuccess, onFailure)
}
