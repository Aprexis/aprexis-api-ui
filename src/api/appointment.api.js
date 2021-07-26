import { API } from "./"

export const appointmentApi = {
  listForUser
}

function listForUser(userCredentials, user_id, params, onSuccess, onFailure) {
  if (!API.validateId("user ID", user_id, onFailure)) {
    return
  }

  const method = "GET"
  const path = `/admin/users/${user_id}/appointments/list`
  API.perform(method, path, API.buildQueryString(params), userCredentials, undefined, onSuccess, onFailure)
}
