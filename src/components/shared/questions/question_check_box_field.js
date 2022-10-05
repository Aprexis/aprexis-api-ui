import React, { Component } from 'react'
import { FormGroup, Col, Input } from 'reactstrap'
import { answerHelper, valueHelper } from '@aprexis/aprexis-api-utility'
import { jsEventHelper } from '../../../helpers'
import { QuestionPopup } from './question_popup'


class QuestionCheckBoxField extends Component {
  render() {
    const { answer, question, changeFieldValue, className, style } = this.props
    const value = answerHelper.value(answer)
    const checked = value == '0'

    return (
      <FormGroup row>
        <Col>
          <Input
            className={`form-control-small ${className}`}
            name='value'
            onChange={toggle}
            style={style}
            type='checkbox'
            checked={checked}
          />
        </Col>
        {
          checked &&
          <QuestionPopup question={question} />
        }
      </FormGroup>
    )

    function toggle(event) {
      const { value } = jsEventHelper.fromInputEvent(event)

      changeFieldValue('value', valueHelper.isSet(value) ? '0' : '')
    }
  }
}

export { QuestionCheckBoxField }
