import { valueHelper } from "./value.helper"
import { fieldHelper } from "./field.helper"
import { addressHelper } from "./address.helper"
import { apiHelper } from "./api.helper"
import { contactHelper } from "./contact.helper"
import { healthPlanHelper } from "./health_plan.helper"
import { nameHelper } from "./name.helper"
import { pathHelper } from "./path.helper"
import { userHelper } from "./user.helper"
import { contactMethods } from "../types"

export const patientHelper = {
  buildChanged,
  buildNewChanged,
  canBeCreated,
  canDelete,
  canEdit,
  canModifyField,
  cognitiveImpairmentDetermined,
  cognitivelyImpaired,
  coverageEffectiveDate,
  coverageEndDate,
  dateOfBirth,
  displayPreferredContactMethod,
  firstName,
  fullAddress,
  gender,
  hasSubscriber,
  hasUser,
  healthPlan,
  healthPlanName,
  id,
  lastName,
  latitude,
  longitude,
  memberNumber,
  middleName,
  modelName,
  name,
  noKnownAllergies,
  medicationCount,
  personNumber,
  phone,
  preferredContactMethod,
  primaryCareProviderNpi,
  race,
  subscriberName,
  toBreadcrumb,
  toJSON
}

const addressKeys = addressHelper.keys()
const contactKeys = contactHelper.keys()

const patientKeys = [
  "id",
  "health_plan_id",
  ...addressKeys,
  ...contactKeys,
  "age",
  "cognitive_impairment_determined",
  "cognitively_impaired",
  "coverage_effective_date",
  "coverage_end_date",
  "date_of_birth",
  "first_name",
  "gender",
  "health_plan_patient_pharmacy_claim_identifier",
  "last_name",
  "latitude",
  "longitude",
  "medication_count",
  "member_number",
  "middle_name",
  "no_known_allergies",
  "person_number",
  "preferred_contact_method",
  "primary_care_provider_npi",
  "race",
  "resides_in_nursing_home",
  "status",
  "subscriber_date_of_birth",
  "subscriber_gender",
  "subscriber_name",
  ...addressHelper.keys("subscriber"),
  ...addressHelper.keys("user"),
  "user_phone"
]

function buildChanged(patient, changedPatient) {
  if (valueHelper.isValue(changedPatient)) {
    return changedPatient
  }

  if (valueHelper.isValue(patient.id)) {
    return copyIdentifiers(patient)
  }

  return patientHelper.buildNewChanged(patient)

  function copyIdentifiers(patient) {
    return {
      id: patient.id,
      health_plan_id: patient.health_plan_id
    }
  }
}

function buildNewChanged(patient) {
  return {
    ...patient
  }
}

function canBeCreated(user, pathEntries, context) {
  if (!userHelper.canCreatePatient(user, pathEntries)) {
    return false
  }

  if (!pathHelper.isSingular(pathEntries, "health-plans")) {
    return false
  }

  const healthPlan = context['health-plans']
  return valueHelper.isSet(healthPlanHelper.allowManuallyAddedPatients(healthPlan))
}

function canDelete(user, patient) {
  return false
}

function canEdit(user, patient, healthPlan, pharmacyStores) {
  switch (userHelper.role(user)) {
    case 'aprexis_admin':
      return true

    case 'health_plan_admin':
    case 'health_plan_user':
      return healthPlanCanEdit(user, patient)

    case 'pharmacy_store_admin':
    case 'pharmacy_store_tech':
    case 'pharmacy_store_user':
      return pharmacyStoreCanEdit(user, patient, healthPlan, pharmacyStores)

    default:
      return false
  }

  function healthPlanCanEdit(user, patient) {
    return userHelper.forHealthPlan(user, patientHelper.healthPlanId(patient))
  }

  function pharmacyStoreCanEdit(user, patient, healthPlan, pharmacyStores) {
    if (!valueHelper.isValue(healthPlan)) {
      return false
    }

    if (healthPlanHelper.isSegmented(healthPlan)) {
      return canEditForSegmentedHealthPlan(user, pharmacyStores)
    }

    return canEditForStandardHealthPlan(user, patient)
  }

  function canEditForSegmentedHealthPlan(user, pharmacyStores) {
    if (!valueHelper.isValue(pharmacyStores)) {
      return false
    }

    return userHelper.forAnyPharmacyStore(user, pharmacyStores)
  }

  function canEditForStandardHealthPlan(user, patient) {
    return userHelper.forHealthPlan(user, patientHelper.healthPlanId(patient))
  }
}

function canModifyField(patient, fieldName) {
  return true
}

