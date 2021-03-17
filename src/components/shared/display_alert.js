import React, { Component } from 'react'
import { Alert, Col, Container, Row } from 'reactstrap'
import { alertHelper } from '../../helpers'

class DisplayAlert extends Component {
  render() {
    const { alertMessage, alertType, parentType } = alertHelper.get()

    return (
      <Container className={`${parentType}-alert`}>
        <Row>
          <Col>
            <Alert color={`alert-${alertType}`} toggle={alertHelper.clear}>
              <label>{alertMessage}</label>
            </Alert>
          </Col>
        </Row>
      </Container>
    )
  }
}

export { DisplayAlert }
