import { API } from "../"

export const labTestApi = {
  index
}

function index(userCredentials, params, onSuccess, onFailure) {
  const method = "GET"
  const path = "/admin/lab_tests"
  API.perform(method, path, API.buildQueryString(params), userCredentials, undefined, onSuccess, onFailure)
}
