import React, { Component } from 'react'
import { Card, CardBody, CardTitle, Col, Container, Row } from 'reactstrap'
import { healthPlanPatientSearchStageHelper, healthPlanPatientSearchAlgorithmBatchHelper, valueHelper } from '@aprexis/aprexis-api-utility'
import { AprexisList, Spinner } from '../../../shared'
import { listHelper } from '../../../../helpers'
import { HealthPlanPatientSearchAlgorithmBatchPageViewModel } from '../../../view_models/pages/health_plan_patient_search_algorithms/batches'

const headings = [
  {
    name: "Stage",
    field: "stage",
    method: "name"
  },
  {
    name: "Yes Patients",
    field: "yes_patients_count",
    method: "yesPatientsCount"
  },
  {
    name: "Yes Program",
    field: "yes_program_name",
    method: "yesProgramName"
  },
  {
    name: "No Patients",
    field: "no_patients_count",
    method: "noPatientsCount"
  },
  {
    name: "No Program",
    field: "no_program_name",
    method: "noProgramName"
  }
]

const PatientSearchStages = ({ patientSearchAlgorithmBatch, pathEntries }) => {
  const stages = healthPlanPatientSearchAlgorithmBatchHelper.patientSearchStages(patientSearchAlgorithmBatch)

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
            list={stages}
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
        listName: "patientSearchStages",
        pathEntries
      }
    )
  }

  function generateTableRow(patientSearchStage) {
    return listHelper.listRow(
      {
        headings,
        helper: healthPlanPatientSearchStageHelper,
        modelName: 'healthPlanPatientSearchStage',
        pathEntries,
        tableItem: patientSearchStage
      }
    )
  }
}

const PatientSearchAlgorithmBatchDisplay = ({ patientSearchAlgorithmBatch, pathEntries }) => {
  if (!valueHelper.isValue(patientSearchAlgorithmBatch)) {
    return (<Spinner showAtStart={true} />)
  }

  return (
    <React.Fragment>
      <Row>
        <PatientSearchStages
          patientSearchAlgorithmBatch={patientSearchAlgorithmBatch}
          pathEntries={pathEntries}
        />
      </Row>
    </React.Fragment>
  )
}

class HealthPlanPatientSearchAlgorithmBatchProfilePage extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new HealthPlanPatientSearchAlgorithmBatchPageViewModel(
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
    const { healthPlanPatientSearchAlgorithmBatch } = this.state
    const pathEntries = this.vm.pathEntries()

    return (
      <Container>
        <Col>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 mb-3">
            <h1>
              {healthPlanPatientSearchAlgorithmBatchHelper.patientSearchAlgorithmName(healthPlanPatientSearchAlgorithmBatch)}
              {healthPlanPatientSearchAlgorithmBatchHelper.batch(healthPlanPatientSearchAlgorithmBatch)}
            </h1>
          </div>

          <PatientSearchAlgorithmBatchDisplay
            patientSearchAlgorithmBatch={healthPlanPatientSearchAlgorithmBatch}
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

export { HealthPlanPatientSearchAlgorithmBatchProfilePage }
