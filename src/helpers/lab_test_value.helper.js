import { dateHelper } from "./date.helper"
import { fieldHelper } from "./field.helper"
import { interventionHelper } from "./intervention.helper"
import { pathHelper } from "./path.helper"
import { userHelper } from "./user.helper"
import { valueHelper } from "./value.helper"
import { labTestHelper } from "./admin"

export const labTestValueHelper = {
  buildChanged,
  buildNewChanged,
  canBeCreated,
  canDelete,
  canEdit,
  canModifyField,
  displayValueTakenAt,
  labTestId,
  labTestKeyCode,
  labTestFullName,
  labTestName,
  modelName,
  pharmacyStoreId,
  programName,
  userId,
  value,
  valueTakenAt
}

function buildChanged(labTestValue, changedLabTestValue) {
  if (valueHelper.isValue(changedLabTestValue)) {
    return changedLabTestValue
  }

  if (valueHelper.isValue(labTestValue.id)) {
    return copyIdentifiers(labTestValue)
  }

  return labTestValueHelper.buildNewChanged(labTestValue)

  function copyIdentifiers(labTestValue) {
    return {
      id: labTestValue.id,
      intervention_id: labTestValue.intervention_id,
      lab_test_id: labTestValue.lab_test_id,
      patient_id: labTestValue.patient_id,
      pharmacy_store_id: labTestValue.pharmacy_store_id,
      type: labTestValue.type,
      user_id: labTestValue.user_id
    }
  }
}

function buildNewChanged(labTestValue) {
  return {
    ...labTestValue
  }
}


function canBeCreated(user, pathEntries) {
  if (!userHelper.canCreateLabTestValue(user, pathEntries)) {
    return false
  }

  return pathHelper.isSingular(pathEntries, "patients") || pathHelper.isSinguler(pathEntries, "intervention")
}

function canDelete(_user, _labTestValue) {
  return false
}

function canEdit(_user, _labTestValue) {
  return false
}

function canModifyField(_labTestValue, _fieldName) {
  return true
}

function displayValueTakenAt(labTestValue) {
  const valueTakenAt = this.valueTakenAt(labTestValue)

  return dateHelper.displayDateTime(valueTakenAt)
}

function labTestId(labTestValue) {
  return fieldHelper.getField(labTestValue, "lab_test_id")
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

function pharmacyStoreId(labTestValue) {
  return fieldHelper.getField(labTestValue, "pharmacy_store_id")
}

function programName(labTestValue) {
  return interventionHelper.programName(fieldHelper.getField(labTestValue, "intervention"))
}

function userId(labTestValue) {
  return fieldHelper.getField(labTestValue, "user_id")
}

function value(labTestValue) {
  return fieldHelper.getField(labTestValue, "value")
}

function valueTakenAt(labTestValue) {
  return fieldHelper.getField(labTestValue, "value_taken_at")
}
