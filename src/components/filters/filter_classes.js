import { BooleanFilter } from "./boolean.filter.js"
import { DateRangeFilter } from "./date_range.filter.js"
import { DateTimeRangeFilter } from "./date_time_range_filter.js"
import { NameIdFilter } from "./name_id_filter.js"
import { SelectIdFilter } from "./select_id.filter.js"
import { StringFilter } from './string.filter.js'

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
