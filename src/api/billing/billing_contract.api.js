import { API } from "../"
import { billingContractHelper } from "../../helpers/billing"

export const billingContractApi = {
  buildNew,
  create,
  edit,
  indexForHealthPlan,
  listForHealthPlan,
  profile,
  show,
  update
}

function toJSON(billingContract) {
  return {
    billing_contract: billingContractHelper.toJSON(billingContract)
  }
}

function buildNew(userCredentials, health_plan_id, onSuccess, onFailure) {
  if (!API.validateId("health plan ID", health_plan_id, onFailure)) {
    return
  }

  const method = "GET"
  const path = `/health_plans/${health_plan_id}/billing/contracts/new`
  API.perform(method, path, "", userCredentials, undefined, onSuccess, onFailure)
}

function create(userCredentials, billingContract, onSuccess, onFailure) {
  if (!API.validateId("health plan ID", billingContract.health_plan_id, onFailure)) {
    return
  }

  const method = "POST"
  const path = `/health_plans/${billingContract.health_plan_id}/billing/contracts`
  API.perform(method, path, "", userCredentials, toJSON(billingContract), onSuccess, onFailure)
}

function edit(userCredentials, id, onSuccess, onFailure) {
  if (!API.validateId("billing contract ID", id, onFailure)) {
    return
  }

  const method = "GET"
  const path = `/billing/contracts/${id}/edit`
  API.perform(method, path, "", userCredentials, undefined, onSuccess, onFailure)
}

function indexForHealthPlan(userCredentials, health_plan_id, params, onSuccess, onFailure) {
  if (!API.validateId("health plan ID", health_plan_id, onFailure)) {
    return
  }

  const method = "GET"
  const path = `/health_plans/${health_plan_id}/billing/contracts`
  API.perform(method, path, API.buildQueryString(params), userCredentials, undefined, onSuccess, onFailure)
}

function listForHealthPlan(userCredentials, health_plan_id, params, onSuccess, onFailure) {
  if (!API.validateId("health plan ID", health_plan_id, onFailure)) {
    return
  }

  const method = "GET"
  const path = `/health_plans/${health_plan_id}/billing/contracts/list`
  API.perform(method, path, API.buildQueryString(params), userCredentials, undefined, onSuccess, onFailure)
}

function profile(userCredentials, id, onSuccess, onFailure) {
  if (!API.validateId("billing contract ID", id, onFailure)) {
    return
  }

  const method = "GET"
  const path = `/billing/contracts/${id}/profile`
  API.perform(method, path, "", userCredentials, undefined, onSuccess, onFailure)
}

function show(userCredentials, id, onSuccess, onFailure) {
  if (!API.validateId("billing contract ID", id, onFailure)) {
    return
  }

  const method = "GET"
  const path = `/billing/contracts/${id}`
  API.perform(method, path, "", userCredentials, undefined, onSuccess, onFailure)
}

function update(userCredentials, billingContract, onSuccess, onFailure) {
  const method = "PUT"
  const path = `/billing/contracts/${billingContractHelper.id(billingContract)}`
  API.perform(method, path, "", userCredentials, toJSON(billingContract), onSuccess, onFailure)
}
