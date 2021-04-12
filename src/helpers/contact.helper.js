import { valueHelper } from './'

export const contactHelper = {
  email,
  fax,
  gender,
  info,
  mobilePhone,
  name,
  person,
  phone
}

function email(contact, prefix) {
  return valueHelper.getField(contact, 'email', prefix)
}

function fax(contact, prefix) {
  return valueHelper.getField(contact, 'fax', prefix)
}

function gender(contact, prefix) {
  return valueHelper.capitalizeWords(valueHelper.getField(contact, 'gender', prefix))
}

function info(contact, prefix) {
  return valueHelper.getField(contact, 'contact_info', prefix)
}

function mobilePhone(contact, prefix) {
  return valueHelper.getField(contact, 'mobile_phone', prefix)
}

function name(contact, prefix) {
  return valueHelper.getField(contact, 'contact_name', prefix)
}

function person(contact, prefix) {
  return valueHelper.getField(contact, 'contact_person', prefix)
}

function phone(contact, prefix) {
  return valueHelper.getField(contact, 'phone', prefix)
}

