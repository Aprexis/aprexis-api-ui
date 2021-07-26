import dateFnsFormat from "date-fns/format"
import dateFnsParse from "date-fns/parse"
import moment from "moment"
import { valueHelper } from "./"
import { PERIODS } from "../types"

export const dateHelper = {
  computeToDate,
  convertDateStringToDate,
  convertDateToDateString,
  convertDateToTimeString,
  convertTimeStringToDate,
  displayDate,
  displayDateTime,
  formatDate,
  isDateValue,
  isValidDate,
  makeDate,
  parseDate
}

function localeFromLocaleString(localeString) {
  switch (typeof localeString) {
    case "string":
      return require(`date-fns/locale/${localeString}`)

    default:
      return localeString
  }
}

function computeToDate(fromDate, durationString) {
  const period = PERIODS[durationString.toLowerCase()]
  if (!valueHelper.isValue(period)) {
    throw new RangeError(`Unrecognized duration string ${durationString}`)
  }

  const toDate = new Date(fromDate.getTime())
  if (valueHelper.isValue(period.years)) {
    toDate.setFullYear(toDate.getFullYear() + period.years)
  }
  if (valueHelper.isValue(period.months)) {
    toDate.setMonth(toDate.getMonth() + period.months)
  }
  if (valueHelper.isValue(period.days)) {
    toDate.setDate(toDate.getDate() + period.days)
  }

  return toDate
}

function convertDateStringToDate(dateString, format, localeString) {
  return dateHelper.parseDate(dateString, format, localeString)
}

function convertDateToDateString(date, format, localeString) {
  if (dateHelper.isValidDate(date, false)) {
    return dateHelper.formatDate(dateHelper.makeDate(date), format, localeString)
  }

  if (!valueHelper.isValue(date)) {
    return ""
  }

  return `${date}`
}

function convertDateToTimeString(date, format, localeString) {
  if (!dateHelper.isValidDate(date)) {
    return "00:00"
  }

  return dateHelper.formatDate(dateHelper.makeDate(date), format, localeString)
}

function convertTimeStringToDate(timeString, format, localeString) {
  return dateHelper.parseDate(timeString, format, localeString)
}

function displayDate(dateValue) {
  if (!valueHelper.isValue(dateValue)) {
    return ""
  }

  return dateHelper.formatDate(dateHelper.makeDate(dateValue), "P", navigator.languages[0])
}

function displayDateTime(dateTime) {
  if (!valueHelper.isValue(dateTime)) {
    return ""
  }

  return dateHelper.formatDate(dateHelper.makeDate(dateTime), "Ppp", navigator.languages[0])
}

function formatDate(date, format, localeString) {
  if (!valueHelper.isValue(date)) {
    return
  }

  return dateFnsFormat(date, format, { locale: localeFromLocaleString(localeString) })
}

function isDateValue(value) {
  const date = dateHelper.makeDate(value)

  return valueHelper.isValue(date)
}

function isValidDate(date, allowBlank = false) {
  if (!valueHelper.isValue(date)) {
    return valueHelper.isSet(allowBlank)
  }

  if (typeof date === "string") {
    if (!valueHelper.isStringValue(date)) {
      return valueHelper.isSet(allowBlank)
    }
  }

  return dateHelper.isDateValue(date)
}

function makeDate(value) {
  if (!valueHelper.isValue(value)) {
    return
  }

  if (typeof value === "object") {
    if (valueHelper.isFunction(value.getMonth)) {
      return value
    }

    return
  }

  if (!valueHelper.isStringValue(value)) {
    return
  }

  const dateMoment = moment(value)
  if (!dateMoment.isValid()) {
    return
  }

  if (value.length === 10) {
    return dateHelper.parseDate(value, "yyyy-MM-dd")
  }

  return dateMoment.toDate()
}

function parseDate(dateTimeString, format, localeString) {
  return dateFnsParse(dateTimeString, format, new Date(), { locale: localeFromLocaleString(localeString) })
}
