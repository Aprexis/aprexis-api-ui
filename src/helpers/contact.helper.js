import { fieldHelper, valueHelper } from './'

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
  return fieldHelper.getField(contact, 'email', prefix)
}

function fax(contact, prefix) {
  return fieldHelper.getField(contact, 'fax', prefix)
}

function gender(contact, prefix) {
  return valueHelper.capitalizeWords(fieldHelper.getField(contact, 'gender', prefix))
}

function info(contact, prefix) {
  return fieldHelper.getField(contact, 'contact_info', prefix)
}

function mobilePhone(contact, prefix) {
  return fieldHelper.getField(contact, 'mobile_phone', prefix)
}

function name(contact, prefix) {
  return fieldHelper.getField(contact, 'contact_name', prefix)
}

function person(contact, prefix) {
  return fieldHelper.getField(contact, 'contact_person', prefix)
}

function phone(contact, prefix) {
  return fieldHelper.getField(contact, 'phone', prefix)
}

