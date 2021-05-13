import { nameHelper } from "./"

export const physicianHelper = {
  firstName,
  lastName,
  middleName,
  name
}

function firstName(physician, prefix = "") {
  return nameHelper.firstName(physician, prefix)
}

function lastName(physician, prefix = "") {
  return nameHelper.lastName(physician, prefix)
}

function middleName(physician, prefix = "") {
  return nameHelper.middleName(physician, prefix)
}

function name(physician, prefix = "") {
  return nameHelper.name(physician, "physician", prefix)
}
