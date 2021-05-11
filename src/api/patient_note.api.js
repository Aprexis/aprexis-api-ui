import { API } from "./"
import { patientNoteHelper } from "../helpers"

export const patientNoteApi = {
  create,
  listForPatient
}

function toJSON(patientNote) {
  return {
    patient_note: patientNoteHelper.toJSON(patientNote)
  }
}

function create(userCredentials, patientNote, onSuccess, onFailure) {
  const method = "POST"
  const path = "/patient_notes"
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
