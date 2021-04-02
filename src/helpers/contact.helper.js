import { valueHelper } from './'

export const contactHelper = {
  email,
  fax,
  info,
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

function info(contact, prefix) {
  return valueHelper.getField(contact, 'contact_info', prefix)
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

