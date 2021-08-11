import { valueHelper } from "./value.helper"
import { fieldHelper } from "./field.helper"

export const questionOptionHelper = {
  displayValue,
  id,
  label,
  option
}

function displayValue(options, value) {
  const option = questionOptionHelper.option(options, value)
  const label = questionOptionHelper.label(option)
  if (!valueHelper.isValue(label)) {
    return value
  }

  return label
}

function id(option) {
  return fieldHelper.getField(option, "id")
}

function label(option) {
  return fieldHelper.getField(option, "label")
}

function option(options, value) {
  if (!valueHelper.isValue(options)) {
    return
  }

  return options.find(
    (option) => {
      const id = questionOptionHelper.id(option)

      return id == value
    }
  )
}
