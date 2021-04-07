import { API } from './'

export const userApi = {
  account,
  actAs,
  index,
  show
}

function account(userCredentials, id, onSuccess, onFailure) {
  if (!API.validateId('user ID', id, onFailure)) {
    return
  }

  const method = "GET"
  const path = `/admin/users/${id}/account`
  API.perform(method, path, '', userCredentials, undefined, onSuccess, onFailure)
}

function actAs(adminCredentials, id, onSuccess, onFailure) {
  if (!API.validateId('user ID', id, onFailure)) {
    return
  }

  const method = "GET"
  const path = `/admin/users/${id}/act_as`
  API.perform(method, path, '', adminCredentials, undefined, onSuccess, onFailure)
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
