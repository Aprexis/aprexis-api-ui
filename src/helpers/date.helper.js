import moment from 'moment'
import { valueHelper } from './'

export const dateHelper = {
  isDateValue,
  isValidDate,
  makeDate
}

function isDateValue(value) {
  const date = makeDate(value)

  return valueHelper.isValue(date)
}

function isValidDate(date, allowBlank = false) {
  if (!valueHelper.isValue(date)) {
    return valueHelper.isSet(allowBlank)
  }

  return dateHelper.isDateValue(date)
}

function makeDate(value) {
  if (typeof value === 'object') {
    if (valueHelper.isFunction(value.getMonth)) {
      return value
    }

    return
  }

  if (!valueHelper.isStringValue(value)) {
    return
  }

  const dateValue = Date.parse(value)
  if (!isNaN(dateValue)) {
    return new Date(dateValue)
  }

  const dateMoment = moment(value)
  if (!dateMoment.isValid()) {
    return
  }

  return dateMoment.toDate()
}
