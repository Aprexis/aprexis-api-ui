import { API } from "./"
import { patientNoteHelper } from "../helpers"

export const patientNoteApi = {
  buildNew,
  create,
  listForPatient,
  show
}

function toJSON(patientNote) {
  return {
    patient_note: patientNoteHelper.toJSON(patientNote)
  }
}

function buildNew(userCredentials, patient_id, pharmacy_store_id, onSuccess, onFailure) {
  if (!API.validateId("patient ID", patient_id, onFailure)) {
    return
  }
  if (!API.validateId("pharmacy store ID", pharmacy_store_id, onFailure)) {
    return
  }

  const method = "GET"
  const path = `/patients/${patient_id}/patient_notes/new`
  API.perform(
    method,
    path,
    API.buildQueryString({ pharmacy_store_id }),
    userCredentials,
    undefined,
    onSuccess,
    onFailure
  )
}

function create(userCredentials, patientNote, onSuccess, onFailure) {
  if (!API.validateId("patient ID", patientNote.pharmacy_store_patient.patient_id, onFailure)) {
    return
  }
  if (!API.validateId("pharmacy store ID", patientNote.pharmacy_store_patient.pharmacy_store_id, onFailure)) {
    return
  }

  const method = "POST"
  const path = `/patients/${patientNote.pharmacy_store_patient.patient_id}/patient_notes`
  API.perform(method, path, "", userCredentials, toJSON(patientNote), onSuccess, onFailure)
}

function listForPatient(userCredentials, patient_id, params, onSuccess, onFailure) {
  if (!API.validateId("patient ID", patient_id, onFailure)) {
    return
  }

  const method = "GET"
  const path = `/patients/${patient_id}/patient_notes/list`
  API.perform(method, path, API.buildQueryString(params), userCredentials, undefined, onSuccess, onFailure)
}

function show(userCredentials, id, onSuccess, onFailure) {
  if (!API.validateId("patient note ID", id, onFailure)) {
    return
  }

  const method = "GET"
  const path = `/patient_notes/${id}`
  API.perform(method, path, "", userCredentials, undefined, onSuccess, onFailure)
}
