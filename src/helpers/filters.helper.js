import { format } from 'date-fns'
import { valueHelper } from './'
import { filterTypes } from '../types'

export const filtersHelper = {
  booleanFilter,
  dateLabel,
  dateRangeToLabel,
  filterToClass,
  filterToLabel,
  filterToOnChange,
  filterToValue,
  selectIdFilter,
  stringFilter
}

function checkValidFilterType(name, type) {
  if (!valueHelper.isStringValue(type) || !valueHelper.isValue(filterTypes[type])) {
    throw new Error(`Unrecognized filter type ${type}${valueHelper.isStringValue(name) ? `for ${name}` : ''}`)
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
  checkValidFilter('boolean', name, queryParam, options)

  return { type: 'boolean', name, queryParam, ...ensureFilterOptions(options, { falseLabel: "false", trueLabel: "true" }) }
}

function dateLabel(value) {
  if (typeof value === 'string') {
    return value
  }

  return format(value, 'MM/dd/yyyy')
}

function dateRangeToLabel(filterDescription, filters) {
  const { stopRange, startRange } = filterDescription
  const start = buildLabel('start', startRange, filters)
  const stop = buildLabel('stop', stopRange, filters)

  return [
    start,
    {
      canDelete: false,
      label: ' to '
    },
    stop
  ]

  function buildLabel(part, rangeEntry, filters) {
    const { queryParam } = rangeEntry
    const value = filtersHelper.filterToValue(filters, queryParam)
    if (!valueHelper.isValue(value)) {
      return {
        canDelete: false,
        label: `${valueHelper.capitalizeWords(part)} of time`,
        queryParam
      }
    }

    return {
      canDelete: true,
      label: dateLabel(value),
      queryParam
    }
  }
}

function filterToClass(filterDescription, filterClasses) {
  checkValidFilterDescription(filterDescription)

  return filterClasses[filterDescription.type]
}

function filterToLabel(filterDescription, filters, filterClasses) {
  const label = filtersHelper.filterToClass(filterDescription, filterClasses).toLabel(filterDescription, filters, filterClasses)
  if (!valueHelper.isValue(label)) {
    return
  }

  const { canDelete } = filterDescription
  return { canDelete, ...label }
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

function selectIdFilter(name, queryParam, options = {}) {
  checkValidFilter('select-id', name, queryParam, options)

  return { type: 'select-id', name, queryParam, ...options }
}

function stringFilter(name, queryParam, options = {}) {
  checkValidFilter('string', name, queryParam, options)

  return { type: 'string', name, queryParam, ...options }
}
