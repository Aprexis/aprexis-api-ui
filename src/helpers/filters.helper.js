import { format } from 'date-fns'
import { valueHelper } from './'
import { filterTypes } from '../types'

export const filtersHelper = {
  dateLabel,
  dateRangeToLabel,
  filterToLabel
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
    const value = filtersHelper.filterValue(filters, queryParam)
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

function filterToLabel(filterDescription, filters) {
  if (!valueHelper.isValue(filterTypes[filterDescription.type])) {
    throw new Error(`Unrecognized filter type ${filterDescription.type} for ${filterDescription.queryParam}`)
  }

  return filterTypes[filterDescription.type].toLabel(filterDescription, filters)
}
