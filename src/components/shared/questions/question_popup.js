import React, { Component } from 'react'
import { Alert, Col } from 'reactstrap'
import { questionHelper, valueHelper } from '@aprexis/aprexis-api-utility'
import { Sanitize } from '../index.js'

class QuestionPopup extends Component {
  render() {
    const { question } = this.props
    const popupLabel = questionHelper.popupLabel(question)
    const popupText = questionHelper.popupText(question)

    if (!valueHelper.isStringValue(popupLabel) && !valueHelper.isStringValue(popupText)) {
      return (<React.Fragment />)
    }

    return (
      <Col>
        {
          valueHelper.isStringValue(popupLabel) &&
          <label><Sanitize html={popupLabel} /></label>
        }
        {
          valueHelper.isStringValue(popupText) &&
          <Alert color='info'><Sanitize html={popupText} /></Alert>
        }
      </Col>
    )
  }
}

export { QuestionPopup }
