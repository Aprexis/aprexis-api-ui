import { API } from "../"

export const billingContractPharmacyStoreApi = {
  listForBillingContract
}

function listForBillingContract(userCredentials, billing_contract_id, params, onSuccess, onFailure) {
  if (!API.validateId("billing contract ID", billing_contract_id, onFailure)) {
    return
  }

  const method = "GET"
  const path = `/billing/contracts/${billing_contract_id}/contract_pharmacy_stores/list`
  API.perform(method, path, API.buildQueryString(params), userCredentials, undefined, onSuccess, onFailure)
}

