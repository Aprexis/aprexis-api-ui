import { API } from "./"

export const programApi = {
  list,
  listForHealthPlan,
  show
}

function list(userCredentials, params, onSuccess, onFailure) {
  const method = "GET"
  const path = "/programs/list"
  API.perform(method, path, API.buildQueryString(params), userCredentials, undefined, onSuccess, onFailure)
}

function listForHealthPlan(userCredentials, health_plan_id, params, onSuccess, onFailure) {
  if (!API.validateId("health plan ID", health_plan_id, onFailure)) {
    return
  }

  const method = "GET"
  const path = `/health_plans/${health_plan_id}/programs/list`
  API.perform(method, path, API.buildQueryString(params), userCredentials, undefined, onSuccess, onFailure)
}

function show(userCredentials, id, onSuccess, onFailure) {
  if (!API.validateId("program ID", id, onFailure)) {
    return
  }

  const method = "GET"
  const path = `/programs/${id}`
  API.perform(method, path, "", userCredentials, undefined, onSuccess, onFailure)
}
