import { fieldHelper } from "../"

export const placeOfServiceHelper = {
  name
}

function name(placeOfService) {
  return fieldHelper.getField(placeOfService, "name")
}
