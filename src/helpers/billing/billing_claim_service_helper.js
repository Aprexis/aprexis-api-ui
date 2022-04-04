import { dateHelper, fieldHelper } from '..'

export const billingClaimServiceHelper = {
  dateOfServiceStart,
  displayDateOfServiceStart
}

function dateOfServiceStart(service) {
  return fieldHelper.getField(service, "date_of_service_start")
}

function displayDateOfServiceStart(service) {
  return dateHelper.displayDate(billingClaimServiceHelper.dateOfServiceStart(service))
}
