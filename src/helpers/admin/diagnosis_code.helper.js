import { fieldHelper, valueHelper } from "../"
import { diagnosisCodes } from "../../types"

export const diagnosisCodeHelper = {
  code,
  longDescription,
  toBreadcrumb,
  type,
  typeLabel
}

function code(diagnosisCode) {
  return fieldHelper.getField(diagnosisCode, "code")
}

function longDescription(diagnosisCode) {
  return fieldHelper.getField(diagnosisCode, "long_description")
}

function toBreadcrumb(diagnosisCode) {
  if (!valueHelper.isValue(diagnosisCode)) {
    return "(no diagnosis code)"
  }

  return `${diagnosisCodeHelper.typeLabel(diagnosisCode)} ${diagnosisCodeHelper.code(diagnosisCode)}`
}

function type(diagnosisCode) {
  return fieldHelper.getField(diagnosisCode, "type")
}

function typeLabel(diagnosisCode) {
  const type = diagnosisCodeHelper.type(diagnosisCode)
  if (!valueHelper.isStringValue(type)) {
    return ""
  }

  return diagnosisCodes[type]
}
