import { fieldHelper, valueHelper } from './'

export const addressHelper = {
  address,
  city,
  country,
  fullAddress,
  state,
  zipCode
}

function address(address, prefix) {
  return fieldHelper.getField(address, 'address', prefix)
}

function city(address, prefix) {
  return fieldHelper.getField(address, 'city', prefix)
}

function country(address, prefix) {
  return fieldHelper.getField(address, 'country', prefix)
}

function fullAddress(address, prefix) {
  const addressLine = addressHelper.address(address, prefix)
  const city = addressHelper.city(address, prefix)
  const state = addressHelper.state(address, prefix)
  const zipCode = addressHelper.zipCode(address, prefix)
  const country = addressHelper.country(address, prefix)
  let result = ""
  let resultPrefix = ""

  if (valueHelper.isStringValue(addressLine) && addressLine != "N/A" && addressLine != "NA") {
    result = addressLine
    resultPrefix = ", "
  }

  if (valueHelper.isStringValue(city)) {
    result = `${result}${resultPrefix}${city}`
    resultPrefix = ", "
  }

  result = `${result}${resultPrefix}${state} ${zipCode}`

  if (valueHelper.isStringValue(country) && country != "US" && country != "USA") {
    result = `${result}, ${country}`
  }

  return result
}

function state(address, prefix) {
  return fieldHelper.getField(address, 'state', prefix)
}

function zipCode(address, prefix) {
  return fieldHelper.getField(address, 'zip_code', prefix)
}
