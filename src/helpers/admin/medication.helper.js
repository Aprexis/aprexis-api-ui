import { fieldHelper, valueHelper } from "../"

export const medicationHelper = {
  activeIngredUnit,
  activeNumeratorStrength,
  applicationNumber,
  canDelete,
  canEdit,
  deaSchedule,
  din,
  displayMedicationSuperset,
  dosageFormName,
  endMarketingDate,
  goldStandardProductId,
  id,
  label,
  labelerName,
  marketingCategoryName,
  medicationSuperset,
  modelName,
  name,
  ndc11Codes,
  ndcLabelerCode,
  ndcProductCode,
  nonProprietaryName,
  pharmClasses,
  productNdc,
  productTypeName,
  proprietaryName,
  proprietaryNameSuffix,
  routeName,
  startMarketingDate,
  substanceName,
  superset,
  supersetId,
  supersetLabel
}

function activeIngredUnit(medication) {
  return fieldHelper.getField(medication, "active_ingred_unit")
}

function activeNumeratorStrength(medication) {
  return fieldHelper.getField(medication, "active_numerator_strength")
}

function applicationNumber(medication) {
  return fieldHelper.getField(medication, "applicationnumber")
}

function canDelete(user, medication) {
  return false
}

function canEdit(user, medication) {
  return false
}

function deaSchedule(medication) {
  return fieldHelper.getField(medication, "deaschedule")
}

function din(medication) {
  return fieldHelper.getField(medication, "din")
}

function displayMedicationSuperset(medication) {
  return valueHelper.yesNo(medicationHelper.medicationSuperset(medication))
}

function dosageFormName(medication) {
  return fieldHelper.getField(medication, "dosageformname")
}

function endMarketingDate(medication) {
  return fieldHelper.getField(medication, "endmarketingdate")
}

function goldStandardProductId(medication) {
  return fieldHelper.getField(medication, "gold_standard_product_id")
}

function id(medication) {
  return fieldHelper.getField(medication, "id")
}

function label(medication) {
  return fieldHelper.getField(medication, "label")
}

function labelerName(medication) {
  return fieldHelper.getField(medication, "labelername")
}

function marketingCategoryName(medication) {
  return fieldHelper.getField(medication, "marketingcategoryname")
}

function medicationSuperset(medication) {
  return fieldHelper.getField(medication, "medication_superset")
}

function modelName() {
  return "medication"
}

function name(medication) {
  return fieldHelper.getField(medication, "name")
}

function ndc11Codes(medication) {
  return fieldHelper.getField(medication, "ndc11_codes")
}

function ndcLabelerCode(medication) {
  return fieldHelper.getField(medication, "ndc_labeler_code")
}

function ndcProductCode(medication) {
  return fieldHelper.getField(medication, "ndc_product_code")
}

function nonProprietaryName(medication) {
  return fieldHelper.getField(medication, "nonproprietaryname")
}

function pharmClasses(medication) {
  return fieldHelper.getField(medication, "pharm_classes")
}

function productNdc(medication) {
  return fieldHelper.getField(medication, "productndc")
}

function productTypeName(medication) {
  return fieldHelper.getField(medication, "producttypename")
}

function proprietaryName(medication) {
  return fieldHelper.getField(medication, "proprietaryname")
}

function proprietaryNameSuffix(medication) {
  return fieldHelper.getField(medication, "proprietarynamesuffix")
}

function routeName(medication) {
  return fieldHelper.getField(medication, "routename")
}

function substanceName(medication) {
  return fieldHelper.getField(medication, "substancename")
}

function startMarketingDate(medication) {
  return fieldHelper.getField(medication, "startmarketingdate")
}

function superset(medication) {
  return fieldHelper.getField(medication, "superset")
}

function supersetId(medication) {
  return fieldHelper.getField(medication, "superset_id")
}

function supersetLabel(medication) {
  if (valueHelper.isSet(medicationHelper.medicationSuperset(medication))) {
    return
  }

  return medicationHelper.label(medicationHelper.superset(medication))
}
