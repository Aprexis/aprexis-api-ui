import { API } from "../"

export const billingClaimApi = {
  listForPharmacyStore
}

function listForPharmacyStore(userCredentials, pharmacy_store_id, params, onSuccess, onFailure) {
  if (!API.validateId("pharmacy store ID", pharmacy_store_id, onFailure)) {
    return
  }

  const method = "GET"
  const path = `/pharmacy_stores/${pharmacy_store_id}/billing/claims/list`
  API.perform(method, path, API.buildQueryString(params), userCredentials, undefined, onSuccess, onFailure)
}
