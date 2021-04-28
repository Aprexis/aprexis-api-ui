import { fieldHelper } from "../"

export const labTestHelper = {
  category,
  fullName,
  keyCode,
  name,
  units
}

function category(labTest) {
  return fieldHelper.getField(labTest, "category")
}

function fullName(labTest) {
  return fieldHelper.getField(labTest, "full_name")
}

function keyCode(labTest) {
  return fieldHelper.getField(labTest, "key_code")
}

function name(labTest) {
  return fieldHelper.getField(labTest, "name")
}

function units(labTest) {
  return fieldHelper.getField(labTest, "units")
}
