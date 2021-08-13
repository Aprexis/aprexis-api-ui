import { API } from "./"
import { patientPhysicianHelper } from "../helpers"

export const patientPhysicianApi = {
  buildNew,
  create,
  destroy,
  listForPatient
}

function toJSON(patientMedication) {
  return {
    patient_physician: patientPhysicianHelper.toJSON(patientMedication)
  }
}

function buildNew(userCredentials, patient_id, params, onSuccess, onFailure) {
  if (!API.validateId("patient ID", patient_id, onFailure)) {
    return
  }

  const method = "GET"
  const path = `/patients/${patient_id}/patient_physicians/new`
  API.perform(method, path, API.buildQueryString(params), userCredentials, undefined, onSuccess, onFailure)
}

function create(userCredentials, patientPhysician, onSuccess, onFailure) {
  if (!API.validateId("patient ID", patientPhysician.patient_id, onFailure)) {
    return
  }
  if (!API.validateId("pharmacy store ID", patientPhysician.pharmacy_store_id, onFailure, true)) {
    return
  }

  const method = "POST"
  const path = `/patients/${patientPhysician.patient_id}/patient_physicians`
  API.perform(method, path, "", userCredentials, toJSON(patientPhysician), onSuccess, onFailure)
}

function destroy(userCredentials, patient_physician_id, onSuccess, onFailure) {
  if (!API.validateId("patient physician ID", patient_physician_id, onFailure)) {
    return
  }

  const method = "DELETE"
  const path = `/patient_physicians/${patient_physician_id}`
  API.perform(method, path, "", userCredentials, undefined, onSuccess, onFailure)
}

function listForPatient(userCredentials, patient_id, params, onSuccess, onFailure) {
  if (!API.validateId("patient ID", patient_id, onFailure)) {
    return
  }

  const method = "GET"
  const path = `/patients/${patient_id}/patient_physicians/list`
  API.perform(method, path, API.buildQueryString(params), userCredentials, undefined, onSuccess, onFailure)
}
