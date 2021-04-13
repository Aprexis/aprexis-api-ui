import { valueHelper } from "../"

export const diseaseHelper = {
  name,
  questionKey,
  toBreadcrumb
}

function name(disease) {
  if (!valueHelper.isValue(disease)) {
    return ""
  }

  return disease.name
}

function questionKey(disease) {
  if (!valueHelper.isValue(disease)) {
    return ""
  }

  return disease.question_key
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
