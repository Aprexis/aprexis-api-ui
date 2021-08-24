import { API } from "../"
import { billingContractTermHelper } from "../../helpers/billing"

export const billingContractTermApi = {
  listForBillingContract,
  edit,
  profile,
  show,
  update
}

function toJSON(billingContractTerm) {
  return {
    billing_contract_term: billingContractTermHelper.toJSON(billingContractTerm)
  }
}

function listForBillingContract(userCredentials, billing_contract_id, params, onSuccess, onFailure) {
  if (!API.validateId("health plan ID", billing_contract_id, onFailure)) {
    return
  }

  const method = "GET"
  const path = `/billing/contracts/${billing_contract_id}/contract_terms/list`
  API.perform(method, path, API.buildQueryString(params), userCredentials, undefined, onSuccess, onFailure)
}

function edit(userCredentials, id, onSuccess, onFailure) {
  if (!API.validateId("contract term ID", id, onFailure)) {
    return
  }

  const method = "GET"
  const path = `/billing/contract_terms/${id}/edit`
  API.perform(method, path, "", userCredentials, undefined, onSuccess, onFailure)
}


function profile(userCredentials, id, onSuccess, onFailure) {
  if (!API.validateId("contract term ID", id, onFailure)) {
    return
  }

  const method = "GET"
  const path = `/billing/contract_terms/${id}/profile`
  API.perform(method, path, "", userCredentials, undefined, onSuccess, onFailure)
}

function show(userCredentials, id, onSuccess, onFailure) {
  if (!API.validateId("contract term ID", id, onFailure)) {
    return
  }

  const method = "GET"
  const path = `/billing/contract_terms/${id}`
  API.perform(method, path, "", userCredentials, undefined, onSuccess, onFailure)
}

function update(userCredentials, billingContractTerm, onSuccess, onFailure) {
  const method = "PUT"
  const path = `/billing/contract_terms/${billingContractTermHelper.id(billingContractTerm)}`
  API.perform(method, path, "", userCredentials, toJSON(billingContractTerm), onSuccess, onFailure)
}
