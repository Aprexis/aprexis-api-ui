import { fieldHelper } from "./field.helper"
import { physicianHelper } from "./physician.helper"

export const patientPhysicianHelper = {
  canEdit,
  physician,
  physicianName,
  primary
}

function canEdit(currentUser, patientPhysician) {
  return false
}

function physician(patientPhysician) {
  return fieldHelper.getField(patientPhysician, "physician")
}

function physicianName(patientPhysician) {
  return physicianHelper.name(patientPhysicianHelper.physician(patientPhysician))
}

function primary(patientPhysician) {
  return fieldHelper.getField(patientPhysician, "primary")
}
