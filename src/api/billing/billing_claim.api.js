import { API } from "../"

export const billingClaimApi = {
  listForHealthPlan,
  listForPharmacyStore,
  profile,
  show
}

function listForHealthPlan(userCredentials, health_plan_id, params, onSuccess, onFailure) {
  if (!API.validateId("health plan ID", health_plan_id, onFailure)) {
    return
  }

  const method = "GET"
  const path = `/health_plans/${health_plan_id}/billing/claims/list`
  API.perform(method, path, API.buildQueryString(params), userCredentials, undefined, onSuccess, onFailure)
}

function listForPharmacyStore(userCredentials, pharmacy_store_id, params, onSuccess, onFailure) {
  if (!API.validateId("pharmacy store ID", pharmacy_store_id, onFailure)) {
    return
  }

  const method = "GET"
  const path = `/pharmacy_stores/${pharmacy_store_id}/billing/claims/list`
  API.perform(method, path, API.buildQueryString(params), userCredentials, undefined, onSuccess, onFailure)
}

function profile(userCredentials, id, onSuccess, onFailure) {
  if (!API.validateId("claim ID", id, onFailure)) {
    return
  }

  const method = "GET"
  const path = `/billing/claims/${id}/profile`
  API.perform(method, path, "", userCredentials, undefined, onSuccess, onFailure)
}

function show(userCredentials, id, onSuccess, onFailure) {
  if (!API.validateId("claim ID", id, onFailure)) {
    return
  }

  const method = "GET"
  const path = `/billing/claims/${id}`
  API.perform(method, path, "", userCredentials, undefined, onSuccess, onFailure)
}
