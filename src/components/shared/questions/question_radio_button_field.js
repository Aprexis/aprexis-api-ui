import React, { Component } from 'react'
import { Button, ButtonGroup, FormGroup, Col } from 'reactstrap'
import { answerHelper, questionHelper, questionOptionHelper, valueHelper } from '@aprexis/aprexis-api-utility'

const defaultQuestionOptions = [
  {
    id: 0,
    label: 'No'
  },
  {
    id: 1,
    label: 'Yes'
  }
]

function Option({ changeFieldValue, questionOption, value }) {
  const id = questionOptionHelper.id(questionOption)
  const label = questionOptionHelper.label(questionOption)
  const active = value == id

  return (
    <Col>
      <Button
        active={active}
        className='btn btn-sm btn-secondary mr-auto'
        onClick={() => { changeFieldValue('value', id) }}>
        {label}
      </Button>
    </Col>
  )
}

function Options({ changeFieldValue, question, value }) {
  const questionOptions = determineQuestionOptions()

  return questionOptions.map(
    (questionOption, idx) => {
      return (<Option changeFieldValue={changeFieldValue} key={`radio-button-option-${idx}`} questionOption={questionOption} value={value} />)
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
    const { answer, changeFieldValue } = this.props

    return (
      <FormGroup row>
        <ButtonGroup>
          <Options changeFieldValue={changeFieldValue} question={answerHelper.question(answer)} value={answerHelper.value(answer)} />
        </ButtonGroup>
      </FormGroup>
    )
  }
}

export { QuestionRadioButtonField }
