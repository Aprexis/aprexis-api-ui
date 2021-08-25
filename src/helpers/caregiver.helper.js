import { valueHelper } from "./value.helper"
import { fieldHelper } from "./field.helper"
import { nameHelper } from "./name.helper"
import { pathHelper } from "./path.helper"
import { apiHelper } from "./api.helper"
import { patientHelper } from "./patient.helper"

const caregiverKeys = [
  "id",
  "patient_id",
  "address",
  "city",
  "country",
  "email",
  "fax",
  "first_name",
  "is_current_caregiver",
  "last_name",
  "mobile_phone",
  "phone",
  "phone_extension",
  "relationship",
  "state",
  "use_patient_address",
  "zip_code"
]

export const caregiverHelper = {
  buildChanged,
  buildNewChanged,
  canBeCreated,
  canDelete,
  canEdit,
  canModifyField,
  displayIsCurrentCaregiver,
  firstName,
  id,
  isCurrentCaregiver,
  lastName,
  modelName,
  name,
  patient,
  patientId,
  patientName,
  relationship,
  toJSON,
  usePatientAddress
}

function buildChanged(caregiver, changedCaregiver) {
  if (valueHelper.isValue(changedCaregiver)) {
    return changedCaregiver
  }

  if (valueHelper.isValue(caregiver.id)) {
    return copyIdentifiers(caregiver)
  }

  return caregiverHelper.buildNewChanged(caregiver)

  function copyIdentifiers(caregiver) {
    return {
      id: caregiverHelper.id(caregiver),
      patient_id: caregiverHelper.patientId(caregiver)
    }
  }
}

function buildNewChanged(caregiver) {
  return {
    ...caregiver
  }
}

function canBeCreated(user, pathEntries, context) {
  if (!pathHelper.isSingular(pathEntries, "patients") || !valueHelper.isValue(context)) {
    return false
  }

  const patient = context.patients
  return patientHelper.canEdit(user, patient, patientHelper.healthPlan(patient))
}

function canDelete(user, caregiver) {
  return caregiverHelper.canEdit(user, caregiver)
}

function canEdit(user, caregiver) {
  const patient = caregiverHelper.patient(caregiver)

  return patientHelper.canEdit(user, patient, patientHelper.healthPlan(patient))
}

function canModifyField(caregiver, fieldName) {
  return fieldName != "patient_id"
}

function displayIsCurrentCaregiver(caregiver) {
  return valueHelper.yesNo(caregiverHelper.isCurrentCaregiver(caregiver))
}

function firstName(caregiver) {
  return fieldHelper.getField(caregiver, "first_name")
}

function id(caregiver) {
  return fieldHelper.getField(caregiver, "id")
}

function isCurrentCaregiver(caregiver) {
  return fieldHelper.getField(caregiver, "is_current_caregiver")
}

function lastName(caregiver) {
  return fieldHelper.getField(caregiver, "last_name")
}

function modelName() {
  return "caregiver"
}

function name(caregiver) {
  return nameHelper.name(caregiver, "caregiver")
}

function patient(caregiver) {
  return fieldHelper.getField(caregiver, "patient")
}

function patientId(caregiver) {
  return fieldHelper.getField(caregiver, "patient_id")
}

function patientName(caregiver) {
  return patientHelper.name(caregiverHelper.patient(caregiver))
}

function relationship(caregiver) {
  return fieldHelper.getField(caregiver, "relationship")
}

function toJSON(caregiver) {
  return apiHelper.toJSON(caregiver, caregiverKeys)
}

function usePatientAddress(caregiver) {
  return fieldHelper.getField(caregiver, "use_patient_address")
}
