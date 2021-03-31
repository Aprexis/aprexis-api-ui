export const filterTypes = {
  'boolean': {
    onChange: 'onChange',
    optional: ['disabled', 'falseLabel', 'trueLabel', 'unselectedLabel']
  },
  'date': {
    onChange: 'onChangeDay'
  },
  'string': {
    onChange: 'onChange',
    optional: ['disabled']
  },
  'select-id': {
    onChange: 'onChangeId',
    optional: ['disabled', 'multiple', 'options', 'requireUnselected', 'unselectedLabel']
  }
}
