import { API } from "./"

export const patientApi = {
  edit,
  list,
  listForHealthPlan,
  listForPharmacyStore,
  search,
  show
}

function edit(userCredentials, id, onSuccess, onFailure) {
  if (!API.validateId("patient ID", id, onFailure)) {
    return
  }

  const method = "GET"
  const path = `/patients/${id}/edit`
  API.perform(method, path, "", userCredentials, undefined, onSuccess, onFailure)
}

function list(userCredentials, params, onSuccess, onFailure) {
  const method = "GET"
  const path = `/patients/list`
  API.perform(method, path, API.buildQueryString(params), userCredentials, undefined, onSuccess, onFailure)
}

function listForHealthPlan(userCredentials, health_plan_id, params, onSuccess, onFailure) {
  if (!API.validateId("health plan ID", health_plan_id, onFailure)) {
    return
  }

  const method = "GET"
  const path = `/health_plans/${health_plan_id}/patients/list`
  API.perform(method, path, API.buildQueryString(params), userCredentials, undefined, onSuccess, onFailure)
}

function listForPharmacyStore(userCredentials, pharmacy_store_id, params, onSuccess, onFailure) {
  if (!API.validateId("pharmacy store ID", pharmacy_store_id, onFailure)) {
    return
  }

  const method = "GET"
  const path = `/pharmacy_stores/${pharmacy_store_id}/patients/list`
  API.perform(method, path, API.buildQueryString(params), userCredentials, undefined, onSuccess, onFailure)
}

function search(userCredentials, params, onSuccess, onFailure) {
  const method = "GET"
  const path = `/patients/search`
  API.perform(method, path, API.buildQueryString(params), userCredentials, undefined, onSuccess, onFailure)
}

function show(userCredentials, id, onSuccess, onFailure) {
  if (!API.validateId("patient ID", id, onFailure)) {
    return
  }

  const method = "GET"
  const path = `/patients/${id}`
  API.perform(method, path, "", userCredentials, undefined, onSuccess, onFailure)
}
