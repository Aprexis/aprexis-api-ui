import React, { Component } from 'react'
import { answerHelper, questionHelper } from '@aprexis/aprexis-api-utility'
import { QuestionCheckBoxField } from './question_check_box_field'
import { QuestionRadioButtonField } from './question_radio_button_field'
import { QuestionSelectField } from './question_select_field'
import { QuestionTextAreaField } from './question_text_area_field'
import { QuestionTextField } from './question_text_field'
import { questionHtmlOptionsParser } from '../../../helpers'


class QuestionField extends Component {
  render() {
    const { answer } = this.props
    const question = answerHelper.question(answer)
    const { className, multiple, placeholder, style } = questionHtmlOptionsParser.parseHtmlOptions(question)

    switch (questionHelper.questionType(question)) {
      case 'CheckBox':
        return (<QuestionCheckBoxField {...this.props} className={className} placeholder={placeholder} style={style} />)

      case 'RadioButton':
        return (<QuestionRadioButtonField {...this.props} className={className} placeholder={placeholder} style={style} />)

      case 'Select':
        return (<QuestionSelectField {...this.props} className={className} multiple={multiple} placeholder={placeholder} style={style} />)

      case 'TextField':
        return (<QuestionTextField {...this.props} className={className} placeholder={placeholder} style={style} />)

      case 'TextArea':
        return (<QuestionTextAreaField {...this.props} className={className} placeholder={placeholder} style={style} />)

      default:
        return (<QuestionTextAreaField {...this.props} className={className} placeholder={placeholder} style={style} />)
    }
  }
}

export { QuestionField }
