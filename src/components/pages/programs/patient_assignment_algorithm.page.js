import React, { Component } from 'react'
import { Container, Col } from 'reactstrap'
import { patientAssignmentAlgorithmHelper, valueHelper } from '@aprexis/aprexis-api-utility'
import { Spinner, PatientAssignmentAlgorithmProfile } from '../../shared'
import { PatientAssignmentAlgorithmPageViewModel } from '../../view_models/pages/programs'

class PatientAssignmentAlgorithmPage extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new PatientAssignmentAlgorithmPageViewModel(
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
    const { patientAssignmentAlgorithm } = this.state

    return (
      <Container>
        <Col>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 mb-3">
            <h1>Patient assignment algorithm for {patientAssignmentAlgorithmHelper.programName(patientAssignmentAlgorithm)}</h1>
          </div>

          {
            !valueHelper.isValue(patientAssignmentAlgorithm) &&
            <Spinner />
          }

          {
            valueHelper.isValue(patientAssignmentAlgorithm) &&
            <PatientAssignmentAlgorithmProfile patientAssignmentAlgorithm={patientAssignmentAlgorithm} />
          }
        </Col>
      </Container>
    )
  }

  shouldComponentUpdate(nextProps, _nextState) {
    this.vm.props = { ...this.vm.props, ...nextProps }
    return true
  }
}

export { PatientAssignmentAlgorithmPage }
