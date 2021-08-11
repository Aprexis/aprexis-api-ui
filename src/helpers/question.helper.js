import { valueHelper } from "./value.helper"
import { fieldHelper } from "./field.helper"
import { questionChoiceHelper } from "./question_choice.helper"
import { questionOptionHelper } from "./question_option.helper"

export const questionHelper = {
  choices,
  displayValue,
  options,
  questionType
}

function choices(question) {
  return fieldHelper.getField(question, "choices")
}

function displayValue(question, value) {
  const questionType = questionHelper.questionType(question)

  switch (questionType) {
    case "RadioButton":
      return radioButtonValue(question, value)

    case "Select":
      return selectValue(question, value)

    default:
      return valueHelper.makeString(value)
  }

  function radioButtonValue(question, value) {
    const rbValue = questionOptionHelper.displayValue(questionHelper.options(question), value)
    if (rbValue === value && !isNaN(rbValue)) {
      return valueHelper.yesNo(rbValue !== '0')
    }

    return value
  }

  function selectValue(question, value) {
    return questionChoiceHelper.displayValue(questionHelper.choices(question), value)
  }
}

function options(question) {
  return fieldHelper.getField(question, "options")
}

function questionType(question) {
  return fieldHelper.getField(question, "question_type")
}
