import { BooleanFilter, DateFilter, SelectIdFilter, StringFilter } from '../components/filters'

export const filterTypes = {
  'boolean': {
    filterClass: BooleanFilter,
    onChange: 'onChange',
    optional: ['disabled', 'falseLabel', 'trueLabel', 'unselectedLabel']
  },
  'date': {
    filterClass: DateFilter,
    onChange: 'onChangeDay'
  },
  'string': {
    filterClass: StringFilter,
    onChange: 'onChange',
    optional: ['disabled']
  },
  'select-id': {
    filterClass: SelectIdFilter,
    onChange: 'onChangeId',
    optional: ['disabled', 'multiple', 'options', 'requireUnselected', 'unselectedLabel']
  }
}
