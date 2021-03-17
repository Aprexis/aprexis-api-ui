import React, { Component } from 'react'
import { Alert, Col, Container, Row } from 'reactstrap'
import { alertHelper, valueHelper } from '../../helpers'

class DisplayAlert extends Component {
  render() {
    const { clearAlert } = this.props
    const { alertMessage, alertType, parentType } = alertHelper.get()
    if (!valueHelper.isValue(alertType)) {
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
