import { fieldHelper, valueHelper } from "./"

export const questionChoiceHelper = {
  choice,
  displayValue,
  id,
  value
}

function choice(choices, value) {
  if (!valueHelper.isValue(choices)) {
    return
  }

  return choices.find(
    (choice) => {
      const id = questionChoiceHelper.id(choice)

      return id == value
    }
  )
}

function displayValue(choices, value) {
  const choice = questionChoiceHelper.choice(choices, value)
  const choiceValue = questionChoiceHelper.value(choice)
  if (!valueHelper.isValue(choiceValue)) {
    return value
  }

  return choiceValue
}

function id(choice) {
  return fieldHelper.getField(choice, "id")
}


function value(choice) {
  return fieldHelper.getField(choice, "value")
}
