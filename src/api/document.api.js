import { API } from "./"

export const documentApi = {
  download,
  listForHealthPlan,
  profile
}

function download(userCredentials, document_id, onSuccess, onFailure) {
  if (!API.validateId("document ID", document_id, onFailure)) {
    return
  }

  const method = "GET"
  const path = `/documents/${document_id}/download`
  API.perform(method, path, "", userCredentials, undefined, onSuccess, onFailure, { isDownload: true })
}

function listForHealthPlan(userCredentials, health_plan_id, params, onSuccess, onFailure) {
  if (!API.validateId("health plan ID", health_plan_id, onFailure)) {
    return
  }

  const method = "GET"
  const path = `/health_plans/${health_plan_id}/documents/list`
  API.perform(method, path, API.buildQueryString(params), userCredentials, undefined, onSuccess, onFailure)
}

function profile(userCredentials, document_id, onSuccess, onFailure) {
  if (!API.validateId("document ID", document_id, onFailure)) {
    return
  }

  const method = "GET"
  const path = `/documents/${document_id}/profile`
  API.perform(method, path, "", userCredentials, undefined, onSuccess, onFailure)
}
