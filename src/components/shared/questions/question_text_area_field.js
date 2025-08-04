import { Component } from 'react'
import { FormGroup, Col } from 'reactstrap'
import { answerHelper, valueHelper } from '@aprexis/aprexis-api-utility'

class QuestionTextAreaField extends Component {
  render() {
    const { answer, changeField, className, placeholder, style } = this.props

    return (
      <FormGroup row>
        <Col>
          <textarea
            className={`form-control ${className}`}
            name='value'
            onChange={changeField}
            placeholder={placeholder}
            style={style}
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

      return valueHelper.makeString(value)
    }
  }
}

export { QuestionTextAreaField }
