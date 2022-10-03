import React, { Component } from 'react'
import { Alert, Button, ButtonGroup, FormGroup, Col } from 'reactstrap'
import { answerHelper, questionHelper, questionOptionHelper, valueHelper } from '@aprexis/aprexis-api-utility'
import { Sanitize } from '../sanitize'

const defaultQuestionOptions = [
  {
    id: 1,
    label: 'Yes'
  },
  {
    id: 0,
    label: 'No'
  },
  {
    id: '',
    label: 'No Answer'
  }
]

function Option({ changeFieldValue, className, questionOption, style, value }) {
  const id = questionOptionHelper.id(questionOption)
  const label = questionOptionHelper.label(questionOption)
  const popupText = questionOptionHelper.popupText(questionOption)
  const active = (value == id) && (valueHelper.isNumberValue(value, false) == valueHelper.isNumberValue(id, false))

  return (
    <Col>
      <Button
        active={active}
        className={`btn btn-sm btn-secondary mr-auto ${className}`}
        onClick={() => { changeFieldValue('value', id) }}
        style={style}>
        {label}
      </Button>
      {
        valueHelper.isStringValue(popupText) && active &&
        <Alert color='info'>
          <label><Sanitize html={popupText} /></label>
        </Alert>
      }
    </Col>
  )
}

function Options({ changeFieldValue, className, question, value }) {
  const questionOptions = determineQuestionOptions()

  return questionOptions.map(
    (questionOption, idx) => {
      return (<Option changeFieldValue={changeFieldValue} className={className} key={`radio-button-option-${idx}`} questionOption={questionOption} value={value} />)
    }
  )

  function determineQuestionOptions() {
    const questionOptions = questionHelper.options(question)
    if (valueHelper.isValue(questionOptions)) {
      return questionOptions
    }

    return defaultQuestionOptions
  }
}

class QuestionRadioButtonField extends Component {
  render() {
    const { answer, changeFieldValue, className, style } = this.props

    return (
      <FormGroup row>
        <ButtonGroup>
          <Options changeFieldValue={changeFieldValue} className={className} question={answerHelper.question(answer)} style={style} value={answerHelper.value(answer)} />
        </ButtonGroup>
      </FormGroup>
    )
  }
}

export { QuestionRadioButtonField }
