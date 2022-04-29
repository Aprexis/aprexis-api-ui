import { fieldHelper } from "./field.helper"

export const medicationHelper = {
  label,
  name
}

function label(medication) {
  return medicationHelper.name(medication)
}

function name(medication) {
  return fieldHelper.getField(medication, "name")
}
