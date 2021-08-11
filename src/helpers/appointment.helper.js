import { valueHelper } from "./value.helper"
import { dateHelper } from "./date.helper"
import { fieldHelper } from "./field.helper"
import { apiHelper } from "./api.helper"
import { interventionHelper } from "./intervention.helper"
import { pharmacyStoreHelper } from "./pharmacy_store.helper"
import { userHelper } from "./user.helper"

export const appointmentHelper = {
  allDay,
  buildChanged,
  buildNewChanged,
  canBeCreated,
  canModifyField,
  changePharmacyStore,
  endDate,
  eventEnds,
  eventLabel,
  findAllDayEvent,
  findScheduledEvent,
  id,
  intervention,
  patientName,
  pharmacyStore,
  pharmacyStoreId,
  pharmacyStoreIdentification,
  scheduledAt,
  scheduledUntil,
  startDate,
  text,
  title,
  toJSON,
  venue
}

const appointmentKeys = [
  "id",
  "intervention_id",
  "pharmacy_store_id",
  "user_id",
  "all_day",
  "scheduled_at",
  "scheduled_until",
  "title",
  "venue"
]

function allDay(appointment) {
  return fieldHelper.getField(appointment, "all_day")
}

function buildChanged(appointment, changedAppointment) {
  if (valueHelper.isValue(changedAppointment)) {
    return changedAppointment
  }

  if (valueHelper.isValue(appointment.id)) {
    return copyIdentifiers(appointment)
  }

  return appointmentHelper.buildNewChanged(appointment)

  function copyIdentifiers(appointment) {
    return {
      id: appointment.id,
      intervention_id: appointment.intervention_id,
      pharmacy_store_id: appointment.pharmacy_store_id,
      user_id: appointment.user_id
    }
  }
}

function buildNewChanged(appointment) {
  return {
    ...appointment
  }
}

function canBeCreated(currentUser, user) {
  if (!userHelper.hasRole(
    user,
    ["pharmacy_store_admin", "pharmacy_store_tech", "pharmacy_store_user"].includes(userHelper.role(user))
  )) {
    return false
  }

  if (!userHelper.canCreateAppointment(currentUser)) {
    return false
  }

  return userHelper.hasRole(user, "aprexis_admin") || userHelper.id(currentUser) === userHelper.id(user)
}

function canModifyField(appointment, fieldName) {
  return fieldName != "user_id"
}

function changePharmacyStore(appointment, changedAppointment, pharmacyStore) {
  const myChangedAppointment = this.buildChanged(appointment, changedAppointment)

  return {
    appointment: {
      ...appointment,
      pharmacy_store_id: pharmacyStore.id,
      pharmacyStore
    },
    changedAppointment: {
      ...myChangedAppointment,
      pharmacy_store_id: pharmacyStore.id,
      pharmacyStore
    }
  }
}

function endDate(appointment) {
  const scheduledUntil = dateHelper.makeDate(appointmentHelper.scheduledUntil(appointment))

  if (valueHelper.isValue(scheduledUntil)) {
    return new Date(scheduledUntil.getFullYear(), scheduledUntil.getMonth(), scheduledUntil.getDate())
  }

  return appointmentHelper.startDate(appointment)
}

function eventEnds(appointment, hour, minute, minutes) {
  if (!valueHelper.isValue(appointment) || valueHelper.isSet(appointmentHelper.allDay(appointment))) {
    return false
  }

  const scheduledUntil = dateHelper.makeDate(appointmentHelper.scheduledUntil(appointment))
  if (scheduledUntil.getHours() > hour) {
    return false
  }

  const scheduledMinute = scheduledUntil.getMinutes()
  if (scheduledMinute < minute) {
    return false
  }

  return scheduledMinute < minute + minutes
}

function eventLabel(appointment) {
  const title = appointmentHelper.title(appointment)
  const venue = appointmentHelper.venue(appointment)

  if (!valueHelper.isStringValue(venue)) {
    return title
  }

  return `${title} (${venue})`
}

function findAllDayEvent(appointments, date) {
  if (!valueHelper.isValue(appointments)) {
    return
  }

  return appointments.find((appointment) => checkAppointmentDate(appointment, date))

  function checkAppointmentDate(appointment, date) {
    const startDate = appointmentHelper.startDate(appointment)
    const endDate = appointmentHelper.endDate(appointment)

    return (+startDate <= +date) && (+endDate >= +date)
  }
}

function findScheduledEvent(appointments, currentDate, hour, minute, minutes) {
  if (!valueHelper.isValue(appointments)) {
    return
  }

  const periodStart = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate(),
    hour,
    minute
  )
  const periodEnd = new Date(
    periodStart.getFullYear(),
    periodStart.getMonth(),
    periodStart.getDate(),
    periodStart.getHours(),
    periodStart.getMinutes() + minutes
  )

  return appointments.find((appointment) => checkAppointmentDate(appointment, periodStart, periodEnd))

  function checkAllDayAppointment(appointment, periodStart, periodEnd) {
    const dayStart = new Date(periodStart.getFullYear(), periodStart.getMonth(), periodStart.getDate())
    const dayEnd = new Date(periodEnd.getFullYear(), periodEnd.getMonth(), periodEnd.getDate())
    const appointmentStart = appointmentHelper.startDate(appointment)
    const appointmentEnd = appointmentHelper.endDate(appointment)

    return !((+appointmentEnd < +dayStart) || (+appointmentStart > +dayEnd))
  }

  function checkAppointmentDate(appointment, periodStart, periodEnd) {
    if (valueHelper.isSet(appointmentHelper.allDay(appointment))) {
      return checkAllDayAppointment(appointment, periodStart, periodEnd)
    }

    const scheduledAt = dateHelper.makeDate(appointmentHelper.scheduledAt(appointment))
    const scheduledUntil = dateHelper.makeDate(appointmentHelper.scheduledUntil(appointment))
    return !((+scheduledUntil < +periodStart) || (+scheduledAt > +periodEnd))
  }
}

function id(appointment) {
  return fieldHelper.getField(appointment, "id")
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

function pharmacyStoreId(appointment) {
  let pharmacyStoreId = fieldHelper.getField("pharmacy_store_id", appointment)
  if (!valueHelper.isValue(pharmacyStoreId)) {
    pharmacyStoreId = pharmacyStoreHelper.id(appointmentHelper.pharmacyStore(appointment))
  }

  return pharmacyStoreId
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
  const scheduledAt = dateHelper.makeDate(appointmentHelper.scheduledAt(appointment))
  if (!valueHelper.isValue(scheduledAt)) {
    return
  }

  return new Date(scheduledAt.getFullYear(), scheduledAt.getMonth(), scheduledAt.getDate())
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

function toJSON(appointment) {
  return apiHelper.toJSON(appointment, appointmentKeys)
}

function venue(appointment) {
  return fieldHelper.getField(appointment, "venue")
}
