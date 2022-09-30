import React, { Component } from 'react'
import { FormGroup, Col, Input } from 'reactstrap'
import { answerHelper } from '@aprexis/aprexis-api-utility'
import { jsEventHelper } from '../../../helpers'


class QuestionCheckBoxField extends Component {
  render() {
    const { answer, changeFieldValue, className, style } = this.props
    const value = answerHelper.value(answer)
    const checked = value == '0'

    return (
      <FormGroup row>
        <Col>
          <Input
            className={`form-control ${className}`}
            name='value'
            onChange={toggle}
            style={style}
            type='checkbox'
            checked={checked}
          />
        </Col>
      </FormGroup>
    )

    function toggle(event) {
      const { name, value } = jsEventHelper.fromInputEvent(event)

      changeFieldValue(name, value ? '0' : '')
    }
  }
}

export { QuestionCheckBoxField }
