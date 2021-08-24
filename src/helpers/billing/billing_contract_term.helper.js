import { billingContractHelper } from "./"
import { fieldHelper, userHelper, valueHelper, apiHelper } from "../"

const billingContractTermEditableFields = [
  "allow_claims_despite_physician_denial",
  "aprexis_fee",
  "diagnosis",
  "emergency_service",
  "epsdt",
  "existing_patient_additional_15min_charge",
  "existing_patient_additional_15min_cpt_code",
  "existing_patient_additional_15min_user_mod",
  "existing_patient_follow_up_charge",
  "existing_patient_follow_up_cpt_code",
  "existing_patient_follow_up_user_mod",
  "existing_patient_initial_15min_charge",
  "existing_patient_initial_15min_cpt_code",
  "existing_patient_initial_15min_user_mod",
  "family_plan",
  "misc",
  "new_patient_additional_15min_charge",
  "new_patient_additional_15min_cpt_code",
  "new_patient_additional_15min_user_mod",
  "new_patient_follow_up_charge",
  "new_patient_follow_up_cpt_code",
  "new_patient_follow_up_user_mod",
  "new_patient_initial_15min_charge",
  "new_patient_initial_15min_cpt_code",
  "new_patient_initial_15min_user_mod",
  "note",
  "place_of_service",
  "pulls_enabled",
  "pushes_enabled",
  "unit"
]


export const billingContractTermHelper = {
  allowClaimsDespitePhysicianDenial,
  aprexisFee,
  buildChanged,
  buildNewChanged,
  canDelete,
  canEdit,
  canModifyField,
  contract,
  contractId,
  diagnosis,
  displayPullsEnabled,
  displayPushesEnabled,
  emergencyService,
  epsdt,
  existingPatientAdditional15minCharge,
  existingPatientAdditional15minCptCode,
  existingPatientAdditional15minUserMod,
  existingPatientFollowUpCharge,
  existingPatientFollowUpCptCode,
  existingPatientFollowUpUserMod,
  existingPatientInitial15minCharge,
  existingPatientInitial15minCptCode,
  existingPatientInitial15minUserMod,
  familyPlan,
  healthPlanName,
  id,
  misc,
  modelName,
  newPatientAdditional15minCharge,
  newPatientAdditional15minCptCode,
  newPatientAdditional15minUserMod,
  newPatientFollowUpCharge,
  newPatientFollowUpCptCode,
  newPatientFollowUpUserMod,
  newPatientInitial15minCharge,
  newPatientInitial15minCptCode,
  newPatientInitial15minUserMod,
  note,
  placeOfService,
  pullsEnabled,
  pushesEnabled,
  toJSON,
  type,
  unit
}

const billingContractTermKeys = [
  "id",
  "contract_id",
  "allow_claims_despite_physician_denial",
  "aprexis_fee",
  "diagnosis",
  "emergency_service",
  "epsdt",
  "existing_patient_additional_15min_charge",
  "existing_patient_additional_15min_cpt_code",
  "existing_patient_additional_15min_user_mod",
  "existing_patient_follow_up_charge",
  "existing_patient_follow_up_cpt_code",
  "existing_patient_follow_up_user_mod",
  "existing_patient_initial_15min_charge",
  "existing_patient_initial_15min_cpt_code",
  "existing_patient_initial_15min_user_mod",
  "family_plan",
  "misc",
  "new_patient_additional_15min_charge",
  "new_patient_additional_15min_cpt_code",
  "new_patient_additional_15min_user_mod",
  "new_patient_follow_up_charge",
  "new_patient_follow_up_cpt_code",
  "new_patient_follow_up_user_mod",
  "new_patient_initial_15min_charge",
  "new_patient_initial_15min_cpt_code",
  "new_patient_initial_15min_user_mod",
  "note",
  "place_of_service",
  "pulls_enabled",
  "pushes_enabled",
  "type",
  "unit"
]

function allowClaimsDespitePhysicianDenial(billingContractTerm) {
  return fieldHelper.getField(billingContractTerm, "allow_claims_despite_physician_denial")
}

function aprexisFee(billingContractTerm) {
  return fieldHelper.getField(billingContractTerm, "aprexis_fee")
}

function buildChanged(billingContractTerm, changedBillingContractTerm) {
  if (valueHelper.isValue(changedBillingContractTerm)) {
    return changedBillingContractTerm
  }

  if (valueHelper.isValue(billingContractTerm.id)) {
    return copyIdentifiers(billingContractTerm)
  }

  return billingContractHelper.buildNewChanged(billingContractTerm)

  function copyIdentifiers(billingContractTerm) {
    return {
      id: billingContractTermHelper.id(billingContractTerm),
      contract_id: billingContractTermHelper.contractId(billingContractTerm)
    }
  }
}

function buildNewChanged(billingContractTerm) {
  return {
    ...billingContractTerm
  }
}

function canDelete(user, billingContractTerm) {
  return false
}

function canEdit(user, billingContractPharmacyTerm) {
  return userHelper.hasRole(user, "aprexis_admin")
}

function canModifyField(billingContractTerm, fieldName) {
  if (!valueHelper.isValue(billingContractTermHelper.id(billingContractTerm))) {
    return fieldName !== "type"
  }

  return billingContractTermEditableFields.includes(fieldName)
}

