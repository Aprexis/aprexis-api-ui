import { formatInTimeZone } from 'date-fns-tz'
import { dateHelper } from "./date.helper"
import { fieldHelper } from './field.helper'
import { patientHelper } from "./patient.helper"
import { valueHelper } from './value.helper'

const actions = {
  refill: 'Refill Medication',
  take: 'Take Medication'
}

const timeZones = {
  'Eastern (US & Canada)': 'America/New_York'
}

export const reminderHelper = {
  action,
  canDelete,
  canEdit,
  displayAction,
  displayRecurFrom,
  displayRecurTo,
  displayRemindAt,
  modelName,
  patient,
  patientName,
  recurFrom,
  recurTo,
  remindAt,
  remindAtTimeZone
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

function displayAction(reminder) {
  const action = reminderHelper.action(reminder)
  if (!valueHelper.isStringValue(action)) {
    return ""
  }

  return actions[action]
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

  console.log(`Remind at: ${remindAt} ${remindAtTimeZone}`)

  return formatInTimeZone(dateHelper.makeDate(remindAt), remindAtTimeZone, "p")
}

function modelName() {
  return "reminder"
}

function patient(reminder) {
  return fieldHelper.getField(reminder, "patient")
}

function patientName(reminder) {
  return patientHelper.name(reminderHelper.patient(reminder))
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