function cognitiveImpairmentDetermined(patient) {
  return fieldHelper.getField(patient, "cognitive_impairment_determined")
}

function cognitivelyImpaired(patient) {
  return fieldHelper.getField(patient, "cognitively_impaired")
}

function coverageEffectiveDate(patient) {
  return fieldHelper.getField(patient, "coverage_effective_date")
}

function coverageEndDate(patient) {
  return fieldHelper.getField(patient, "coverage_end_date")
}

function dateOfBirth(patient, prefix = "") {
  return fieldHelper.getField(patient, "date_of_birth", prefix)
}

function displayPreferredContactMethod(patient) {
  const preferredContactMethod = patientHelper.preferredContactMethod(patient)
  if (!valueHelper.isStringValue(preferredContactMethod)) {
    return ""
  }

  const contactMethod = contactMethods.find((checkMethod) => checkMethod.value == preferredContactMethod)
  if (!valueHelper.isValue(contactMethod)) {
    return preferredContactMethod
  }

  return contactMethod.label
}

function firstName(patient, prefix = "") {
  return nameHelper.firstName(patient, prefix)
}

function fullAddress(patient) {
  return addressHelper.fullAddress(patient)
}

function gender(patient, prefix = "") {
  if (!valueHelper.isValue(patient)) {
    return ""
  }

  return fieldHelper.getField(patient, "gender", prefix)
}

function hasSubscriber(patient) {
  return valueHelper.isStringValue(addressHelper.address(patient, "subscriber")) ||
    valueHelper.isStringValue(addressHelper.city(patient, "subscriber")) ||
    valueHelper.isStringValue(patientHelper.gender(patient, "subscriber")) ||
    valueHelper.isStringValue(contactHelper.name(patient, "subscriber")) ||
    valueHelper.isStringValue(addressHelper.state(patient, "subscriber")) ||
    valueHelper.isStringValue(addressHelper.zipCode(patient, "subscriber"))
}

function hasUser(patient) {
  return valueHelper.isStringValue(addressHelper.address(patient, "user")) ||
    valueHelper.isStringValue(addressHelper.city(patient, "user")) ||
    valueHelper.isStringValue(patientHelper.gender(patient, "subscriber")) ||
    valueHelper.isStringValue(patientHelper.firstName(patient, "user")) ||
    valueHelper.isStringValue(patientHelper.lastName(patient, "user")) ||
    valueHelper.isStringValue(patientHelper.middleName(patient, "user")) ||
    valueHelper.isStringValue(contactHelper.phone(patient, "user")) ||
    valueHelper.isStringValue(addressHelper.state(patient, "user")) ||
    valueHelper.isStringValue(addressHelper.zipCode(patient, "user"))
}

function healthPlan(patient) {
  return fieldHelper.getField(patient, "health_plan")
}

function healthPlanName(patient) {
  return healthPlanHelper.name(patientHelper.healthPlan(patient))
}

function id(patient) {
  return fieldHelper.getField(patient, "id")
}

function lastName(patient, prefix = "") {
  return nameHelper.lastName(patient, prefix)
}

function latitude(patient) {
  return fieldHelper.getField(patient, "latitude")
}

function longitude(patient) {
  return fieldHelper.getField(patient, "longitude")
}

function medicationCount(patient) {
  return fieldHelper.getField(patient, "medication_count")
}

function memberNumber(patient) {
  return fieldHelper.getField(patient, "member_number")
}

function middleName(patient, prefix = "") {
  return nameHelper.middleName(patient, prefix)
}

function modelName() {
  return "patient"
}

function name(patient, prefix = "", allowBlank = false) {
  return nameHelper.name(patient, "patient", prefix, allowBlank)
}

function noKnownAllergies(patient) {
  return fieldHelper.getField(patient, "no_known_allergies")
}

function personNumber(patient) {
  return fieldHelper.getField(patient, "person_number")
}

function preferredContactMethod(patient) {
  return fieldHelper.getField(patient, "preferred_contact_method")
}

function phone(patient) {
  return contactHelper.phone(patient)
}

function primaryCareProviderNpi(patient) {
  return fieldHelper.getField(patient, "primary_care_provider_npi")
}

function race(patient) {
  return fieldHelper.getField(patient, "race")
}

function subscriberName(patient) {
  return fieldHelper.getField(patient, "name", "subscriber")
}

function toBreadcrumb(patient) {
  if (!valueHelper.isValue(patient)) {
    return "(no patient)"
  }

  return patientHelper.name(patient)
}

function toJSON(patient) {
  return apiHelper.toJSON(patient, patientKeys)
}
