import { valueHelper } from './'

export const addressHelper = {
  address,
  city,
  country,
  state,
  zipCode
}

function address(address, prefix) {
  return valueHelper.getField(address, 'address', prefix)
}

function city(address, prefix) {
  return valueHelper.getField(address, 'city', prefix)
}

function country(address, prefix) {
  return valueHelper.getField(address, 'country', prefix)
}

function state(address, prefix) {
  return valueHelper.getField(address, 'state', prefix)
}

function zipCode(address, prefix) {
  return valueHelper.getField(address, 'zip_code', prefix)
}
