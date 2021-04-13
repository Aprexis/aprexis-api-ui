import { API } from "../"

export const diseaseApi = {
  index,
  show
}

function index(userCredentials, params, onSuccess, onFailure) {
  const method = "GET"
  const path = "/admin/diseases"
  API.perform(method, path, API.buildQueryString(params), userCredentials, undefined, onSuccess, onFailure)
}

function show(userCredentials, id, onSuccess, onFailure) {
  if (!API.validateId('disease ID', id, onFailure)) {
    return
  }

  const method = "GET"
  const path = `/admin/diseases/${id}`
  API.perform(method, path, '', userCredentials, undefined, onSuccess, onFailure)
}
