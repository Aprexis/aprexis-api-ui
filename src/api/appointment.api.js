import { API } from "./"

export const appointmentApi = {
  destroy,
  listForUser
}

function destroy(userCredentials, id, onSuccess, onFailure) {
  if (!API.validateId("appointment ID", id, onFailure)) {
    return
  }

  const method = "DELETE"
  const path = `/appointments/${id}`
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
