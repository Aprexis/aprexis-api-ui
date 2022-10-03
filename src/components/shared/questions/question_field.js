import React, { Component } from 'react'
import { Alert, Col, FormGroup } from 'reactstrap'
import { answerHelper, questionHelper, valueHelper } from '@aprexis/aprexis-api-utility'
import { QuestionCheckBoxField } from './question_check_box_field'
import { QuestionRadioButtonField } from './question_radio_button_field'
import { QuestionSelectField } from './question_select_field'
import { QuestionTextAreaField } from './question_text_area_field'
import { QuestionTextField } from './question_text_field'
import { questionHtmlOptionsParser } from '../../../helpers'
import { Sanitize } from '../'

function QuestionFieldValue({ answer, question, ...remainder }) {
  const { className, multiple, placeholder, style } = questionHtmlOptionsParser.parseHtmlOptions(question)

  switch (questionHelper.questionType(question)) {
    case 'CheckBox':
      return (<QuestionCheckBoxField {...remainder} className={className} placeholder={placeholder} style={style} />)

    case 'RadioButton':
      return (<QuestionRadioButtonField {...remainder} className={className} placeholder={placeholder} style={style} />)

    case 'Select':
      return (<QuestionSelectField {...remainder} className={className} multiple={multiple} placeholder={placeholder} style={style} />)

    case 'TextField':
      return (<QuestionTextField {...remainder} className={className} placeholder={placeholder} style={style} />)

    case 'TextArea':
      return (<QuestionTextAreaField {...remainder} className={className} placeholder={placeholder} style={style} />)

    default:
      return (<QuestionTextAreaField {...remainder} className={className} placeholder={placeholder} style={style} />)
  }
}

function QuestionPopup({ question }) {
  const popupLabel = questionHelper.popupLabel(question)
  const popupText = questionHelper.popupText(question)

  if (!valueHelper.isStringValue(popupLabel) && !valueHelper.isStringValue(popupText)) {
    return (<React.Fragment />)
  }

  return (
    <FormGroup row>
      {
        valueHelper.isStringValue(popupLabel) &&
        <Col>
          <label><Sanitize html={popupLabel} /></label>
        </Col>
      }
      {
        valueHelper.isStringValue(popupText) &&
        <Col>
          <label><Sanitize html={popupText} /></label>
        </Col>
      }
    </FormGroup>
  )
}

class QuestionField extends Component {
  render() {
    const { answer, ...remainder } = this.props
    const question = answerHelper.question(answer)

    return (
      <React.Fragment>
        <QuestionFieldValue {...remainder} answer={answer} question={question} />
        <QuestionPopup question={question} />
      </React.Fragment>
    )
  }
}

export { QuestionField }
