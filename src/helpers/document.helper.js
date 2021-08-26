import { valueHelper } from "./value.helper"
import { fieldHelper } from "./field.helper"
import { apiHelper } from "./api.helper"

const documentKeys = [
  "id",
  "health_plan_id",
  "slug"
]

export const documentHelper = {
  buildChanged,
  buildNewChanged,
  canBeCreated,
  canDelete,
  canEdit,
  canModifyField,
  createdAt,
  id,
  healthPlanId,
  modelName,
  slug,
  toJSON,
  updatedAt
}

function buildChanged(document, changedDocument) {
  if (valueHelper.isValue(changedDocument)) {
    return changedDocument
  }

  if (valueHelper.isValue(document.id)) {
    return copyIdentifiers(document)
  }

  return documentHelper.buildNewChanged(document)

  function copyIdentifiers(document) {
    return {
      id: documentHelper.id(document),
      health_plan_id: documentHelper.healthPlanId(document)
    }
  }
}

function buildNewChanged(document) {
  return {
    ...document
  }
}

function canBeCreated(user, pathEntries, context) {
  return false
}

function canDelete(user, document) {
  return false
}

function canEdit(user, document) {
  return false
}

function canModifyField(document, fieldName) {
  return false
}

function createdAt(document) {
  return fieldHelper.getField(document, "created_at")
}

function healthPlanId(document) {
  return fieldHelper.getField(document, "health_plan_id")
}

function id(document) {
  return fieldHelper.getField(document, "id")
}

function modelName() {
  return "document"
}

function slug(document) {
  return fieldHelper.getField(document, "slug")
}

function toJSON(document) {
  return apiHelper.toJSON(document, documentKeys)
}

function updatedAt(document) {
  return fieldHelper.getField(document, "updated_at")
}
