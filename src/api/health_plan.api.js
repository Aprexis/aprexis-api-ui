import { API } from "./"

export const healthPlanApi = {
  index,
  list,
  show
}

function index(userCredentials, params, onSuccess, onFailure) {
  const method = "GET"
  const path = "/health_plans"
  API.perform(method, path, API.buildQueryString(params), userCredentials, undefined, onSuccess, onFailure)
}


function list(userCredentials, params, onSuccess, onFailure) {
  const method = "GET"
  const path = "/health_plans/list"
  API.perform(method, path, API.buildQueryString(params), userCredentials, undefined, onSuccess, onFailure)
}

function show(userCredentials, id, onSuccess, onFailure) {
  if (!API.validateId("health plan ID", id, onFailure)) {
    return
  }

  const method = "GET"
  const path = `/health_plans/${id}`
  API.perform(method, path, "", userCredentials, undefined, onSuccess, onFailure)
}
