import { fieldHelper } from "./field.helper"
import { patientSupplementHelper } from "./patient_supplement.helper"

export const reminderSupplementHelper = {
  patientSupplement,
  patientSupplementName
}

function patientSupplement(reminderSupplement) {
  return fieldHelper.getField(reminderSupplement, "patient_supplement")
}

function patientSupplementName(reminderSupplement) {
  return patientSupplementHelper.name(reminderSupplementHelper.patientSupplement(reminderSupplement))
}
