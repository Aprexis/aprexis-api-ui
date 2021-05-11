import { apiHelper, fieldHelper, patientHelper, pharmacyStoreHelper, valueHelper } from "./"

const pharmacyStorePatientKeys = [
  "id",
  "patient_id",
  "pharmacy_store_id"
]

export const pharmacyStorePatientHelper = {
  buildChanged,
  buildNewChanged,
  patient,
  patientName,
  pharmacyStore,
  pharmacyStoreIdentification,
  pharmacyStoreName,
  pharmacyStoreNumber,
  toJSON
}

function buildChanged(pharmacyStorePatient, changedPharmacyStorePatient) {
  if (valueHelper.isValue(changedPharmacyStorePatient)) {
    return changedPharmacyStorePatient
  }

  return pharmacyStorePatientHelper.buildNewChanged(pharmacyStorePatient)
}

function buildNewChanged(pharmacyStorePatient) {
  return {
    id: pharmacyStorePatient.id,
    patient_id: pharmacyStorePatient.patient_id,
    pharmacy_store_id: pharmacyStorePatient.pharmacy_store_id
  }
}

function patient(pharmacyStorePatient) {
  return fieldHelper.getField(pharmacyStorePatient, "patient")
}

function patientName(pharmacyStorePatient) {
  return patientHelper.name(pharmacyStorePatientHelper.patient(pharmacyStorePatient))
}

function pharmacyStore(pharmacyStorePatient) {
  return fieldHelper.getField(pharmacyStorePatient, "pharmacy_store")
}

function pharmacyStoreIdentification(pharmacyStorePatient) {
  return pharmacyStoreHelper.identification(pharmacyStorePatientHelper.pharmacyStore(pharmacyStorePatient))
}

function pharmacyStoreName(pharmacyStorePatient) {
  return pharmacyStoreHelper.name(pharmacyStorePatientHelper.pharmacyStore(pharmacyStorePatient))
}

function pharmacyStoreNumber(pharmacyStorePatient) {
  return pharmacyStoreHelper.storeNumber(pharmacyStorePatientHelper.pharmacyStore(pharmacyStorePatient))
}

function toJSON(pharmacyStorePatient) {
  return apiHelper.toJSON(pharmacyStorePatient, pharmacyStorePatientKeys)
}
