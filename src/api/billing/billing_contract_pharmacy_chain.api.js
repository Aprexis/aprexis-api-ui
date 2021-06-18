import { API } from "../"

export const billingContractPharmacyChainApi = {
  indexForBillingContract,
  listForBillingContract,
  profile,
  show
}

function indexForBillingContract(userCredentials, billing_contract_id, params, onSuccess, onFailure) {
  if (!API.validateId("billing contract ID", billing_contract_id, onFailure)) {
    return
  }

  const method = "GET"
  const path = `/billing/contracts/${billing_contract_id}/contract_pharmacies`
  API.perform(method, path, API.buildQueryString(params), userCredentials, undefined, onSuccess, onFailure)
}

function listForBillingContract(userCredentials, billing_contract_id, params, onSuccess, onFailure) {
  if (!API.validateId("billing contract ID", billing_contract_id, onFailure)) {
    return
  }

  const method = "GET"
  const path = `/billing/contracts/${billing_contract_id}/contract_pharmacies/list`
  API.perform(method, path, API.buildQueryString(params), userCredentials, undefined, onSuccess, onFailure)
}

function profile(userCredentials, id, onSuccess, onFailure) {
  if (!API.validateId("contract pharmacy ID", id, onFailure)) {
    return
  }

  const method = "GET"
  const path = `/billing/pharmacies/${id}/profile`
  API.perform(method, path, "", userCredentials, undefined, onSuccess, onFailure)
}

function show(userCredentials, id, onSuccess, onFailure) {
  if (!API.validateId("contract pharmacy ID", id, onFailure)) {
    return
  }

  const method = "GET"
  const path = `/billing/contract_pharmacies/${id}`
  API.perform(method, path, "", userCredentials, undefined, onSuccess, onFailure)
}
