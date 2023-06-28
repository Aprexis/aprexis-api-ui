import React, { Component } from 'react'
import { Card, CardBody, CardTitle, Col, Container, Row } from 'reactstrap'
import { healthPlanPatientSearchAlgorithmHelper, valueHelper } from "@aprexis/aprexis-api-utility"
import { Spinner } from '../../shared'
import { displayHelper } from '../../../helpers'
import { HealthPlanPatientSearchAlgorithmProfilePageViewModel } from "../../view_models/pages/health_plan_patient_search_algorithms"

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

const PatientSearchAlgorithmBatch = ({ batch }) => {
  return displayHelper.dateTimeDisplay('Run', batch)
}

const PatientSearchAlgorithmBatches = ({ patientSearchAlgorithm }) => {
  const batches = healthPlanPatientSearchAlgorithmHelper.batches(patientSearchAlgorithm).map(
    (batch, idx) => {
      return (<PatientSearchAlgorithmBatch key={`patient-search-algorithm-batch-${idx}`} batch={batch} />)
    }
  )

  return (
    <Col className="col-sm d-flex">
      <Card className="card flex-fill">
        <CardTitle>
          <h3>Batches</h3>
        </CardTitle>

        <CardBody>
          {batches}
        </CardBody>
      </Card>
    </Col>
  )
}

const PatientSearchAlgorithmDisplay = ({ patientSearchAlgorithm, pathEntries }) => {
  if (!valueHelper.isValue(patientSearchAlgorithm)) {
    return (<Spinner showAtStart={true} />)
  }

  return (
    <React.Fragment>
      <Row>
        <PatientSearchAlgorithmProfile patientSearchAlgorithm={patientSearchAlgorithm} pathEntries={pathEntries} />
      </Row>

      <Row>
        <PatientSearchAlgorithmBatches patientSearchAlgorithm={patientSearchAlgorithm} />
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

          <PatientSearchAlgorithmDisplay patientSearchAlgorithm={healthPlanPatientSearchAlgorithm} pathEntries={pathEntries} />
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
