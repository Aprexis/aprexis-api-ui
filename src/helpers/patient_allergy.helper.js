import { fieldHelper } from "./"

export const patientAllergyHelper = {
  allergyName,
  allergyType,
  year
}

function allergyName(patientAllergy) {
  return fieldHelper.getField(patientAllergy, "allergy_name")
}

function allergyType(patientAllergy) {
  return fieldHelper.getField(patientAllergy, "allergy_type")
}

function year(patientAllergy) {
  return fieldHelper.getField(patientAllergy, "year")
}
