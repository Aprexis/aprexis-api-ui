import React, { Component } from "react"
import { Card, CardBody, CardTitle, Col, Container, Row } from "reactstrap"
import { EditButton, Spinner } from '../../shared'
import { PatientPhysicianProfilePageViewModel } from "../../view_models/pages/patient_physicians"
import { patientPhysicianHelper, valueHelper } from "@aprexis/aprexis-api-utility"
import { displayHelper } from "../../../helpers"

const PatientPhysicianProfile = ({ currentUser, onEditProfile, patientPhysician }) => {
  return (
    <Col className="col-sm d-flex">
      <Card className="card flex-fill">
        <CardTitle>
          <h3>
            Profile
            {
              patientPhysicianHelper.canEdit(currentUser, patientPhysician) &&
              <EditButton onEdit={(_event) => { onEditProfile(patientPhysician) }} />
            }
          </h3>
        </CardTitle>

        <CardBody>
          {displayHelper.display("NPI", patientPhysicianHelper.physicianNpi(patientPhysician))}
          {displayHelper.booleanDisplay("Primary", patientPhysicianHelper.primary(patientPhysician))}
        </CardBody>
      </Card>
    </Col>
  )
}

const PatientPhysicianDisplay = ({ currentUser, onEditProfile, patientPhysician }) => {
  if (!valueHelper.isValue(patientPhysician)) {
    return (<Spinner showAtStart={true} />)
  }

  return (
    <Row>
      <PatientPhysicianProfile
        currentUser={currentUser}
        onEditProfile={onEditProfile}
        patientPhysician={patientPhysician}
      />
    </Row>
  )
}
class PatientPhysicianProfilePage extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new PatientPhysicianProfilePageViewModel(
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
    const { patientPhysician } = this.state
    let physicianName = patientPhysicianHelper.physicianName(patientPhysician)
    if (!valueHelper.isValue(physicianName)) {
      return "(no physician name specified)"
    }

    return (
      <Container className='patient-physician-profile'>
        <Col>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 mb-3">
            <h1>
              {patientPhysicianHelper.physicianName(patientPhysician)} for {patientPhysicianHelper.patientName(patientPhysician)}
            </h1>
          </div>

          <PatientPhysicianDisplay
            currentUser={this.props.currentUser}
            onEditProfile={this.vm.editProfileModal}
            patientPhysician={patientPhysician}
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

export { PatientPhysicianProfilePage }
