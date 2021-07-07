import { fieldHelper } from ".."

export const medicationHelper = {
  canEdit,
  label,
  superset,
  supersetLabel
}

function canEdit(currentUser, medication) {
  return false
}

function label(medication) {
  return fieldHelper.getField(medication, "label")
}

function superset(medication) {
  return fieldHelper.getField(medication, "superset")
}

function supersetLabel(medication) {
  return medicationHelper.label(medicationHelper.superset(medication))
}
