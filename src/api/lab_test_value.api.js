import { API } from "./"
import { valueHelper } from "../helpers"

export const labTestValueApi = {
  buildNewForPatient,
  listForIntervention,
  listForPatient
}

function buildNewForPatient(userCredentials, patient_id, pharmacy_store_id, onSuccess, onFailure) {
  if (!API.validateId("patient ID", patient_id, onFailure)) {
    return
  }

  let queryString = ""
  if (valueHelper.isNumberValue(pharmacy_store_id)) {
    if (!API.validateId("pharmacy store ID", pharmacy_store_id, onFailure)) {
      return
    }

    queryString = `?pharmacy_store_id=${pharmacy_store_id}`
  }

  const method = "GET"
  const path = `/patients/${patient_id}/lab_test_values/new`

  API.perform(method, path, queryString, userCredentials, undefined, onSuccess, onFailure)
}

function listForIntervention(userCredentials, intervention_id, params, onSuccess, onFailure) {
  if (!API.validateId("intervention ID", intervention_id, onFailure)) {
    return
  }

  const method = "GET"
  const path = `/interventions/${intervention_id}/lab_test_values/list`
  API.perform(method, path, API.buildQueryString(params), userCredentials, undefined, onSuccess, onFailure)
}

function listForPatient(userCredentials, patient_id, params, onSuccess, onFailure) {
  if (!API.validateId("patient ID", patient_id, onFailure)) {
    return
  }

  const method = "GET"
  const path = `/patients/${patient_id}/lab_test_values/list`
  API.perform(method, path, API.buildQueryString(params), userCredentials, undefined, onSuccess, onFailure)
}
