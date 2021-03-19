import { BooleanFilter, DateFilter, StringFilter } from '../components/filters'

export const filterTypes = {
  'boolean': {
    filterClass: BooleanFilter,
    onChange: 'onChange'
  },
  'date': {
    filterClass: DateFilter,
    onChange: 'onChangeDay'
  },
  'string': {
    filterClass: StringFilter,
    onChange: 'onChange'
  }
}
