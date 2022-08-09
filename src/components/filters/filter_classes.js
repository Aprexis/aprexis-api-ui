import { BooleanFilter } from "./boolean.filter"
import { DateRangeFilter } from "./date_range.filter"
import { DateTimeRangeFilter } from "./date_time_range_filter"
import { NameIdFilter } from "./name_id_filter"
import { SelectIdFilter } from "./select_id.filter"
import { StringFilter } from './string.filter'

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
