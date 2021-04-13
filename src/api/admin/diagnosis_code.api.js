import { API } from "../"

export const diagnosisCodeApi = {
  list,
  listForDisease,
  show
}

function list(userCredentials, params, onSuccess, onFailure) {
  const method = "GET"
  const path = "/admin/diagnosis_codes/list"
  API.perform(method, path, API.buildQueryString(params), userCredentials, undefined, onSuccess, onFailure)
}


function listForDisease(userCredentials, disease_id, params, onSuccess, onFailure) {
  if (!API.validateId('disease ID', disease_id, onFailure)) {
    return
  }

  const method = "GET"
  const path = `/admin/diseases/${disease_id}/diagnosis_codes/list`
  API.perform(method, path, API.buildQueryString(params), userCredentials, undefined, onSuccess, onFailure)
}

function show(userCredentials, id, onSuccess, onFailure) {
  if (!API.validateId('diagnosis code ID', id, onFailure)) {
    return
  }

  const method = "GET"
  const path = `/admin/diagnosis_codes/${id}`
  API.perform(method, path, '', userCredentials, undefined, onSuccess, onFailure)
}
