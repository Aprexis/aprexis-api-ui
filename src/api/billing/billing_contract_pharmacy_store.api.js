import { API } from "../"

export const billingContractPharmacyStoreApi = {
  listForBillingContract,
  profile,
  show
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
