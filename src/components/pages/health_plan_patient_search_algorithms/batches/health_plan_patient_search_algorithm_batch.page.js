import React, { Component } from 'react'
import { Col, Container } from 'reactstrap'
import { healthPlanPatientSearchAlgorithmBatchHelper } from '@aprexis/aprexis-api-utility'
import { HealthPlanPatientSearchAlgorithmBatchPageViewModel } from '../../../view_models/pages/health_plan_patient_search_algorithms/batches'

class HealthPlanPatientSearchAlgorithmProfilePage extends Component {
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

    return (
      <Container>
        <Col>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 mb-3">
            <h1>
              {healthPlanPatientSearchAlgorithmBatchHelper.patientSearchAlgorithmName(healthPlanPatientSearchAlgorithmBatch)}
              {healthPlanPatientSearchAlgorithmBatchHelper.batch(healthPlanPatientSearchAlgorithmBatch)}
            </h1>
          </div>

          Not implemented yet
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
