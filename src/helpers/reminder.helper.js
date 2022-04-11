import { formatInTimeZone } from "date-fns-tz"
import { dateHelper } from "./date.helper"
import { fieldHelper } from './field.helper'
import { medicationHelper } from "./medication.helper"
import { patientHelper } from "./patient.helper"
import { patientSupplementHelper } from "./patient_supplement.helper"
import { valueHelper } from "./value.helper"
import { reminderActions, reminderTypes, timeZones } from "../types"

export const reminderHelper = {
  action,
  canDelete,
  canEdit,
  dayOfMonth,
  displayAction,
  displayMedications,
  displayPatientSupplements,
  displayRecurFrom,
  displayRecurTo,
  displayRemindAt,
  displayType,
  emailAddress,
  friday,
  medications,
  modelName,
  monday,
  patient,
  patientName,
  patientSupplements,
  recurFrom,
  recurTo,
  remindAt,
  remindAtTimeZone,
  saturday,
  sunday,
  thursday,
  tuesday,
  txtNumber,
  type,
  voiceNumber,
  wednesday
}

function action(reminder) {
  return fieldHelper.getField(reminder, "action")
}

function canDelete(user, reminder) {
  return false
}

function canEdit(user, reminder) {
  return false
}

function dayOfMonth(reminder) {
  return fieldHelper.getField(reminder, "day_of_month")
}

function displayAction(reminder) {
  const action = reminderHelper.action(reminder)
  if (!valueHelper.isStringValue(action)) {
    return ""
  }

  return reminderActions[action]
}

function displayMedications(reminder) {
  const medications = reminderHelper.medications(reminder)

  return medications.map((medication) => medicationHelper.name(medication)).join(", ")
}

function displayPatientSupplements(reminder) {
  const patientSupplements = reminderHelper.patientSupplements(reminder)

  return patientSupplements.map((patientSupplement) => { return patientSupplementHelper.name(patientSupplement) }).join(", ")
}

function displayRecurFrom(reminder) {
  return dateHelper.displayDate(reminderHelper.recurFrom(reminder))
}

function displayRecurTo(reminder) {
  return dateHelper.displayDate(reminderHelper.recurTo(reminder))
}

function displayRemindAt(reminder) {
  const remindAt = reminderHelper.remindAt(reminder)
  let remindAtTimeZone = reminderHelper.remindAtTimeZone(reminder)
  if (valueHelper.isStringValue(timeZones[remindAtTimeZone])) {
    remindAtTimeZone = timeZones[remindAtTimeZone]
  }

  console.log(`As ${typeof remindAt} ${remindAt}`)
  console.log(`As date: ${dateHelper.makeDate(remindAt)}`)
  console.log(`Time zone: ${remindAtTimeZone}`)
  console.log(`Format: ${formatInTimeZone(dateHelper.makeDate(remindAt), remindAtTimeZone)}`)

  return formatInTimeZone(dateHelper.makeDate(remindAt), remindAtTimeZone, "p")
}

function displayType(reminder) {
  const type = reminderHelper.type(reminder)

  return reminderTypes[type]
}

function emailAddress(reminder) {
  return fieldHelper.getField(reminder, "email_address")
}

function friday(reminder) {
  return fieldHelper.getField(reminder, "friday")
}

function medications(reminder) {
  return fieldHelper.getField(reminder, "medications")
}

function modelName() {
  return "reminder"
}

function monday(reminder) {
  return fieldHelper.getField(reminder, "monday")
}

function patient(reminder) {
  return fieldHelper.getField(reminder, "patient")
}

function patientName(reminder) {
  return patientHelper.name(reminderHelper.patient(reminder))
}

function patientSupplements(reminder) {
  return fieldHelper.getField(reminder, "patient_supplements")
}

function recurFrom(reminder) {
  return fieldHelper.getField(reminder, "recur_from")
}

function recurTo(reminder) {
  return fieldHelper.getField(reminder, "recur_to")
}

function remindAt(reminder) {
  return fieldHelper.getField(reminder, "remind_at")
}

function remindAtTimeZone(reminder) {
  return fieldHelper.getField(reminder, "remind_at_time_zone")
}

function saturday(reminder) {
  return fieldHelper.getField(reminder, "saturday")
}

function sunday(reminder) {
  return fieldHelper.getField(reminder, "sunday")
}

function thursday(reminder) {
  return fieldHelper.getField(reminder, "thursday")
}

function tuesday(reminder) {
  return fieldHelper.getField(reminder, "tuesday")
}

function txtNumber(reminder) {
  return fieldHelper.getField(reminder, "txt_number")
}

function type(reminder) {
  return fieldHelper.getField(reminder, "type")
}

function voiceNumber(reminder) {
  return fieldHelper.getField(reminder, "voice_number")
}

function wednesday(reminder) {
  return fieldHelper.getField(reminder, "wednesday")
}
