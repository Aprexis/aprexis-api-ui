import { fieldHelper } from "./"

export const modelDatesHelper = {
  createdAt,
  updatedAt
}

function createdAt(model) {
  return fieldHelper.getField(model, "created_at")
}

function updatedAt(model) {
  return fieldHelper.getField(model, "updated_at")
}
