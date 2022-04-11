import { fieldHelper } from "./field.helper"

export const medicationHelper = {
  name
}

function name(medication) {
  return fieldHelper.getField(medication, "name")
}
