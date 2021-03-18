import { API } from './'

export const userApi = {
  show
}

function show(userCredentials, id, onSuccess, onFailure) {
  if (!API.validateId('user ID', id, onFailure)) {
    return
  }

  const method = "GET"
  const path = `/admin/users/${id}`
  API.perform(method, path, '', userCredentials, undefined, onSuccess, onFailure)
}
