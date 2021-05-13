import {
  apiHelper,
  fieldHelper,
  medicationHelper,
  pathHelper,
  patientHelper,
  pharmacyStoreHelper,
  physicianHelper,
  valueHelper
} from "./"

export const patientMedicationHelper = {
  canBeCreated,
  daysSupply,
  displayStrength,
  displayType,
  filledAt,
  medicationLabel,
  patientName,
  pharmacyStoreName,
  physicianName,
  strength,
  strengthUnits,
  toJSON,
  type
}

const patientMedicationKeys = [
  "id",
  "days_supply",
  "directions",
  "medication_id",
  "patient_id",
  "pharmacy_store_id",
  "filled_at",
  "start_date",
  "strength",
  "strength_units",
  "type"
]

function canBeCreated(pathEntries) {
  return pathHelper.isSingular(pathEntries, "patients")
}

function daysSupply(patientMedication) {
  return fieldHelper.getField(patientMedication, "days_supply")
}

function displayStrength(patientMedication) {
  const strength = patientMedicationHelper.strength(patientMedication)
  const strengthUnits = patientMedicationHelper.strengthUnits(patientMedication)
  if (!valueHelper.isValue(strength)) {
    return strengthUnits
  }
  if (!valueHelper.isValue(strengthUnits)) {
    return strength
  }

  const strengthParts = strength.split(",")
  const strengthUnitsParts = strengthUnits.split(",")
  return strengthParts.map(
    (strengthPart, idx) => {
      const strengthUnitPart = idx < strengthUnitsParts.length ? strengthUnitsParts[idx] : ""
      return `${strengthPart} ${strengthUnitPart}`
    }
  ).join(", ")
}

function displayType(patientMedication) {
  const type = patientMedicationHelper.type(patientMedication)
  if (!valueHelper.isValue(type)) {
    return
  }

  switch (type) {
    case 'PatientOtcMedication':
      return "Over-the-Counter"

    case 'PatientPrescriptionMedication':
      return "Prescription"

    default:
      return type
  }
}

function filledAt(patientMedication) {
  return fieldHelper.getField(patientMedication, "filled_at")
}

function medicationLabel(patientMedication) {
  return medicationHelper.label(fieldHelper.getField(patientMedication, "medication"))
}

function patientName(patientMedication, prefix = "") {
  return patientHelper.name(fieldHelper.getField(patientMedication, "patient"), prefix)
}

function pharmacyStoreName(patientMedication) {
  return pharmacyStoreHelper.name(patientMedication)
}

function physicianName(patientMedication) {
  return physicianHelper.name(fieldHelper.getField(patientMedication, "physician"))
}

function strength(patientMedication) {
  return fieldHelper.getField(patientMedication, "strength")
}

function strengthUnits(patientMedication) {
  return fieldHelper.getField(patientMedication, "strengthUnits")
}


function toJSON(patientMedication) {
  return apiHelper.toJSON(patientMedication, patientMedicationKeys)
}

function type(patientMedication) {
  return fieldHelper.getField(patientMedication, "type")
}
