import React, { Component } from 'react'
import { FormGroup, Col, Input } from 'reactstrap'
import { answerHelper } from '@aprexis/aprexis-api-utility'

function Options() {
  return (
    <React.Fragment>
      <option value='0'>No</option>
      <option value='1'>Yes</option>
      <option></option>
    </React.Fragment>
  )
}

class QuestionCheckBoxField extends Component {
  render() {
    const { answer, changeField } = this.props

    return (
      <FormGroup row>
        <Col>
          <Input
            bsSize="sm"
            className="form-control"
            name='value'
            onChange={changeField}
            type="select"
            value={answerHelper.value(answer)}>
            <Options />
          </Input>
        </Col>
      </FormGroup>
    )
  }
}

export { QuestionCheckBoxField }
