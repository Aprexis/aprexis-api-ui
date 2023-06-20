import React, { Component } from 'react'
import { Col, Container } from 'reactstrap'
import { healthPlanPatientSearchAlgorithmHelper } from "@aprexis/aprexis-api-utility"
import { HealthPlanPatientSearchAlgorithmProfilePageViewModel } from "../../view_models/pages/health_plan_patient_search_algorithms"

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

    return (
      <Container>
        <Col>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 mb-3">
            <h1>{healthPlanPatientSearchAlgorithmHelper.name(healthPlanPatientSearchAlgorithm)}</h1>
          </div>

          <div>Not implemented yet</div>
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
