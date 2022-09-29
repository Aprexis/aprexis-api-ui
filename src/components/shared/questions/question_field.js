import React, { Component } from 'react'
import { answerHelper, questionHelper } from '@aprexis/aprexis-api-utility'
import { QuestionCheckBoxField } from './question_check_box_field'
import { QuestionRadioButtonField } from './question_radio_button_field'
import { QuestionSelectField } from './question_select_field'
import { QuestionTextAreaField } from './question_text_area_field'
import { QuestionTextField } from './question_text_field'

class QuestionField extends Component {
  render() {
    const { answer } = this.props
    const question = answerHelper.question(answer)

    switch (questionHelper.questionType(question)) {
      case 'CheckBox':
        return (<QuestionCheckBoxField {...this.props} />)

      case 'RadioButton':
        return (<QuestionRadioButtonField {...this.props} />)

      case 'Select':
        return (<QuestionSelectField {...this.props} />)

      case 'TextField':
        return (<QuestionTextField {...this.props} />)

      case 'TextArea':
        return (<QuestionTextAreaField {...this.props} />)

      default:
        return (<QuestionTextAreaField {...this.props} />)
    }
  }
}

export { QuestionField }
