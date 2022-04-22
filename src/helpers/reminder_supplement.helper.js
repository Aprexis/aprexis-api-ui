import { fieldHelper } from "./field.helper"
import { patientSupplementHelper } from "./patient_supplement.helper"

export const reminderSupplementHelper = {
  buildFromPatientSupplement,
  patientSupplement,
  patientSupplementName,
  patientSupplementPhysicianName,
  patientSupplementPhysicianNpi
}

function buildFromPatientSupplement(patientSupplement) {
  const supplementId = patientSupplementHelper.id(patientSupplement)

  return {
    patient_supplement_id: supplementId,
    patient_supplement: {
      id: supplementId,
      name: patientSupplementHelper.name(patientSupplement),
      physician: {
        first_name: patientSupplementHelper.physicianFirstName(patientSupplement),
        middle_name: patientSupplementHelper.physicianMiddleName(patientSupplement),
        last_name: patientSupplementHelper.physicianLastName(patientSupplement),
        npi: patientSupplementHelper.physicianNpi(patientSupplement)
      }
    }
  }
}

function patientSupplement(reminderSupplement) {
  return fieldHelper.getField(reminderSupplement, "patient_supplement")
}

function patientSupplementName(reminderSupplement) {
  return patientSupplementHelper.name(reminderSupplementHelper.patientSupplement(reminderSupplement))
}

function patientSupplementPhysicianName(reminderSupplement) {
  return patientSupplementHelper.physicianName(reminderSupplementHelper.patientSupplement(reminderSupplement))
}

function patientSupplementPhysicianNpi(reminderSupplement) {
  return patientSupplementHelper.physicianNpi(reminderSupplementHelper.patientSupplement(reminderSupplement))
}
