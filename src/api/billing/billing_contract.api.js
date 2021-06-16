import { API } from "../"

export const billingContractApi = {
  indexForHealthPlan,
  listForHealthPlan,
  profile,
  show
}

function indexForHealthPlan(userCredentials, health_plan_id, params, onSuccess, onFailure) {
  if (!API.validateId("health plan ID", health_plan_id, onFailure)) {
    return
  }

  const method = "GET"
  const path = `/health_plans/${health_plan_id}/billing/contracts`
  API.perform(method, path, API.buildQueryString(params), userCredentials, undefined, onSuccess, onFailure)
}

function listForHealthPlan(userCredentials, health_plan_id, params, onSuccess, onFailure) {
  if (!API.validateId("health plan ID", health_plan_id, onFailure)) {
    return
  }

  const method = "GET"
  const path = `/health_plans/${health_plan_id}/billing/contracts/list`
  API.perform(method, path, API.buildQueryString(params), userCredentials, undefined, onSuccess, onFailure)
}

function profile(userCredentials, id, onSuccess, onFailure) {
  if (!API.validateId("billing contract ID", id, onFailure)) {
    return
  }

  const method = "GET"
  const path = `/billing/contracts/${id}/profile`
  API.perform(method, path, "", userCredentials, undefined, onSuccess, onFailure)
}

function show(userCredentials, id, onSuccess, onFailure) {
  if (!API.validateId("billing contract ID", id, onFailure)) {
    return
  }

  const method = "GET"
  const path = `/billing/contracts/${id}`
  API.perform(method, path, "", userCredentials, undefined, onSuccess, onFailure)
}
