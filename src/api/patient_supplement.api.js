import { API } from "./"

export const patientSupplementApi = {
  listForPatient
}

function listForPatient(userCredentials, patient_id, params, onSuccess, onFailure) {
  if (!API.validateId("patient ID", patient_id, onFailure)) {
    return
  }

  const method = "GET"
  const path = `/patients/${patient_id}/patient_supplements/list`
  API.perform(method, path, API.buildQueryString(params), userCredentials, undefined, onSuccess, onFailure)
}
