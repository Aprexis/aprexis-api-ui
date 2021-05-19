import { API } from "./"

export const medicationApi = {
  search,
  show
}

function search(userCredentials, params, onSuccess, onFailure) {
  const method = "GET"
  const path = "/admin/medications/search"
  API.perform(method, path, API.buildQueryString(params), userCredentials, undefined, onSuccess, onFailure)
}

function show(userCredentials, id, onSuccess, onFailure) {
  if (!API.validateId("medication ID", id, onFailure)) {
    return
  }

  const method = "GET"
  const path = `/admin/medications/${id}`
  API.perform(method, path, "", userCredentials, undefined, onSuccess, onFailure)
}
