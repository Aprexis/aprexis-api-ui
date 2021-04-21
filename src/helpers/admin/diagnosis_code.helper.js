import { valueHelper } from "../"
import { diagnosisCodes } from "../../types"

export const diagnosisCodeHelper = {
  code,
  toBreadcrumb,
  type,
  typeLabel
}

function code(diagnosisCode) {
  return valueHelper.getField(diagnosisCode, code)
}

function toBreadcrumb(diagnosisCode) {
  if (!valueHelper.isValue(diagnosisCode)) {
    return "(no diagnosis code)"
  }

  return `${diagnosisCodeHelper.typeLabel(diagnosisCode)} ${diagnosisCodeHelper.code(diagnosisCode)}`
}

function type(diagnosisCode) {
  return valueHelper.getField(diagnosisCode, "type")
}

function typeLabel(diagnosisCode) {
  const type = diagnosisCodeHelper.type(diagnosisCode)
  if (!valueHelper.isStringValue(type)) {
    return ""
  }

  return diagnosisCodes[type]
}