function contract(billingContractTerm) {
  return fieldHelper.getField(billingContractTerm, "contract")
}

function contractId(billingContractTerm) {
  return fieldHelper.getField(billingContractTerm, "contract_id")
}

function diagnosis(billingContractTerm) {
  return fieldHelper.getField(billingContractTerm, "diagnosis")
}

function displayPullsEnabled(billingContractTerm) {
  return valueHelper.yesNo(billingContractTermHelper.pullsEnabled(billingContractTerm))
}

function displayPushesEnabled(billingContractTerm) {
  return valueHelper.yesNo(billingContractTermHelper.pushesEnabled(billingContractTerm))
}

function emergencyService(billingContractTerm) {
  return fieldHelper.getField(billingContractTerm, "emergency_service")
}

function epsdt(billingContractTerm) {
  return fieldHelper.getField(billingContractTerm, "epsdt")
}

function existingPatientAdditional15minCharge(billingContractTerm) {
  return fieldHelper.getField(billingContractTerm, "existing_patient_additional_15min_charge")
}

function existingPatientAdditional15minCptCode(billingContractTerm) {
  return fieldHelper.getField(billingContractTerm, "existing_patient_additional_15min_cpt_code")
}

function existingPatientAdditional15minUserMod(billingContractTerm) {
  return fieldHelper.getField(billingContractTerm, "existing_patient_additional_15min_user_mod")
}

function existingPatientFollowUpCharge(billingContractTerm) {
  return fieldHelper.getField(billingContractTerm, "existing_patient_follow_up_charge")
}

function existingPatientFollowUpCptCode(billingContractTerm) {
  return fieldHelper.getField(billingContractTerm, "existing_patient_follow_up_cpt_code")
}

function existingPatientFollowUpUserMod(billingContractTerm) {
  return fieldHelper.getField(billingContractTerm, "existing_patient_follow_up_user_mod")
}

function existingPatientInitial15minCharge(billingContractTerm) {
  return fieldHelper.getField(billingContractTerm, "existing_patient_initial_15min_charge")
}

function existingPatientInitial15minCptCode(billingContractTerm) {
  return fieldHelper.getField(billingContractTerm, "existing_patient_initial_15min_cpt_code")
}

function existingPatientInitial15minUserMod(billingContractTerm) {
  return fieldHelper.getField(billingContractTerm, "existing_patient_initial_15min_user_mod")
}

function familyPlan(billingContractTerm) {
  return fieldHelper.getField(billingContractTerm, "family_plan")
}

function healthPlanName(billingContractTerm) {
  return billingContractHelper.healthPlanName(billingContractTermHelper.contract(billingContractTerm))
}

function id(billingContractTerm) {
  return fieldHelper.getField(billingContractTerm, "id")
}

function misc(billingContractTerm) {
  return fieldHelper.getField(billingContractTerm, "misc")
}

function modelName() {
  return "billingContractTerm"
}

function newPatientAdditional15minCharge(billingContractTerm) {
  return fieldHelper.getField(billingContractTerm, "new_patient_additional_15min_charge")
}

function newPatientAdditional15minCptCode(billingContractTerm) {
  return fieldHelper.getField(billingContractTerm, "new_patient_additional_15min_cpt_code")
}

function newPatientAdditional15minUserMod(billingContractTerm) {
  return fieldHelper.getField(billingContractTerm, "new_patient_additional_15min_user_mod")
}

function newPatientFollowUpCharge(billingContractTerm) {
  return fieldHelper.getField(billingContractTerm, "new_patient_follow_up_charge")
}

function newPatientFollowUpCptCode(billingContractTerm) {
  return fieldHelper.getField(billingContractTerm, "new_patient_follow_up_cpt_code")
}

function newPatientFollowUpUserMod(billingContractTerm) {
  return fieldHelper.getField(billingContractTerm, "new_patient_follow_up_user_mod")
}

function newPatientInitial15minCharge(billingContractTerm) {
  return fieldHelper.getField(billingContractTerm, "new_patient_initial_15min_charge")
}

function newPatientInitial15minCptCode(billingContractTerm) {
  return fieldHelper.getField(billingContractTerm, "new_patient_initial_15min_cpt_code")
}

function newPatientInitial15minUserMod(billingContractTerm) {
  return fieldHelper.getField(billingContractTerm, "new_patient_initial_15min_user_mod")
}

function note(billingContractTerm) {
  return fieldHelper.getField(billingContractTerm, "note")
}

function placeOfService(billingContractTerm) {
  return fieldHelper.getField(billingContractTerm, "place_of_service")
}

function pullsEnabled(billingContractTerm) {
  return fieldHelper.getField(billingContractTerm, "pulls_enabled")
}

function pushesEnabled(billingContractTerm) {
  return fieldHelper.getField(billingContractTerm, "pushes_enabled")
}

function toJSON(billingContractTerm) {
  return apiHelper.toJSON(billingContractTerm, billingContractTermKeys)
}

function type(billingContractTerm) {
  return fieldHelper.getField(billingContractTerm, "type")
}

function unit(billingContractTerm) {
  return fieldHelper.getField(billingContractTerm, "unit")
}
