import { API } from "./"

export const caregiverApi = {
  listForPatient,
  profile,
  show
}

function listForPatient(userCredentials, patient_id, params, onSuccess, onFailure) {
  if (!API.validateId("patient ID", patient_id, onFailure)) {
    return
  }

  const method = "GET"
  const path = `/patients/${patient_id}/caregivers/list`
  API.perform(method, path, API.buildQueryString(params), userCredentials, undefined, onSuccess, onFailure)
}

function profile(userCredentials, id, onSuccess, onFailure) {
  if (!API.validateId("caregiver ID", id, onFailure)) {
    return
  }

  const method = "GET"
  const path = `/caregivers/${id}/profile`
  API.perform(method, path, "", userCredentials, undefined, onSuccess, onFailure)
}

function show(userCredentials, id, onSuccess, onFailure) {
  if (!API.validateId("caregiver ID", id, onFailure)) {
    return
  }

  const method = "GET"
  const path = `/caregivers/${id}`
  API.perform(method, path, "", userCredentials, undefined, onSuccess, onFailure)
}
