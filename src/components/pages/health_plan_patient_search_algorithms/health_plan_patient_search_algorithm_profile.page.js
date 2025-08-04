import React, { Component } from 'react'
import { Card, CardBody, CardTitle, Col, Container, Row } from 'reactstrap'
import { healthPlanPatientSearchAlgorithmHelper, valueHelper } from "@aprexis/aprexis-api-utility"
import { AprexisList, Spinner } from '../../shared/index.js'
import { displayHelper, listHelper } from '../../../helpers/index.js'
import { HealthPlanPatientSearchAlgorithmProfilePageViewModel } from "../../view_models/pages/health_plan_patient_search_algorithms/index.js"

const headings = [
  {
    name: "Run",
    field: "batch",
    method: "batch"
  }
]

const PatientSearchAlgorithmProfile = ({ patientSearchAlgorithm, pathEntries }) => {
  return (
    <Col className="col-sm d-flex">
      <Card className="card flex-fill">
        <CardTitle>
          <h3>Configuration</h3>
        </CardTitle>

        <CardBody>
          {displayHealthPlan()}
          {displayHelper.display('Algorithm Type', healthPlanPatientSearchAlgorithmHelper.type(patientSearchAlgorithm))}
        </CardBody>
      </Card>
    </Col>
  )

  function displayHealthPlan() {
    if (valueHelper.isValue(pathEntries['health-plans'])) {
      return
    }

    return displayHelper.display("Health Plan", healthPlanPatientSearchAlgorithmHelper.healthPlanName(patientSearchAlgorithm))
  }
}

const PatientSearchAlgorithmBatches = ({ gotoPatientSearchAlgorithmBatchProfile, patientSearchAlgorithm, pathEntries }) => {
  let batches = healthPlanPatientSearchAlgorithmHelper.batches(patientSearchAlgorithm)
  if (!valueHelper.isValue(batches)) {
    batches = []
  }

  return (
    <Col className="col-sm d-flex">
      <Card className="card flex-fill">
        <CardTitle>
          <h3>Batches</h3>
        </CardTitle>

        <CardBody>
          <AprexisList
            generateTableHeadings={generateTableHeadings}
            generateTableRow={generateTableRow}
            list={batches}
            listLabel={'Run'}
            listPluralLabel={'Runs'}
          />
        </CardBody>
      </Card>
    </Col>
  )

  function generateTableHeadings() {
    return listHelper.listHeader(
      {
        headings,
        listName: "batches",
        pathEntries
      }
    )
  }

  function generateTableRow(patientSearchAlgorithmBatch) {
    return listHelper.listRow(
      {
        gotoTableItemProfile: gotoPatientSearchAlgorithmBatchProfile,
        headings,
        helper: {
          canDelete: () => { return false },
          canEdit: () => { return false },
          batch: (patientSearchAlgorithmBatch) => { return patientSearchAlgorithmBatch }
        },
        modelName: 'healthPlanPatientSearchAlgorithmBatch',
        pathEntries,
        tableItem: patientSearchAlgorithmBatch
      }
    )
  }
}

const PatientSearchAlgorithmDisplay = ({ gotoPatientSearchAlgorithmBatchProfile, patientSearchAlgorithm, pathEntries }) => {
  if (!valueHelper.isValue(patientSearchAlgorithm)) {
    return (<Spinner showAtStart={true} />)
  }

  return (
    <React.Fragment>
      <Row>
        <PatientSearchAlgorithmProfile patientSearchAlgorithm={patientSearchAlgorithm} pathEntries={pathEntries} />
      </Row>

      <Row>
        <PatientSearchAlgorithmBatches
          gotoPatientSearchAlgorithmBatchProfile={gotoPatientSearchAlgorithmBatchProfile}
          patientSearchAlgorithm={patientSearchAlgorithm}
          pathEntries={pathEntries}
        />
      </Row>
    </React.Fragment>
  )
}

class HealthPlanPatientSearchAlgorithmProfilePage extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new HealthPlanPatientSearchAlgorithmProfilePageViewModel(
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
    const { healthPlanPatientSearchAlgorithm } = this.state
    const pathEntries = this.vm.pathEntries()

    return (
      <Container>
        <Col>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 mb-3">
            <h1>{healthPlanPatientSearchAlgorithmHelper.name(healthPlanPatientSearchAlgorithm)}</h1>
          </div>

          <PatientSearchAlgorithmDisplay
            gotoPatientSearchAlgorithmBatchProfile={this.vm.gotoPatientSearchAlgorithmBatchProfile}
            patientSearchAlgorithm={healthPlanPatientSearchAlgorithm}
            pathEntries={pathEntries}
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

export { HealthPlanPatientSearchAlgorithmProfilePage }
