import { valueHelper } from "./value.helper"
import { dateHelper } from "./date.helper"
import { fieldHelper } from "./field.helper"
import { interventionHelper } from "./intervention.helper"
import { localeLanguages } from "../types"

export const interventionDocumentHelper = {
  canDelete,
  canEdit,
  consultEndDate,
  consultStartDate,
  createdAt,
  displayConsultEndDate,
  displayConsultStartDate,
  displayLocale,
  filePath,
  generator,
  id,
  intervention,
  locale,
  modelName,
  patientName,
  pharmacyStoreDisplay,
  programName,
  title,
  updatedAt
}

function canDelete(user, interventionDocument) {
  return false
}

function canEdit(user, interventionDocument) {
  return false
}

function consultEndDate(interventionDocument) {
  return fieldHelper.getField(interventionDocument, "consult_end_date")
}

function consultStartDate(interventionDocument) {
  return fieldHelper.getField(interventionDocument, "consult_start_date")
}

function createdAt(interventionDocument) {
  return fieldHelper.getField(interventionDocument, "created_at")
}

function displayConsultEndDate(interventionDocument) {
  return dateHelper.formatDate(interventionDocumentHelper.consultEndDate(interventionDocument))
}

function displayConsultStartDate(interventionDocument) {
  return dateHelper.formatDate(interventionDocumentHelper.consultStartDate(interventionDocument))
}

function displayLocale(interventionDocument) {
  const locale = interventionDocumentHelper.locale(interventionDocument)
  if (!valueHelper.isStringValue(locale) || !valueHelper.isStringValue(localeLanguages[locale])) {
    return 'English'
  }

  return localeLanguages[locale]
}

function filePath(interventionDocument) {
  return fieldHelper.getField(interventionDocument, "file_path")
}

function generator(interventionDocument) {
  return fieldHelper.getField(interventionDocument, "generator")
}

function id(interventionDocument) {
  return fieldHelper.getField(interventionDocument, "id")
}

function intervention(interventionDocument) {
  return fieldHelper.getField(interventionDocument, "intervention")
}

function locale(interventionDocument) {
  return fieldHelper.getField(interventionDocument, "locale")
}

function modelName() {
  return "interventionDocument"
}

function patientName(interventionDocument) {
  return interventionHelper.patientName(interventionDocumentHelper.intervention(interventionDocument))
}

function pharmacyStoreDisplay(interventionDocument) {
  return interventionHelper.pharmacyStoreDisplay(interventionDocumentHelper.intervention(interventionDocument))
}

function programName(interventionDocument) {
  return interventionHelper.programName(interventionDocumentHelper.intervention(interventionDocument))
}

function title(interventionDocument) {
  return fieldHelper.getField(interventionDocument, "title")
}

function updatedAt(interventionDocument) {
  return fieldHelper.getField(interventionDocument, "updated_at")
}
