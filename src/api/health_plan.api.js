import { API } from './'

export const healthPlanApi = {
  index
}

function index(userCredentials, params, onSuccess, onFailure) {
  const method = "GET"
  const path = "/health_plans"
  API.perform(method, path, API.buildQueryString(params), userCredentials, undefined, onSuccess, onFailure)
}
