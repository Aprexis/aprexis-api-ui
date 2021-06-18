import { fieldHelper, patientHelper } from "./"
import { goldStandardAllergyHelper } from "./gold_standard"

export const patientAllergyHelper = {
  allergyName,
  allergyType,
  goldStandardAllergy,
  goldStandardAllergyDescription,
  goldStandardAllergyName,
  patient,
  patientName,
  year
}

function allergyName(patientAllergy) {
  return fieldHelper.getField(patientAllergy, "allergy_name")
}

function allergyType(patientAllergy) {
  return fieldHelper.getField(patientAllergy, "allergy_type")
}

function goldStandardAllergy(patientAllergy) {
  return fieldHelper.getField(patientAllergy, "gold_standard_allergy")
}

function goldStandardAllergyDescription(patientAllergy) {
  return goldStandardAllergyHelper.allergyDescription(patientAllergyHelper.goldStandardAllergy(patientAllergy))
}

function goldStandardAllergyName(patientAllergy) {
  return goldStandardAllergyHelper.allergyName(patientAllergyHelper.goldStandardAllergy(patientAllergy))
}

function patient(patientAllergy) {
  return fieldHelper.getField(patientAllergy, "patient")
}

function patientName(patientAllergy) {
  return patientHelper.name(patientAllergyHelper.patient(patientAllergy))
}

function year(patientAllergy) {
  return fieldHelper.getField(patientAllergy, "year")
}
