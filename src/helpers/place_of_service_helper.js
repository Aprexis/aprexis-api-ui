import { fieldHelper } from '.'

export const placeOfServiceHelper = {
  code,
  name
}

function code(placeOfService) {
  return fieldHelper.getField(placeOfService, "code")
}

function name(placeOfService) {
  return fieldHelper.getField(placeOfService, "name")
}
