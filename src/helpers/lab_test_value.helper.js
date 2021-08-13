import { fieldHelper } from "./field.helper"
import { interventionHelper } from "./intervention.helper"
import { labTestHelper } from "./admin"

export const labTestValueHelper = {
  canDelete,
  canEdit,
  labTestKeyCode,
  labTestFullName,
  labTestName,
  modelName,
  programName,
  value
}

function canDelete(user, labTestValue) {
  return false
}

function canEdit(user, labTestValue) {
  return false
}

function labTestKeyCode(labTestValue) {
  return labTestHelper.keyCode(fieldHelper.getField(labTestValue, "lab_test"))
}

function labTestFullName(labTestValue) {
  return labTestHelper.fullName(fieldHelper.getField(labTestValue, "lab_test"))
}

function labTestName(labTestValue) {
  return labTestHelper.name(fieldHelper.getField(labTestValue, "lab_test"))
}

function modelName() {
  return "labTestValue"
}

function programName(labTestValue) {
  return interventionHelper.programName(fieldHelper.getField(labTestValue, "intervention"))
}

function value(labTestValue) {
  return fieldHelper.getField(labTestValue, "value")
}
