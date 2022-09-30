import React, { Component } from "react"
import { Col, FormGroup, Input } from "reactstrap"
import { answerHelper, questionHelper, questionChoiceHelper, questionChoiceOptionsHelper, valueHelper } from "@aprexis/aprexis-api-utility"
import { jsEventHelper } from '../../../helpers'

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
        let id = questionChoiceHelper.id(choice)
        let value = questionChoiceHelper.value(choice)
        if (Array.isArray(value)) {
          id = value[0]
          value = value[1]
        }

        return (<option key={`option-${id}`} value={id}>{value}</option>)
      }
    )
  }
}

class QuestionSelectField extends Component {
  render() {
    const { answer, changeFieldValue, className, multiple, style } = this.props

    return (
      <FormGroup row>
        <Col>
          <Input
            className={`form-control ${className}`}
            multiple={valueHelper.isSet(multiple)}
            name='value'
            onChange={selectOptions}
            style={style}
            type="select"
            value={selectValues(answerHelper.value(answer))}>
            <Options question={answerHelper.question(answer)} />
          </Input>
        </Col>
      </FormGroup>
    )

    function selectOptions(event) {
      if (!valueHelper.isSet(multiple)) {
        const { value } = jsEventHelper.fromInputEvent(event)
        changeFieldValue('value', value)
        return
      }

      const options = Object.keys(event.target).map((key) => event.target[key])
      const multipleValues = options.filter((option) => !valueHelper.isValue(option.tag) && valueHelper.isValue(option.value) && option.selected).map((option) => option.value)
      if (multipleValues.length === 1 && multipleValues[0] == '') {
        changeFieldValue('value')
      }

      changeFieldValue('value', multipleValues.join(','))
    }

    function selectValues(value) {
      if (!valueHelper.isValue(multiple)) {
        return value
      }

      return value.split(',')
    }
  }
}

export { QuestionSelectField }
