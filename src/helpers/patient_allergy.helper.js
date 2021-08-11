import { valueHelper } from "./value.helper"
import { fieldHelper } from "./field.helper"
import { apiHelper } from "./api.helper"
import { pathHelper } from "./path.helper"
import { patientHelper } from "./patient.helper"
import { userHelper } from "./user.helper"
import { goldStandardAllergyHelper } from "./gold_standard"

export const patientAllergyHelper = {
  allergyName,
  allergyType,
  buildChanged,
  buildNewChanged,
  canBeCreated,
  canEdit,
  canModifyField,
  changeGoldStandardAllergy,
  goldStandardAllergy,
  goldStandardAllergyDescription,
  goldStandardAllergyId,
  goldStandardAllergyName,
  healthPlanId,
  id,
  patient,
  patientName,
  reaction,
  toJSON,
  year
}

const patientAllergyEditableFields = [
  "allergy_type",
  "reaction",
  "year"
]

const patientAllergyKeys = [
  "id",
  "gold_standard_allergy_id",
  "patient_id",
  "allergy_name",
  "allergy_type",
  "reaction",
  "year"
]

function allergyName(patientAllergy) {
  return fieldHelper.getField(patientAllergy, "allergy_name")
}

function allergyType(patientAllergy) {
  return fieldHelper.getField(patientAllergy, "allergy_type")
}

function buildChanged(patientAllergy, changedPatientAllergy) {
  if (valueHelper.isValue(changedPatientAllergy)) {
    return changedPatientAllergy
  }

  if (valueHelper.isValue(patientAllergy.id)) {
    return copyIdentifiers(patientAllergy)
  }

  return patientAllergyHelper.buildNewChanged(patientAllergy)

  function copyIdentifiers(patientAllergy) {
    return {
      id: patientAllergy.id,
      gold_standard_allergy_id: patientAllergy.gold_standard_allergy_id,
      patient_id: patientAllergy.patient_id
    }
  }
}

function buildNewChanged(patientAllergy) {
  return {
    ...patientAllergy
  }
}

function canBeCreated(currentUser, pathEntries) {
  if (!userHelper.canCreatePatientAllergy(currentUser, pathEntries)) {
    return false
  }


  return pathHelper.isSingular(pathEntries, "patients")
}

function canEdit(user, patientAllergy) {
  switch (userHelper.role(user)) {
    case 'aprexis_admin':
      return true

    case 'health_plan_admin':
    case 'health_plan_user':
      return userHelper.forHealthPlan(user, patientAllergyHelper.healthPlanId(patientAllergy))

    case 'pharmacy_store_admin':
    case 'pharmacy_store_tech':
    case 'pharmacy_store_user':
      return true

    default:
      return false
  }
}

function canModifyField(patientAllergy, fieldName) {
  if (!valueHelper.isValue(patientAllergyHelper.id(patientAllergy))) {
    return true
  }

  return (patientAllergyEditableFields.includes(fieldName))
}

function changeGoldStandardAllergy(modelName, model, changedModel, goldStandardAllergy) {
  const allergyName = goldStandardAllergyHelper.allergyName(goldStandardAllergy)
  const allergyId = goldStandardAllergyHelper.allergyId(goldStandardAllergy)

  let updated = { [modelName]: model, [valueHelper.changedModelName(modelName)]: changedModel }
  if (valueHelper.isValue(allergyName)) {
    updated = fieldHelper.changeValue(
      modelName,
      updated[modelName],
      updated[valueHelper.changedModelName(modelName)],
      "allergy_name",
      allergyName
    )
  }

  updated = fieldHelper.changeValue(
    modelName,
    updated[modelName],
    updated[valueHelper.changedModelName(modelName)],
    "gold_standard_allergy_id",
    allergyId
  )
  updated = fieldHelper.changeValue(
    modelName,
    updated[modelName],
    updated[valueHelper.changedModelName(modelName)],
    "gold_standard_allergy",
    goldStandardAllergy
  )

  return updated
}

function goldStandardAllergy(patientAllergy) {
  return fieldHelper.getField(patientAllergy, "gold_standard_allergy")
}

function goldStandardAllergyId(patientAllergy) {
  return fieldHelper.getField(patientAllergy, "gold_standard_allergy_id")
}

function goldStandardAllergyDescription(patientAllergy) {
  return goldStandardAllergyHelper.allergyDescription(patientAllergyHelper.goldStandardAllergy(patientAllergy))
}

function goldStandardAllergyName(patientAllergy) {
  return goldStandardAllergyHelper.allergyName(patientAllergyHelper.goldStandardAllergy(patientAllergy))
}

function healthPlanId(patientAllergy) {
  return patientHelper.healthPlanId(patientAllergyHelper.patient(patientAllergy))
}

function id(patientAllergy) {
  return fieldHelper.getField(patientAllergy, "id")
}

function patient(patientAllergy) {
  return fieldHelper.getField(patientAllergy, "patient")
}

function patientName(patientAllergy) {
  return patientHelper.name(patientAllergyHelper.patient(patientAllergy))
}

function reaction(patientAllergy) {
  return fieldHelper.getField(patientAllergy, "reaction")
}


function toJSON(patientAllergy) {
  return apiHelper.toJSON(patientAllergy, patientAllergyKeys)
}

function year(patientAllergy) {
  return fieldHelper.getField(patientAllergy, "year")
}
