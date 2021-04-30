import { fieldHelper, interventionHelper } from "./"
import { labTestHelper } from "./admin"

export const labTestValueHelper = {
  labTestKeyCode,
  labTestFullName,
  labTestName,
  programName,
  value
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
