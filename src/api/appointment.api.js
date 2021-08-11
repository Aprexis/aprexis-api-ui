import { API } from "./"
import { appointmentHelper } from "../helpers"

export const appointmentApi = {
  buildNew,
  create,
  destroy,
  edit,
  listForUser,
  update
}

function toJSON(appointment) {
  return {
    appointment: appointmentHelper.toJSON(appointment)
  }
}

function buildNew(userCredentials, user_id, params, onSuccess, onFailure) {
  if (!API.validateId("user ID", user_id, onFailure)) {
    return
  }

  const method = "GET"
  const path = `/admin/users/${user_id}/appointments/new`
  API.perform(method, path, API.buildQueryString(params), userCredentials, undefined, onSuccess, onFailure)
}

function create(userCredentials, appointment, onSuccess, onFailure) {
  if (!API.validateId("user ID", appointment.user_id, onFailure)) {
    return
  }
  if (!API.validateId("pharmacy store ID", appointment.pharmacy_store_id, onFailure, true)) {
    return
  }

  const method = "POST"
  const path = `/admin/users/${appointment.user_id}/appointments`
  API.perform(method, path, "", userCredentials, toJSON(appointment), onSuccess, onFailure)
}

function destroy(userCredentials, id, onSuccess, onFailure) {
  if (!API.validateId("appointment ID", id, onFailure)) {
    return
  }

  const method = "DELETE"
  const path = `/appointments/${id}`
  API.perform(method, path, "", userCredentials, undefined, onSuccess, onFailure)
}

function edit(userCredentials, id, onSuccess, onFailure) {
  if (!API.validateId("appointment ID", id, onFailure)) {
    return
  }

  const method = "GET"
  const path = `/appointments/${id}/edit`
  API.perform(method, path, "", userCredentials, undefined, onSuccess, onFailure)
}

function listForUser(userCredentials, user_id, params, onSuccess, onFailure) {
  if (!API.validateId("user ID", user_id, onFailure)) {
    return
  }

  const method = "GET"
  const path = `/admin/users/${user_id}/appointments/list`
  API.perform(method, path, API.buildQueryString(params), userCredentials, undefined, onSuccess, onFailure)
}

function update(userCredentials, appointment, onSuccess, onFailure) {
  const method = "PUT"
  const path = `/appointments/${appointment.id}`
  API.perform(method, path, "", userCredentials, toJSON(appointment), onSuccess, onFailure)
}
