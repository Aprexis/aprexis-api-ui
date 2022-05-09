import { fieldHelper } from ".."
import { dateHelper } from "../date.helper"
import { valueHelper } from "../value.helper"

export const billingClaimHistoryCollectionHelper = {
  canDelete,
  canEdit,
  displayFinishedAt,
  displayQueuedAt,
  displayStartedAt,
  displayState,
  fileName,
  finishedAt,
  modelName,
  queuedAt,
  startedAt,
  state
}

function canDelete(_user, _billingClaimHistoryCollection) {
  return false
}

function canEdit(_user, _billingClaimHistoryCollection) {
  return false
}

function displayFinishedAt(billingClaimHistoryCollection) {
  return dateHelper.displayDateTime(billingClaimHistoryCollectionHelper.finishedAt(billingClaimHistoryCollection))
}

function displayQueuedAt(billingClaimHistoryCollection) {
  return dateHelper.displayDateTime(billingClaimHistoryCollectionHelper.queuedAt(billingClaimHistoryCollection))
}

function displayStartedAt(billingClaimHistoryCollection) {
  return dateHelper.displayDateTime(billingClaimHistoryCollectionHelper.startedAt(billingClaimHistoryCollection))
}

function displayState(billingClaimHistoryCollection) {
  return valueHelper.titleize(billingClaimHistoryCollectionHelper.state(billingClaimHistoryCollection))
}

function fileName(billingClaimHistoryCollection) {
  return fieldHelper.getField(billingClaimHistoryCollection, "file_name")
}

function finishedAt(billingClaimHistoryCollection) {
  return fieldHelper.getField(billingClaimHistoryCollection, "finished_at")
}

function modelName() {
  return "BillingClaimHistoryCollection"
}

function queuedAt(billingClaimHistoryCollection) {
  return fieldHelper.getField(billingClaimHistoryCollection, "queued_at")
}

function startedAt(billingClaimHistoryCollection) {
  return fieldHelper.getField(billingClaimHistoryCollection, "started_at")
}

function state(billingClaimHistoryCollection) {
  return fieldHelper.getField(billingClaimHistoryCollection, "state")
}
