import { API } from "./"

export const patientAllergyApi = {
  listForPatient,
  profile,
  show
}

function listForPatient(userCredentials, patient_id, params, onSuccess, onFailure) {
  if (!API.validateId("patient ID", patient_id, onFailure)) {
    return
  }

  const method = "GET"
  const path = `/patients/${patient_id}/patient_allergies/list`
  API.perform(method, path, API.buildQueryString(params), userCredentials, undefined, onSuccess, onFailure)
}

function profile(userCredentials, patient_allergy_id, onSuccess, onFailure) {
  if (!API.validateId("patient allergy ID", patient_allergy_id, onFailure)) {
    return
  }

  const method = "GET"
  const path = `/patient_allergies/${patient_allergy_id}/profile`
  API.perform(method, path, '', userCredentials, undefined, onSuccess, onFailure)
}

function show(userCredentials, patient_allergy_id, onSuccess, onFailure) {
  if (!API.validateId("patient allergy ID", patient_allergy_id, onFailure)) {
    return
  }

  const method = "GET"
  const path = `/patient_allergies/${patient_allergy_id}`
  API.perform(method, path, '', userCredentials, undefined, onSuccess, onFailure)
}
