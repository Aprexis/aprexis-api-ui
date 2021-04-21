import { API } from "./"

export const pharmacyChainApi = {
  list,
  show
}

function list(userCredentials, params, onSuccess, onFailure) {
  const method = "GET"
  const path = "/pharmacies/list"
  API.perform(method, path, API.buildQueryString(params), userCredentials, undefined, onSuccess, onFailure)
}

function show(userCredentials, id, onSuccess, onFailure) {
  if (!API.validateId("pharmacy chain ID", id, onFailure)) {
    return
  }

  const method = "GET"
  const path = `/pharmacies/${id}`
  API.perform(method, path, "", userCredentials, undefined, onSuccess, onFailure)
}
