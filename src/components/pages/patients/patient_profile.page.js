import React, { Component } from "react"
import { Card, CardBody, CardTitle, Col, Container, Row } from "reactstrap"
import { Address, Contact, Spinner } from '../../shared'
import { PatientProfilePageViewModel } from "../../view_models/pages/patients"
import { fieldHelper, patientHelper, valueHelper } from "../../../helpers"

const PatientConfiguration = ({ patient }) => {
  return (
    <Col className="col-sm d-flex">
      <Card className="card flex-fill">
        <CardTitle>
          <h3>Configuration</h3>
        </CardTitle>

        <CardBody>
          {fieldHelper.booleanDisplay("Cognitively Impaired", patient.cognnitively_impaired)}
          {fieldHelper.booleanDisplay("No Known Allergies", patient.no_known_allergies)}
          {fieldHelper.display("Primary Care Provider NPI", patient.primary_care_provider_npi)}
          {fieldHelper.display("Number of Medications", patient.medication_count)}
          {fieldHelper.display("Latitude", patient.latitude)}
          {fieldHelper.display("Longitude", patient.longitude)}
        </CardBody>
      </Card>
    </Col>
  )
}

const PatientProfile = ({ patient }) => {
  return (
    <Col className="col-sm d-flex">
      <Card className="card flex-fill">
        <CardTitle>
          <h3>Profile</h3>
        </CardTitle>

        <CardBody>
          {fieldHelper.display("Member Number", patient.member_number)}
          {
            patientHelper.requiresPersonNumber(patient) &&
            fieldHelper.display("Person Number", patient.person_number)
          }
          {fieldHelper.dateDisplay("Coverage Effective Date", patient.coverage_effective_date)}
          {fieldHelper.dateDisplay("Coverage End Date", patient.coverage_end_date)}
          <Address addressable={patient} />
          <Contact contactable={patient} />
          {fieldHelper.display("Preferred Contact Method", patient.preferred_contact_method)}
          {fieldHelper.display("Race", patient.race)}
        </CardBody>
      </Card>
    </Col>
  )
}

const PatientSubscriber = ({ patient }) => {
  if (!patientHelper.hasSubscriber(patient)) {
    return (<React.Fragment />)
  }

  return (
    <Col className="col-sm d-flex">
      <Card className="card flex-fill">
        <CardTitle>
          <h3>Subscriber</h3>
        </CardTitle>

        <CardBody>
          <Address addressable={patient} prefix="subscriber" />
          {fieldHelper.display("Name", fieldHelper.getField(patient, "name", "subscriber"))}
          <Contact contactable={patient} prefix="subscriber" />
        </CardBody>
      </Card>
    </Col>
  )
}

const PatientUser = ({ patient }) => {
  return (
    <Col className="col-sm d-flex">
      <Card className="card flex-fill">
        <CardTitle>
          <h3>User</h3>
        </CardTitle>

        <CardBody>
          <Address addressable={patient} prefix="user" />
          <Contact contactable={patient} prefix="user" />
        </CardBody>
      </Card>
    </Col>
  )
}

const PatientDisplay = ({ patient }) => {
  if (!valueHelper.isValue(patient)) {
    return (<Spinner />)
  }

  return (
    <React.Fragment>
      <Row>
        <PatientProfile patient={patient} />
        <PatientSubscriber patient={patient} />
      </Row>

      <Row>
        <PatientConfiguration patient={patient} />
        {patientHelper.hasUser(patient) && <PatientUser patient={patient} />}
      </Row>
    </React.Fragment>
  )
}

class PatientProfilePage extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new PatientProfilePageViewModel(
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
    const { patient } = this.state

    return (
      <Container>
        <Col>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 mb-3">
            <h1>{patientHelper.name(patient)}</h1>
          </div>

          <PatientDisplay currentUser={this.props.currentUser} patient={patient} />
        </Col>
      </Container>
    )
  }
}

export { PatientProfilePage }
