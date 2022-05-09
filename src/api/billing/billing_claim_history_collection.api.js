import { API } from "../"

export const billingClaimHistoryCollectionApi = {
  index
}

function index(userCredentials, params, onSuccess, onFailure) {
  const method = "GET"
  const path = "/billing/claim_history_collections"
  API.perform(method, path, API.buildQueryString(params), userCredentials, undefined, onSuccess, onFailure)
}
