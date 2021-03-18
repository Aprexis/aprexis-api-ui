import { BooleanFilter, DateFilter } from '../components/filters'

export const filterTypes = {
  'boolean': {
    filterClass: BooleanFilter
  },
  'date': {
    filterClass: DateFilter
  }
}
