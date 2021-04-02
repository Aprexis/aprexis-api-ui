import { API } from './'

export const patientSearchAlgorithmApi = {
  forHealthPlan,
  legitimate
}

function forHealthPlan(userCredentials, healthPlanId, params, onSuccess, onFailure) {
  if (!API.validateId('health plan ID', healthPlanId, onFailure)) {
    return
  }

  const method = "GET"
  const path = `/health_plans/${healthPlanId}/patient_search_algorithms`
  API.perform(method, path, API.buildQueryString(params), userCredentials, undefined, onSuccess, onFailure)
}

function legitimate(userCredentials, onSuccess, onFailure) {
  const method = "GET"
  const path = "/patient_search_algorithms/legitimate"
  API.perform(method, path, '', userCredentials, undefined, onSuccess, onFailure)
}
