import React, { Component } from "react"
import { Card, CardBody, CardTitle, Col, Container, Row } from "reactstrap"
import { AprexisList, Spinner } from '../../shared'
import { MedicalClaimProfilePageViewModel } from "../../view_models/pages/medical_claims"
import { medicalClaimDiagnosisCodeHelper, medicalClaimHelper, valueHelper } from "@aprexis/aprexis-api-utility"
import { displayHelper, listHelper, pathHelper } from "../../../helpers"

const headings = [
  {
    name: 'Number',
    field: 'code_number',
    method: 'codeNumber'
  },
  {
    name: 'Diagnosis Code',
    field: 'diagnosis_code',
    method: 'diagnosisCode'
  }
]

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
            displayHelper.display("Health Plan", medicalClaimHelper.healthPlanName(medicalClaim))
          }
          {
            !pathHelper.isSingular(pathEntries, "patients") &&
            <React.Fragment>
              {displayHelper.display("Patient", medicalClaimHelper.patientName(medicalClaim))}
              {displayHelper.display("Member Number", medicalClaimHelper.memberNumber(medicalClaim))}
              {displayHelper.display("Person Number", medicalClaimHelper.personNumber(medicalClaim))}
            </React.Fragment>
          }
          {displayHelper.booleanDisplay("Uploaded", medicalClaimHelper.wasUploaded(medicalClaim))}
        </CardBody>
      </Card>
    </Col>
  )
}

const MedicalClaimProfile = ({ medicalClaim, pathEntries }) => {
  return (
    <Col className="col-sm d-flex">
      <Card className="card flex-fill">
        <CardTitle>
          <h3>Profile</h3>
        </CardTitle>

        <CardBody>
          {
            !valueHelper.isValue(pathEntries['health_plans']) &&
            displayHelper.display("Health PLan", medicalClaimHelper.healthPlanName(medicalClaim))
          }
          {
            !valueHelper.isValue(pathEntries['patients']) &&
            displayHelper.display("Patient", medicalClaimHelper.patientName(medicalClaim))
          }
          {displayHelper.display("Member Number", medicalClaimHelper.memberNumber(medicalClaim))}
          {displayHelper.display("Person Number", medicalClaimHelper.personNumber(medicalClaim))}
          {displayHelper.display("Identifier", medicalClaimHelper.healthPlanPatientMedicalClaimIdentifier(medicalClaim))}
          {displayHelper.display("Service Date", medicalClaimHelper.serviceDate(medicalClaim))}
          {displayHelper.display("Processed Date", medicalClaimHelper.processedDate(medicalClaim))}
          {displayHelper.display("Provider NPI", medicalClaimHelper.providerNpi(medicalClaim))}
        </CardBody>
      </Card>
    </Col>
  )
}

const MedicalClaimDiagnosisCodes = ({ gotoDiagnosisCode, medicalClaim, pathEntries }) => {
  let medicalClaimDiagnosisCodes = medicalClaimHelper.medicalClaimDiagnosisCodes(medicalClaim)
  if (!valueHelper.isValue(medicalClaimDiagnosisCodes)) {
    medicalClaimDiagnosisCodes = []
  }

  return (
    <Col className="col-sm d-flex">
      <Card className="card-flex-fill">
        <CardTitle>
          <h3>Diagnosis Codes</h3>
        </CardTitle>

        <CardBody>
          <AprexisList
            generateTableHeadings={generateTableHeadings}
            generateTableRow={generateTableRow}
            list={medicalClaimDiagnosisCodes}
            listLabel={'Diagnosis Code'}
            listPluralLabel={'Diagnosis Codes'}
          />
        </CardBody>
      </Card>
    </Col>
  )

  function generateTableHeadings() {
    return listHelper.listHeader(
      {
        headings,
        listName: "medical-claim-diagnnosis-codes",
        pathEntries
      }
    )
  }

  function generateTableRow(medicalClaimDiagnosisCode) {
    return listHelper.listRow(
      {
        gotoTableItemProfile: gotoDiagnosisCode,
        headings,
        helper: medicalClaimDiagnosisCodeHelper,
        modelName: 'medicalClaimDiagnosisCode',
        pathEntries,
        tableItem: medicalClaimDiagnosisCode
      }
    )
  }
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

      <Row>
        <MedicalClaimDiagnosisCodes pathEntries={pathEntries} medicalClaim={medicalClaim} />
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

  shouldComponentUpdate(nextProps, _nextState) {
    this.vm.props = { ...this.vm.props, ...nextProps }
    return true
  }
}

export { MedicalClaimProfilePage }
