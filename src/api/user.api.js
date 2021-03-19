import { API } from './'

export const userApi = {
  index,
  show
}

function index(userCredentials, params, onSuccess, onFailure) {
  const method = "GET"
  const path = "/admin/users"
  API.perform(method, path, API.buildQueryString(params), userCredentials, undefined, onSuccess, onFailure)
}

function show(userCredentials, id, onSuccess, onFailure) {
  if (!API.validateId('user ID', id, onFailure)) {
    return
  }

  const method = "GET"
  const path = `/admin/users/${id}`
  API.perform(method, path, '', userCredentials, undefined, onSuccess, onFailure)
}
