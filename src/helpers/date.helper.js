import moment from 'moment'
import { valueHelper } from './'

export const dateHelper = {
  isDateValue,
  makeDate
}

function isDateValue(value) {
  const date = makeDate(value)

  return valueHelper.isValue(date)
}

function makeDate(value) {
  const dateMoment = moment(value)
  if (!dateMoment.isValid()) {
    return
  }

  return dateMoment.toDate()
}
