import React, { Component } from "react"
import { Card, CardBody, CardTitle, Col, Container, Row } from "reactstrap"
import { Address, Contact, EditButton, Spinner } from '../../shared/index.js'
import { PatientProfilePageViewModel } from "../../view_models/pages/patients/index.js"
import { patientHelper, valueHelper } from "@aprexis/aprexis-api-utility"
import { displayHelper } from "../../../helpers/index.js"

const PatientConfiguration = ({ currentUser, onEditConfiguration, patient }) => {
  return (
    <Col className="col-sm d-flex">
      <Card className="card flex-fill">
        <CardTitle>
          <h3>
            Configuration
            {
              patientHelper.canEdit(currentUser, patient) &&
              <EditButton onEdit={(_event) => { onEditConfiguration(patient) }} />
            }
          </h3>
        </CardTitle>

        <CardBody>
          {displayHelper.booleanDisplay("Cognitively Impaired", patientHelper.cognitivelyImpaired(patient))}
          {displayHelper.display("Cognitive Impairment Determined", patientHelper.cognitiveImpairmentDetermined(patient))}
          {displayHelper.booleanDisplay("No Known Allergies", patientHelper.noKnownAllergies(patient))}
          {displayHelper.display("Primary Care Provider NPI", patientHelper.primaryCareProviderNpi(patient))}
          {displayHelper.display("Number of Medications", patientHelper.medicationCount(patient))}
          {displayHelper.display("Latitude", patientHelper.latitude(patient))}
          {displayHelper.display("Longitude", patientHelper.longitude(patient))}
          {displayHelper.display("Time Zone", patientHelper.displayTimeZone(patient))}
        </CardBody>
      </Card>
    </Col>
  )
}

const PatientProfile = ({ currentUser, onEditProfile, patient, requiresPersonNumber }) => {
  return (
    <Col className="col-sm d-flex">
      <Card className="card flex-fill">
        <CardTitle>
          <h3>
            Profile
            {
              patientHelper.canEdit(currentUser, patient) &&
              <EditButton onEdit={(_event) => { onEditProfile(patient) }} />
            }
          </h3>
        </CardTitle>

        <CardBody>
          {displayHelper.display("Member Number", patientHelper.memberNumber(patient))}
          {
            requiresPersonNumber() &&
            displayHelper.display("Person Number", patientHelper.personNumber(patient))
          }
          {displayHelper.dateDisplay("Coverage Effective Date", patientHelper.coverageEffectiveDate(patient))}
          {displayHelper.dateDisplay("Coverage End Date", patientHelper.coverageEndDate(patient))}
          <Address addressable={patient} />
          <Contact contactable={patient} />
          {displayHelper.display("Preferred Contact Method", patientHelper.preferredContactMethod(patient))}
          {displayHelper.display("Race", patientHelper.race(patient))}
        </CardBody>
      </Card>
    </Col>
  )
}

const PatientSubscriber = ({ currentUser, patient, onEditSubscriber }) => {
  if (!patientHelper.hasSubscriber(patient)) {
    return (<React.Fragment />)
  }

  return (
    <Col className="col-sm d-flex">
      <Card className="card flex-fill">
        <CardTitle>
          <h3>
            Subscriber
            {
              patientHelper.canEdit(currentUser, patient) &&
              <EditButton onEdit={(_event) => { onEditSubscriber(patient) }} />
            }
          </h3>
        </CardTitle>

        {
          patientHelper.hasSubscriber(patient) &&
          <CardBody>
            {displayHelper.display("Name", patientHelper.subscriberName(patient))}
            {displayHelper.dateDisplay("DOB", patientHelper.dateOfBirth(patient, "subscriber"))}
            <Address addressable={patient} prefix="subscriber" />
            {displayHelper.display("Gender", patientHelper.gender(patient, "subscriber"))}
          </CardBody>
        }
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

const PatientDisplay = (
  {
    currentUser,
    onEditConfiguration,
    onEditProfile,
    onEditSubscriber,
    patient,
    requiresPersonNumber
  }
) => {
  if (!valueHelper.isValue(patient)) {
    return (<Spinner showAtStart={true} />)
  }

  return (
    <React.Fragment>
      <Row>
        <PatientProfile
          currentUser={currentUser}
          onEditProfile={onEditProfile}
          patient={patient}
          requiresPersonNumber={requiresPersonNumber}
        />
        <PatientSubscriber
          currentUser={currentUser}
          onEditSubscriber={onEditSubscriber}
          patient={patient}
        />
      </Row>

      <Row>
        <PatientConfiguration
          currentUser={currentUser}
          onEditConfiguration={onEditConfiguration}
          patient={patient}
        />
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
            <label>{displayHelper.dateDisplay("DOB", patientHelper.dateOfBirth(patient))}</label>
          </div>

          <PatientDisplay
            currentUser={this.props.currentUser}
            onEditConfiguration={this.vm.editConfigurationModal}
            onEditProfile={this.vm.editProfileModal}
            onEditSubscriber={this.vm.editSubscriberModal}
            patient={patient}
            requiresPersonNumber={this.vm.requiresPersonNumber}
          />
        </Col>
      </Container>
    )
  }

  shouldComponentUpdate(nextProps, _nextState) {
    this.vm.props = { ...this.vm.props, ...nextProps }
    return true
  }
}

export { PatientProfilePage }
