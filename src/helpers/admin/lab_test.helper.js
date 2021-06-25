import { fieldHelper } from "../"

export const labTestHelper = {
  canEdit,
  category,
  fullName,
  keyCode,
  name,
  normalValue,
  units,
  vital
}

function canEdit(currentUser, labTest) {
  return false
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

function normalValue(labTest) {
  return fieldHelper.getField(labTest, "normal_value")
}

function units(labTest) {
  return fieldHelper.getField(labTest, "units")
}

function vital(labTest) {
  return fieldHelper.getField(labTest, "vital")
}
