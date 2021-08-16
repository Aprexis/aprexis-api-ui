import { valueHelper } from "./value.helper"
import { fieldHelper } from "./field.helper"
import { pathHelper } from "./path.helper"
import { apiHelper } from "./api.helper"
import { physicianHelper } from "./physician.helper"
import { userHelper } from "./user.helper"

export const patientPhysicianHelper = {
  buildChanged,
  buildNewChanged,
  canBeCreated,
  canDelete,
  canEdit,
  canModifyField,
  changePhysician,
  id,
  modelName,
  patientId,
  physician,
  physicianId,
  physicianName,
  primary,
  toJSON
}

const patientPhysicianEditableFields = [
  "primary"
]

const patientPhysicianKeys = [
  "id",
  "patient_id",
  "physician_id",
  "primary"
]

function buildChanged(patientPhysician, changedPatientPhysician) {
  if (valueHelper.isValue(changedPatientPhysician)) {
    return changedPatientPhysician
  }

  if (valueHelper.isValue(patientPhysician.id)) {
    return copyIdentifiers(patientPhysician)
  }

  return patientPhysicianHelper.buildNewChanged(patientPhysician)

  function copyIdentifiers(patientPhysician) {
    return {
      id: patientPhysician.id,
      physician_id: patientPhysician.physician_id,
      patient_id: patientPhysician.patient_id
    }
  }
}

function buildNewChanged(patientPhysician) {
  return {
    ...patientPhysician
  }
}

function canBeCreated(user, pathEntries) {
  if (!userHelper.canCreatePatientPhysician(user, pathEntries, true)) {
    return false
  }

  return pathHelper.isSingular(pathEntries, "patients")
}


function canDelete(user, patientPhysician) {
  return userHelper.hasRole(
    user,
    [
      'aprexis_admin',
      'health_plan_admin',
      'health_plan_user',
      'pharmacy_store_admin',
      'pharmacy_store_tech',
      'pharmacy_store_user'
    ]
  )
}

function canEdit(user, patientPhysician) {
  return userHelper.hasRole(
    user,
    [
      'aprexis_admin',
      'health_plan_admin',
      'health_plan_user',
      'pharmacy_store_admin',
      'pharmacy_store_tech',
      'pharmacy_store_user'
    ]
  )
}

function canModifyField(patientPhysician, fieldName) {
  if (!valueHelper.isValue(patientPhysicianHelper.id(patientPhysician))) {
    return true
  }

  return (patientPhysicianEditableFields.includes(fieldName))
}

function changePhysician(patientPhysician, changedPatientPhysician, physician) {
  const myChangedPatientPhysician = this.buildChanged(patientPhysician, changedPatientPhysician)

  return {
    patientPhysician: {
      ...patientPhysician,
      physician_id: physician.id,
      physician
    },
    changedPatientPhysician: {
      ...myChangedPatientPhysician,
      physician_id: physician.id,
      physician
    }
  }
}

function id(patientPhysician) {
  return fieldHelper.getField(patientPhysician, "id")
}

function modelName() {
  return "patientPhysician"
}

function patientId(patientPhysician) {
  return fieldHelper.getField(patientPhysician, "patient_id")
}

function physician(patientPhysician) {
  return fieldHelper.getField(patientPhysician, "physician")
}

function physicianId(patientPhysician) {
  return fieldHelper.getField(patientPhysician, "physician_id")
}

function physicianName(patientPhysician) {
  return physicianHelper.name(patientPhysicianHelper.physician(patientPhysician))
}

function primary(patientPhysician) {
  return fieldHelper.getField(patientPhysician, "primary")
}

function toJSON(patientPhysician) {
  return apiHelper.toJSON(patientPhysician, patientPhysicianKeys)
}
