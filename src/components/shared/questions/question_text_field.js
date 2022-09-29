import React, { Component } from 'react'
import { FormGroup, Col } from 'reactstrap'
import { answerHelper, valueHelper } from '@aprexis/aprexis-api-utility'

class QuestionTextField extends Component {
  render() {
    const { answer, changeField } = this.props

    return (
      <FormGroup row>
        <Col>
          <input
            className="form-control"
            name='value'
            onChange={changeField}
            type='text'
            value={valueHelper.makeString(answerHelper.value(answer))}
          />
        </Col>
      </FormGroup>
    )
  }
}

export { QuestionTextField }
