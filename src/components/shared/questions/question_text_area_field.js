import React, { Component } from 'react'
import { FormGroup, Col } from 'reactstrap'
import { answerHelper, valueHelper } from '@aprexis/aprexis-api-utility'

class QuestionTextAreaField extends Component {
  render() {
    const { answer, changeField } = this.props

    return (
      <FormGroup row>
        <Col>
          <textarea
            name='value'
            onChange={changeField}
            value={renderValue()}
          />
        </Col>
      </FormGroup>
    )

    function renderValue() {
      const value = answerHelper.value(answer)
      if (valueHelper.isStringValue(value)) {
        return value
      }

      if (typeof value === 'object') {
        return JSON.stringify(value, null, 2)
      }

      return valueHelper.makeString(answerHelper.value(answer))
    }
  }
}

export { QuestionTextAreaField }
