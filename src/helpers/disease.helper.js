import { fieldHelper } from "./field.helper"

export const diseaseHelper = {
  description,
  modelName,
  name
}

function description(disease) {
  return fieldHelper.getField(disease, "description")
}

function modelName() {
  return "disease"
}

function name(disease) {
  return fieldHelper.getField(disease, "name")
}
