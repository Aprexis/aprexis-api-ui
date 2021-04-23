import React, { Component } from 'react'
import { Card, CardBody, CardTitle, Col, Container, Row } from 'reactstrap'
import { Spinner } from '../../shared'
import { InterventionProfilePageViewModel } from '../../view_models/pages/interventions'
import { contextHelper, fieldHelper, interventionHelper, valueHelper } from '../../../helpers'

const InterventionState = ({ intervention }) => {
  return (
    <Col className="col-sm d-flex">
      <Card className="card flex-fill">
        <CardTitle>
          <h3>Status</h3>
        </CardTitle>

        <CardBody>
          {fieldHelper.display("State", interventionHelper.state(intervention))}
          {fieldHelper.display("Closed Reason", interventionHelper.closedReason(intervention))}
          {fieldHelper.display("Closed Reason Detail", interventionHelper.closedReasonDetail(intervention))}
          {fieldHelper.display("User Started", interventionHelper.userStarted(intervention))}
          {fieldHelper.display("Consult Started", interventionHelper.consultStarted(intervention))}
          {fieldHelper.display("Consult Ended", interventionHelper.consultEnded(intervention))}
          {fieldHelper.display("User Ended", interventionHelper.userEnded(intervention))}
        </CardBody>
      </Card>
    </Col>
  )
}

const InterventionProfile = ({ intervention }) => {
  return (
    <Col className="col-sm d-flex">
      <Card className="card flex-fill">
        <CardTitle>
          <h3>Profile</h3>
        </CardTitle>

        <CardBody>
          {fieldHelper.notInContextDisplay("health-plans", "Health Plan", interventionHelper.healthPlanName(intervention))}
          {fieldHelper.notInContextDisplay("patients", "Patient", interventionHelper.patientName(intervention))}
          {fieldHelper.notInContextDisplay("programs", "Program", interventionHelper.programDisplay(intervention))}
          {
            fieldHelper.notInContextDisplay(
              "pharmacy-stores",
              "Pharmacy Store",
              interventionHelper.pharmacyStoreDisplay(intervention)
            )
          }
          {fieldHelper.display("Pharmacist", interventionHelper.pharmacistDisplay(intervention))}
          {fieldHelper.notInContextDisplay("users", "User", interventionHelper.userName(intervention))}
        </CardBody>
      </Card>
    </Col>
  )
}

const InterventionDisplay = ({ intervention }) => {
  if (!valueHelper.isValue(intervention)) {
    return (<Spinner />)
  }

  return (
    <React.Fragment>
      <Row>
        <InterventionProfile intervention={intervention} />
        <InterventionState intervention={intervention} />
      </Row>
    </React.Fragment>
  )
}

class InterventionProfilePage extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new InterventionProfilePageViewModel(
      {
        ...props,
        view: this
      }
    )
  }

  componentDidMount() {
    this.vm.loadData()
  }

  render() {
    const { intervention } = this.state

    return (
      <Container>
        <Col>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 mb-3">
            <h1>Intervention</h1>
          </div>

          <InterventionDisplay currentUser={this.props.currentUser} intervention={intervention} />
        </Col>
      </Container>
    )
  }
}

export { InterventionProfilePage }
