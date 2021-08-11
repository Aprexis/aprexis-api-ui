import { valueHelper } from "./value.helper"
import { fieldHelper } from "./field.helper"
import { questionHelper } from "./question.helper"

export const answerHelper = {
  canEdit,
  displayValue,
  question,
  questionKey,
  questionType,
  value
}

function canEdit(user, answer) {
  return false
}

function displayValue(answer) {
  const value = answerHelper.value(answer)
  const question = answerHelper.question(answer)
  if (!valueHelper.isStringValue(value) || !valueHelper.isValue(question)) {
    return value
  }

  return questionHelper.displayValue(question, value)
}

function question(answer) {
  return fieldHelper.getField(answer, "question")
}

function questionKey(answer) {
  return fieldHelper.getField(answer, "question_key")
}

function questionType(answer) {
  return questionHelper.questionType(answerHelper.question(answer))
}

function value(answer) {
  return fieldHelper.getField(answer, "value")
}
