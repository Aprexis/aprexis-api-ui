import {
  BooleanFilter,
  DateRangeFilter,
  DateTimeRangeFilter,
  NameIdFilter,
  SelectIdFilter,
  StringFilter
} from "./"

// Because of the imports above that come from the same folder, this constant should be imported explicitly from this
// file rather than from the folder.
export const filterClasses = {
  "boolean": BooleanFilter,
  "date-range": DateRangeFilter,
  "date-time-range": DateTimeRangeFilter,
  "name-id": NameIdFilter,
  "select-id": SelectIdFilter,
  "string": StringFilter
}
