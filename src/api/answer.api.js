import { API } from "./"

export const answerApi = {
  listForIntervention
}

function listForIntervention(userCredentials, intervention_id, params, onSuccess, onFailure) {
  if (!API.validateId("intervention ID", intervention_id, onFailure)) {
    return
  }

  const method = "GET"
  const path = `/interventions/${intervention_id}/answers/list`
  API.perform(method, path, API.buildQueryString(params), userCredentials, undefined, onSuccess, onFailure)
}
