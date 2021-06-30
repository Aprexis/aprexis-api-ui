import {
  apiHelper,
  dateHelper,
  fieldHelper,
  modelDatesHelper,
  pathHelper,
  pharmacyStorePatientHelper,
  valueHelper
} from "./"

const patientNoteKeys = [
  "id",
  "note"
]

export const patientNoteHelper = {
  buildChanged,
  buildNewChanged,
  canBeCreated,
  canEdit,
  createdAt,
  displayDateTime,
  note,
  patientName,
  pharmacyStorePatient,
  pharmacyStoreIdentification,
  pharmacyStoreName,
  pharmacyStoreNumber,
  toJSON,
  updatedAt
}

function buildChanged(patientNote, changedPatientNote) {
  if (valueHelper.isValue(changedPatientNote)) {
    return changedPatientNote
  }

  if (valueHelper.isValue(patientNote.id)) {
    return copyIdentifiers(patientNote)
  }

  return patientNoteHelper.buildNewChanged(patientNote)

  function copyIdentifiers(patientNote) {
    return {
      id: patientNote.id,
      pharmacy_store_patient: pharmacyStorePatientHelper.buildChanged(patientNoteHelper.pharmacyStorePatient(patientNote))
    }
  }
}

function buildNewChanged(patientNote) {
  return {
    ...patientNote,
    pharmacy_store_patient: pharmacyStorePatientHelper.buildNewChanged(patientNoteHelper.pharmacyStorePatient(patientNote))
  }
}

function canBeCreated(pathEntries) {
  return pathHelper.isSingular(pathEntries, "patients") && pathHelper.isSingular(pathEntries, "pharmacy-stores")
}

function canEdit(user, patientNote) {
  return false
}

function createdAt(note) {
  return modelDatesHelper.createdAt(note)
}

function displayDateTime(patientNote) {
  const dateTime = updatedAt(patientNote);

  return dateHelper.displayDateTime(dateTime);
}

function note(patientNote) {
  return fieldHelper.getField(patientNote, "note")
}

function patientName(patientNote) {
  return pharmacyStorePatientHelper.patientName(patientNoteHelper.pharmacyStorePatient(patientNote))
}

function pharmacyStorePatient(patientNote) {
  return fieldHelper.getField(patientNote, "pharmacy_store_patient")
}

function pharmacyStoreIdentification(patientNote) {
  return pharmacyStorePatientHelper.pharmacyStoreIdentification(patientNoteHelper.pharmacyStorePatient(patientNote))
}

function pharmacyStoreName(patientNote) {
  return pharmacyStorePatientHelper.pharmacyStoreName(patientNoteHelper.pharmacyStorePatient(patientNote))
}

function pharmacyStoreNumber(patientNote) {
  return pharmacyStorePatientHelper.pharmacyStoreNumber(patientNoteHelper.pharmacyStorePatient(patientNote))
}

function toJSON(patientNote) {
  const json = apiHelper.toJSON(patientNote, patientNoteKeys)
  const pharmacyStorePatient = patientNoteHelper.pharmacyStorePatient(patientNote)

  if (valueHelper.isValue(pharmacyStorePatient)) {
    json.pharmacy_store_patient_attributes = pharmacyStorePatientHelper.toJSON(pharmacyStorePatient)
  }

  return json
}

function updatedAt(note) {
  return modelDatesHelper.updatedAt(note)
}
