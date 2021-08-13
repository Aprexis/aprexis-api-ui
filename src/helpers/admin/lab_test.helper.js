import { fieldHelper } from "../"

export const labTestHelper = {
  canDelete,
  canEdit,
  category,
  fullName,
  keyCode,
  modelName,
  name,
  normalValue,
  units,
  vital
}

function canDelete(user, labTest) {
  return false
}

function canEdit(user, labTest) {
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

function modelName() {
  return "labTest"
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
