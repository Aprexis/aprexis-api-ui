import {
  BooleanFilter,
  DateTimeRangeFilter,
  NameIdFilter,
  SelectIdFilter,
  StringFilter
} from "./"

// Because of the imports above that come from the same folder, this constant should be imported explicitly from this
// file rather than from the folder.
export const filterClasses = {
  "boolean": BooleanFilter,
  "date-time-range": DateTimeRangeFilter,
  "name-id": NameIdFilter,
  "select-id": SelectIdFilter,
  "string": StringFilter
}
