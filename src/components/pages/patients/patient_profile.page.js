import React, { Component } from "react"
import { Card, CardBody, CardTitle, Col, Container, Row } from "reactstrap"
import { Address, Contact, EditButton, Spinner } from '../../shared'
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
          {fieldHelper.booleanDisplay("Cognitively Impaired", patientHelper.cognnitivelyImpaired(patient))}
          {fieldHelper.booleanDisplay("No Known Allergies", patientHelper.noKnownAllergies(patient))}
          {fieldHelper.display("Primary Care Provider NPI", patientHelper.primaryCareProviderNpi(patient))}
          {fieldHelper.display("Number of Medications", patientHelper.medicationCount(patient))}
          {fieldHelper.display("Latitude", patientHelper.latitude(patient))}
          {fieldHelper.display("Longitude", patientHelper.longitude(patient))}
        </CardBody>
      </Card>
    </Col>
  )
}

const PatientProfile = ({ currentUser, onEditProfile, patient }) => {
  return (
    <Col className="col-sm d-flex">
      <Card className="card flex-fill">
        <CardTitle>
          <h3>
            Profile
            {
              patientHelper.canEdit(currentUser, patient) &&
              <EditButton onEdit={(event) => { onEditProfile(patient) }} />
            }
          </h3>
        </CardTitle>

        <CardBody>
          {fieldHelper.display("Member Number", patientHelper.memberNumber(patient))}
          {
            patientHelper.requiresPersonNumber(patient) &&
            fieldHelper.display("Person Number", patientHelper.personNumber(patient))
          }
          {fieldHelper.dateDisplay("Coverage Effective Date", patientHelper.coverageEffectiveDate(patient))}
          {fieldHelper.dateDisplay("Coverage End Date", patientHelper.coverageEndDate(patient))}
          <Address addressable={patient} />
          <Contact contactable={patient} />
          {fieldHelper.display("Preferred Contact Method", patientHelper.preferredContactMethod(patient))}
          {fieldHelper.display("Race", patientHelper.race(patient))}
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
          {fieldHelper.display("Name", patientHelper.subscriberName(patient))}
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

const PatientDisplay = ({ currentUser, onEditProfile, patient }) => {
  if (!valueHelper.isValue(patient)) {
    return (<Spinner showAtStart={true} />)
  }

  return (
    <React.Fragment>
      <Row>
        <PatientProfile currentUser={currentUser} onEditProfile={onEditProfile} patient={patient} />
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
      <Container className='patient-profile'>
        <Col>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 mb-3">
            <h1>
              {patientHelper.name(patient)}
            </h1>
            <label>{fieldHelper.dateDisplay("DOB", patientHelper.dateOfBirth(patient))}</label>
          </div>

          <PatientDisplay
            currentUser={this.props.currentUser}
            onEditProfile={this.vm.editProfileModal}
            patient={patient}
          />
        </Col>
      </Container>
    )
  }

  shouldComponentUpdate(nextProps, nextState) {
    this.vm.props = { ...this.vm.props, ...nextProps }
    return true
  }
}

export { PatientProfilePage }
