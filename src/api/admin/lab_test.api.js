import { API } from "../"

export const labTestApi = {
  index,
  show
}

function index(userCredentials, params, onSuccess, onFailure) {
  const method = "GET"
  const path = "/admin/lab_tests"
  API.perform(method, path, API.buildQueryString(params), userCredentials, undefined, onSuccess, onFailure)
}

function show(userCredentials, id, onSuccess, onFailure) {
  if (!API.validateId('lab test ID', id, onFailure)) {
    return
  }

  const method = "GET"
  const path = `/admin/lab_tests/${id}`
  API.perform(method, path, '', userCredentials, undefined, onSuccess, onFailure)
}
