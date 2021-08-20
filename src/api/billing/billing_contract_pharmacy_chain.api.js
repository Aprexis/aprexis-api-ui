import { API } from "../"
import { billingContractPharmacyChainHelper } from "../../helpers/billing"

function toJSON(billingContractPharmacyChain) {
  return {
    billing_contract_pharmacy: billingContractPharmacyChainHelper.toJSON(billingContractPharmacyChain)
  }
}

export const billingContractPharmacyChainApi = {
  buildNewForBillingContract,
  create,
  indexForBillingContract,
  listForBillingContract,
  profile,
  show
}

function buildNewForBillingContract(userCredentials, billing_contract_id, onSuccess, onFailure) {
  if (!API.validateId("billing contract ID", billing_contract_id, onFailure)) {
    return
  }

  const method = "GET"
  const path = `/billing/contracts/${billing_contract_id}/contract_pharmacies/new`
  API.perform(method, path, "", userCredentials, undefined, onSuccess, onFailure)
}

function create(userCredentials, billingContractPharmacyChain, onSuccess, onFailure) {
  if (!API.validateId("contract ID", billingContractPharmacyChain.contract_id, onFailure)) {
    return
  }
  if (!API.validateId("pharmacy ID", billingContractPharmacyChain.pharmacy_id, onFailure)) {
    return
  }

  const method = "POST"
  const path = `/billing/contracts/${billingContractPharmacyChain.contract_id}/contract_pharmacies`
  API.perform(method, path, "", userCredentials, toJSON(billingContractPharmacyChain), onSuccess, onFailure)
}


function indexForBillingContract(userCredentials, billing_contract_id, params, onSuccess, onFailure) {
  if (!API.validateId("billing contract ID", billing_contract_id, onFailure)) {
    return
  }

  const method = "GET"
  const path = `/billing/contracts/${billing_contract_id}/contract_pharmacies`
  API.perform(method, path, API.buildQueryString(params), userCredentials, undefined, onSuccess, onFailure)
}

function listForBillingContract(userCredentials, billing_contract_id, params, onSuccess, onFailure) {
  if (!API.validateId("billing contract ID", billing_contract_id, onFailure)) {
    return
  }

  const method = "GET"
  const path = `/billing/contracts/${billing_contract_id}/contract_pharmacies/list`
  API.perform(method, path, API.buildQueryString(params), userCredentials, undefined, onSuccess, onFailure)
}

function profile(userCredentials, id, onSuccess, onFailure) {
  if (!API.validateId("contract pharmacy ID", id, onFailure)) {
    return
  }

  const method = "GET"
  const path = `/billing/contract_pharmacies/${id}/profile`
  API.perform(method, path, "", userCredentials, undefined, onSuccess, onFailure)
}

function show(userCredentials, id, onSuccess, onFailure) {
  if (!API.validateId("contract pharmacy ID", id, onFailure)) {
    return
  }

  const method = "GET"
  const path = `/billing/contract_pharmacies/${id}`
  API.perform(method, path, "", userCredentials, undefined, onSuccess, onFailure)
}
