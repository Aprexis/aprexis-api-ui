import { fieldHelper, interventionHelper, pharmacyStoreHelper } from "./"
import { valueHelper } from "./value.helper"

export const appointmentHelper = {
  allDay,
  endDate,
  intervention,
  patientName,
  pharmacyStore,
  pharmacyStoreIdentification,
  scheduledAt,
  scheduledUntil,
  startDate,
  text,
  title,
  venue
}

function allDay(appointment) {
  return fieldHelper.getField(appointment, "all_day")
}

function endDate(appointment) {
  if (valueHelper.isSet(appointmentHelper.allDay(appointment))) {
    return
  }

  return appointmentHelper.scheduledUntil(appointment)
}

function intervention(appointment) {
  return fieldHelper.getField(appointment, "intervention")
}

function patientName(appointment, prefix = "", allowBlank = false) {
  return interventionHelper.patientName(appointmentHelper.intervention(appointment), prefix, allowBlank)
}

function pharmacyStore(appointment) {
  return fieldHelper.getField(appointment, "pharmacy_store")
}

function pharmacyStoreIdentification(appointment) {
  return pharmacyStoreHelper.identification(appointmentHelper.pharmacyStore(appointment))
}

function scheduledAt(appointment) {
  return fieldHelper.getField(appointment, "scheduled_at")
}

function scheduledUntil(appointment) {
  return fieldHelper.getField(appointment, "scheduled_until")
}

function startDate(appointment) {
  return appointmentHelper.scheduledAt(appointment)
}

function text(appointment) {
  const title = appointmentHelper.title(appointment)
  const patientName = appointmentHelper.patientName(appointment, "", true)
  const pharmacyStoreIdentification = appointmentHelper.pharmacyStoreIdentification(appointment)
  const venue = appointmentHelper.venue(appointment)
  let text = title

  if (valueHelper.isStringValue(patientName)) {
    text = `${text} with ${patientName}`
  }

  switch (venue) {
    case 'In Person':
      text = `${text} at ${pharmacyStoreIdentification}`
      break

    default:
      text = `${text} by telephone`
  }

  return text
}

function title(appointment) {
  return fieldHelper.getField(appointment, "title")
}

function venue(appointment) {
  return fieldHelper.getField(appointment, "venue")
}
