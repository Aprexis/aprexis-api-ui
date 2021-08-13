import { fieldHelper, valueHelper } from "../"

export const diseaseHelper = {
  canDelete,
  canEdit,
  description,
  modelName,
  name,
  questionKey,
  toBreadcrumb
}

function canDelete(user, disease) {
  return false
}

function canEdit(user, disease) {
  return false
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

function questionKey(disease) {
  return fieldHelper.getField(disease, "question_key")
}

function toBreadcrumb(disease) {
  if (!valueHelper.isValue(disease)) {
    return "(no disease)"
  }

  const nameString = diseaseHelper.name(disease)
  if (valueHelper.isStringValue(nameString)) {
    return nameString
  }

  return diseaseHelper.questionKey(disease)
}
