import { API } from "./"

export const patientDiseaseApi = {
  listForPatient,
  profile,
  show
}

function listForPatient(userCredentials, patient_id, params, onSuccess, onFailure) {
  if (!API.validateId("patient ID", patient_id, onFailure)) {
    return
  }

  const method = "GET"
  const path = `/patients/${patient_id}/patient_diseases/list`
  API.perform(method, path, API.buildQueryString(params), userCredentials, undefined, onSuccess, onFailure)
}

function profile(userCredentials, patient_disease_id, onSuccess, onFailure) {
  if (!API.validateId("patient disease ID", patient_disease_id, onFailure)) {
    return
  }

  const method = "GET"
  const path = `/patient_diseases/${patient_disease_id}/profile`
  API.perform(method, path, '', userCredentials, undefined, onSuccess, onFailure)
}

function show(userCredentials, patient_disease_id, onSuccess, onFailure) {
  if (!API.validateId("patient disease ID", patient_disease_id, onFailure)) {
    return
  }

  const method = "GET"
  const path = `/patient_diseases/${patient_disease_id}`
  API.perform(method, path, '', userCredentials, undefined, onSuccess, onFailure)
}
