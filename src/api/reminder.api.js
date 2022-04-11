import { API } from "./"

export const reminderApi = {
  listForPatient,
  profile,
  show
}

function listForPatient(userCredentials, patient_id, params, onSuccess, onFailure) {
  if (!API.validateId("patient ID", patient_id, onFailure)) {
    return
  }

  const method = "GET"
  const path = `/patients/${patient_id}/reminders/list`
  API.perform(method, path, API.buildQueryString(params), userCredentials, undefined, onSuccess, onFailure)
}

function profile(userCredentials, reminder_id, onSuccess, onFailure) {
  if (!API.validateId("reminder ID", reminder_id, onFailure)) {
    return
  }

  const method = "GET"
  const path = `/reminders/${reminder_id}/profile`
  API.perform(method, path, '', userCredentials, undefined, onSuccess, onFailure)
}

function show(userCredentials, reminder_id, onSuccess, onFailure) {
  if (!API.validateId("reminder ID", reminder_id, onFailure)) {
    return
  }

  const method = "GET"
  const path = `/reminders/${reminder_id}`
  API.perform(method, path, '', userCredentials, undefined, onSuccess, onFailure)
}