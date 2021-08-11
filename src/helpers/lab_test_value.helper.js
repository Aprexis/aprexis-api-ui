import { fieldHelper } from "./field.helper"
import { interventionHelper } from "./intervention.helper"
import { labTestHelper } from "./admin"

export const labTestValueHelper = {
  canEdit,
  labTestKeyCode,
  labTestFullName,
  labTestName,
  programName,
  value
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

function programName(labTestValue) {
  return interventionHelper.programName(fieldHelper.getField(labTestValue, "intervention"))
}

function value(labTestValue) {
  return fieldHelper.getField(labTestValue, "value")
}
