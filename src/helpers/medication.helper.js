import { fieldHelper } from "./"

export const medicationHelper = {
  label
}

function label(medication) {
  return fieldHelper.getField(medication, "label")
}
