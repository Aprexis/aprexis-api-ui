import React, { Component } from "react"
import { Alert, Col, Container, Row } from "reactstrap"
import { valueHelper } from "@aprexis/aprexis-api-utility"
import { alertHelper } from "../../helpers/index.js"

class DisplayAlert extends Component {
  render() {
    const { clearAlert, parentType } = this.props
    const { alertMessage, alertType } = alertHelper.get()
    if (!valueHelper.isValue(alertType)) {
      return (<React.Fragment />)
    }
    if (valueHelper.isSet(this.props.modalIsOpen) != (parentType == "modal")) {
      return (<React.Fragment />)
    }

    return (
      <Container className={`${parentType}-alert`}>
        <Row>
          <Col>
            <Alert color={alertType} toggle={clearAlert}>
              <label>{alertMessage}</label>
            </Alert>
          </Col>
        </Row>
      </Container >
    )
  }
}

export { DisplayAlert }
