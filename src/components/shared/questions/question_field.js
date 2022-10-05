import React, { Component } from 'react'
import { answerHelper, questionHelper } from '@aprexis/aprexis-api-utility'
import { QuestionCheckBoxField } from './question_check_box_field'
import { QuestionRadioButtonField } from './question_radio_button_field'
import { QuestionSelectField } from './question_select_field'
import { QuestionTextAreaField } from './question_text_area_field'
import { QuestionTextField } from './question_text_field'
import { questionHtmlOptionsParser } from '../../../helpers'

function QuestionFieldValue({ question, ...remainder }) {
  const { className, multiple, placeholder, style } = questionHtmlOptionsParser.parseHtmlOptions(question)

  switch (questionHelper.questionType(question)) {
    case 'CheckBox':
      return (<QuestionCheckBoxField {...remainder} className={className} placeholder={placeholder} question={question} style={style} />)

    case 'RadioButton':
      return (<QuestionRadioButtonField {...remainder} className={className} placeholder={placeholder} question={question} style={style} />)

    case 'Select':
      return (<QuestionSelectField {...remainder} className={className} multiple={multiple} placeholder={placeholder} question={question} style={style} />)

    case 'TextField':
      return (<QuestionTextField {...remainder} className={className} placeholder={placeholder} question={question} style={style} />)

    case 'TextArea':
      return (<QuestionTextAreaField {...remainder} className={className} placeholder={placeholder} question={question} style={style} />)

    default:
      return (<QuestionTextAreaField {...remainder} className={className} placeholder={placeholder} question={question} style={style} />)
  }
}

class QuestionField extends Component {
  render() {
    const { answer, ...remainder } = this.props
    const question = answerHelper.question(answer)

    return (
      <QuestionFieldValue {...remainder} answer={answer} question={question} />
    )
  }
}

export { QuestionField }
