import { fieldHelper, valueHelper } from "../"
import { diagnosisCodes } from "../../types"

export const diagnosisCodeHelper = {
  billable,
  canEdit,
  code,
  longDescription,
  shortDescription,
  toBreadcrumb,
  type,
  typeLabel
}

function billable(diagnosisCode) {
  return fieldHelper.getField(diagnosisCode, "billable")
}

function canEdit(currentUser, diagnosisCode) {
  return false
}

function code(diagnosisCode) {
  return fieldHelper.getField(diagnosisCode, "code")
}

function longDescription(diagnosisCode) {
  return fieldHelper.getField(diagnosisCode, "long_description")
}

function shortDescription(diagnosisCode) {
  return fieldHelper.getField(diagnosisCode, "short_description")
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
