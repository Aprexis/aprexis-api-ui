import React, { Component } from "react"
import { Card, CardBody, CardTitle, Col, Container, Row } from "reactstrap"
import { EditButton, Spinner } from '../../shared'
import { PatientDiseaseProfilePageViewModel } from "../../view_models/pages/patient_diseases"
import { patientDiseaseHelper, valueHelper } from "@aprexis/aprexis-api-utility"
import { displayHelper } from "../../../helpers"

const PatientDiseaseProfile = ({ currentUser, onEditProfile, patientDisease }) => {
  return (
    <Col className="col-sm d-flex">
      <Card className="card flex-fill">
        <CardTitle>
          <h3>
            Profile
            {
              patientDiseaseHelper.canEdit(currentUser, patientDisease) &&
              <EditButton onEdit={(_event) => { onEditProfile(patientDisease) }} />
            }
          </h3>
        </CardTitle>

        <CardBody>
          {displayHelper.display("Description", patientDiseaseHelper.diseaseDescription(patientDisease))}
        </CardBody>
      </Card>
    </Col>
  )
}

const PatientDiseaseDisplay = ({ currentUser, onEditProfile, patientDisease }) => {
  if (!valueHelper.isValue(patientDisease)) {
    return (<Spinner showAtStart={true} />)
  }

  return (
    <Row>
      <PatientDiseaseProfile
        currentUser={currentUser}
        onEditProfile={onEditProfile}
        patientDisease={patientDisease}
      />
    </Row>
  )
}
class PatientDiseaseProfilePage extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new PatientDiseaseProfilePageViewModel(
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
    const { patientDisease } = this.state
    let diseaseName = patientDiseaseHelper.diseaseName(patientDisease)
    if (!valueHelper.isValue(diseaseName)) {
      return "(no disease name specified)"
    }

    return (
      <Container className='patient-disease-profile'>
        <Col>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 mb-3">
            <h1>
              {patientDiseaseHelper.diseaseName(patientDisease)} for {patientDiseaseHelper.patientName(patientDisease)}
            </h1>
          </div>

          <PatientDiseaseDisplay
            currentUser={this.props.currentUser}
            onEditProfile={this.vm.editProfileModal}
            patientDisease={patientDisease}
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

export { PatientDiseaseProfilePage }
