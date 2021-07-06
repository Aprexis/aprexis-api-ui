import React, { Component } from "react"
import { Card, CardBody, CardTitle, Col, Container, Row } from "reactstrap"
import { Spinner } from '../../shared'
import { MedicalClaimProfilePageViewModel } from "../../view_models/pages/medical_claims"
import { fieldHelper, pathHelper, medicalClaimHelper, valueHelper } from "../../../helpers"

const MedicalClaimReferences = ({ pathEntries, medicalClaim }) => {
  return (
    <Col className="col-sm d-flex">
      <Card className="card flex-fill">
        <CardTitle>
          <h3>References</h3>
        </CardTitle>

        <CardBody>
          {
            !pathHelper.isSingular(pathEntries, "health-plans") &&
            fieldHelper.displayField("Health Plan", medicalClaimHelper.healthPlanName(medicalClaim))
          }
          {
            !pathHelper.isSingular(pathEntries, "patients") &&
            <React.Fragment>
              {fieldHelper.display("Patient", medicalClaimHelper.patientName(medicalClaim))}
              {fieldHelper.display("Member Number", medicalClaimHelper.memberNumber(medicalClaim))}
              {fieldHelper.display("Person Number", medicalClaimHelper.personNumber(medicalClaim))}
            </React.Fragment>
          }
          {fieldHelper.booleanDisplay("Uploaded", medicalClaimHelper.wasUploaded(medicalClaim))}
        </CardBody>
      </Card>
    </Col>
  )
}

const MedicalClaimProfile = ({ pathEntries, medicalClaim }) => {
  return (
    <Col className="col-sm d-flex">
      <Card className="card flex-fill">
        <CardTitle>
          <h3>Profile</h3>
        </CardTitle>

        <CardBody>
          {
            fieldHelper.display(
              "Identifier",
              medicalClaimHelper.healthPlanPatientMedicalClaimIdentifier(medicalClaim)
            )
          }
          {fieldHelper.display("Service Date", medicalClaimHelper.serviceDate(medicalClaim))}
          {fieldHelper.display("Processed Date", medicalClaimHelper.processedDate(medicalClaim))}
          {fieldHelper.display("Provider NPI", medicalClaimHelper.providerNpi(medicalClaim))}
        </CardBody>
      </Card>
    </Col>
  )
}

const MedicalClaimDisplay = ({ pathEntries, medicalClaim }) => {
  if (!valueHelper.isValue(medicalClaim)) {
    return (<Spinner showAtStart={true} />)
  }

  return (
    <React.Fragment>
      <Row>
        <MedicalClaimProfile pathEntries={pathEntries} medicalClaim={medicalClaim} />
        <MedicalClaimReferences pathEntries={pathEntries} medicalClaim={medicalClaim} />
      </Row>
    </React.Fragment>
  )
}

class MedicalClaimProfilePage extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new MedicalClaimProfilePageViewModel(
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
    const pathEntries = this.vm.pathEntries()
    const { medicalClaim } = this.state

    return (
      <Container>
        <Col>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 mb-3">
            <h1>{medicalClaimHelper.claimNumber(medicalClaim)}</h1>
          </div>

          <MedicalClaimDisplay
            currentUser={this.props.currentUser}
            pathEntries={pathEntries}
            medicalClaim={medicalClaim}
          />
        </Col>
      </Container>
    )
  }
}

export { MedicalClaimProfilePage }
