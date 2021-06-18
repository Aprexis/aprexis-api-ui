import { fieldHelper } from "../"

export const goldStandardAllergyHelper = {
  allergyDescription,
  allergyName
}

function allergyDescription(goldStandardAllergy) {
  return fieldHelper.getField(goldStandardAllergy, "allergy_description")
}

function allergyName(goldStandardAllergy) {
  return fieldHelper.getField(goldStandardAllergy, "allergy_name")
}
