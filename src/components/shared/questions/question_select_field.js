import React, { Component } from "react"
import { Col, FormGroup, Input } from "reactstrap"
import { answerHelper, questionHelper, questionChoiceHelper, questionChoiceOptionsHelper, valueHelper } from "@aprexis/aprexis-api-utility"

function Options({ question }) {
  const questionOptions = renderQuestionOptions()
  const blankOption = renderBlankOption()

  if (valueHelper.isValue(blankOption)) {
    return [blankOption, ...questionOptions]
  }

  return questionOptions

  function renderBlankOption() {
    const choiceOptions = questionHelper.choiceOptions(question)
    if (!valueHelper.isValue(choiceOptions)) {
      return
    }

    const includeBlank = questionChoiceOptionsHelper.includeBlank(choiceOptions)
    if (!valueHelper.isValue(includeBlank)) {
      return
    }

    return (<option key='blank'>{includeBlank}</option>)
  }

  function renderQuestionOptions() {
    const choices = questionHelper.choices(question)

    return choices.map(
      (choice) => {
        const id = questionChoiceHelper.id(choice)
        const value = questionChoiceHelper.value(choice)

        return (<option key={`option-${id}`} value={id}>{value}</option>)
      }
    )
  }
}

class QuestionSelectField extends Component {
  render() {
    const { answer, changeField } = this.props

    return (
      <FormGroup row>
        <Col>
          <Input
            className="form-control"
            name='value'
            onChange={changeField}
            type="select"
            value={answerHelper.value(answer)}>
            <Options question={answerHelper.question(answer)} />
          </Input>
        </Col>
      </FormGroup>
    )
  }
}

export { QuestionSelectField }
