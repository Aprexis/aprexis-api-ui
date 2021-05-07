import { dateHelper, fieldHelper, pharmacyStoreHelper } from "./"

export const patientNoteHelper = {
  displayDateTime,
  note,
  pharmacyStoreIdentification,
  pharmacyStoreName,
  pharmacyStoreNumber,
  updatedAt
}

function displayDateTime(patientNote) {
  const dateTime = updatedAt(patientNote);

  return dateHelper.displayDateTime(dateTime);
}

function note(patientNote) {
  return fieldHelper.getField(patientNote, "note")
}

function pharmacyStoreIdentification(patientNote) {
  return pharmacyStoreHelper.identification(fieldHelper.getField(patientNote, "pharmacy_store"))
}

function pharmacyStoreName(patientNote) {
  return pharmacyStoreHelper.name(fieldHelper.getField(patientNote, "pharmacy_store"))
}

function pharmacyStoreNumber(patientNote) {
  return pharmacyStoreHelper.storeNumber(fieldHelper.getField(patientNote, "pharmacy_store"))
}

function updatedAt(patientNote) {
  return fieldHelper.getField(patientNote, "updated_at")
}
