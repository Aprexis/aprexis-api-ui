import { format } from "date-fns"
import { valueHelper } from "@aprexis/aprexis-api-utility"
import { filterTypes } from "../types"

export const filtersHelper = {
  booleanFilter,
  dateLabel,
  dateRangeFilter,
  dateTimeRangeFilter,
  filterToClass,
  filterToLabel,
  filterToOnChange,
  filterToValue,
  nameIdFilter,
  selectIdFilter,
  stringFilter
}

function checkValidFilterType(name, type) {
  if (!valueHelper.isStringValue(type) || !valueHelper.isValue(filterTypes[type])) {
    throw new Error(`Unrecognized filter type ${type}${valueHelper.isStringValue(name) ? ` for ${name}` : ""}`)
  }
}

function checkValidFilterDescription(filterDescription) {
  if (!valueHelper.isValue(filterDescription)) {
    throw new Error("A filter description is required to get a filter class")
  }

  checkValidFilterType(filterDescription.name, filterDescription.type)
}

function checkValidFilter(type, name, queryParam, options = {}) {
  checkValidFilterType(name, type)

  if (!valueHelper.isStringValue(name)) {
    throw new Error(`A ${type} filter requires a name`)
  }

  if (!valueHelper.isStringValue(queryParam)) {
    throw new Error(`A ${type} filter requires a query parameter`)
  }

  const { optional } = filterTypes[type]
  Object.keys(options).forEach(
    (option) => {
      if (!valueHelper.isValue(optional) || !optional.includes(option)) {
        throw new Error(`A ${type} filter does not permit ${option} values`)
      }
    }
  )
}

function ensureFilterOptions(options, defaultOptions = {}) {
  const fullOptions = { ...options }

  Object.keys(defaultOptions).forEach(
    (optionName) => {
      if (!valueHelper.isValue(options[optionName])) {
        fullOptions[optionName] = defaultOptions[optionName]
      }
    }
  )

  return fullOptions
}

function booleanFilter(name, queryParam, options = {}) {
  checkValidFilter("boolean", name, queryParam, options)

  return { type: "boolean", name, queryParam, ...ensureFilterOptions(options, { falseLabel: "No", trueLabel: "Yes" }) }
}

function dateLabel(value) {
  if (typeof value === "string") {
    return value
  }

  return format(value, "MM/dd/yyyy")
}

function dateRangeFilter(name, queryParam, options = {}) {
  checkValidFilter("date-range", name, queryParam, options)

  return {
    type: "date-range",
    name,
    queryParam,
    ...ensureFilterOptions(
      options,
      {
        label: "Date Range",
        startFieldLabel: "Start",
        stopFieldLabel: "Stop"
      }
    )
  }
}

function dateTimeRangeFilter(name, queryParam, options = {}) {
  checkValidFilter("date-time-range", name, queryParam, options)

  return {
    type: "date-time-range",
    name,
    queryParam,
    ...ensureFilterOptions(
      options,
      {
        label: "Date/Time Range",
        startFieldLabel: "Start",
        stopFieldLabel: "Stop"
      }
    )
  }
}

function filterToClass(filterDescription, filterClasses) {
  checkValidFilterDescription(filterDescription)

  return filterClasses[filterDescription.type]
}

function filterToLabel(filterDescription, filters, filterClasses, nextOperation) {
  filtersHelper.filterToClass(filterDescription, filterClasses)
    .toLabel(filterDescription, filters, nextOperation)
}

function filterToOnChange(filterDescription) {
  checkValidFilterDescription(filterDescription)

  return filterTypes[filterDescription.type].onChange
}

function filterToValue(filters, queryParam) {
  if (!valueHelper.isValue(filters) || !valueHelper.isValue(filters[queryParam])) {
    return
  }

  return filters[queryParam]
}

function nameIdFilter(name, queryParam, options = {}) {
  checkValidFilter("name-id", name, queryParam, options)

  return { type: "name-id", name, queryParam, ...options }
}

function selectIdFilter(name, queryParam, options = {}) {
  checkValidFilter("select-id", name, queryParam, options)

  return { type: "select-id", name, queryParam, ...options }
}

function stringFilter(name, queryParam, options = {}) {
  checkValidFilter("string", name, queryParam, options)

  return { type: "string", name, queryParam, ...options }
}
