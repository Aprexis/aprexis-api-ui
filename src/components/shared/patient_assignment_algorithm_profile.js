import React, { Component } from 'react'
import { Card, CardBody, CardTitle, Col, Row } from "reactstrap"
import { patientAssignmentAlgorithmHelper, valueHelper } from '@aprexis/aprexis-api-utility'
import { displayHelper } from '../../helpers/index.js'

const PatientAssignmentAlgorithm = ({ patientAssignmentAlgorithm }) => {
  return (
    <Col className="col-sm d-flex">
      <Card className="card flex-fill">
        <CardTitle>
          <h3>
            Configuration
          </h3>
        </CardTitle>

        <CardBody>
          {displayHelper.display("Type", valueHelper.titleize(patientAssignmentAlgorithmHelper.type(patientAssignmentAlgorithm)))}
          {displayHelper.notInContextDisplay("health-plans", "Health Plan", patientAssignmentAlgorithmHelper.healthPlanName(patientAssignmentAlgorithm))}
          {displayHelper.notInContextDisplay("programs", "Program", patientAssignmentAlgorithmHelper.programName(patientAssignmentAlgorithm))}
        </CardBody>
      </Card>
    </Col>
  )
}

class PatientAssignmentAlgorithmProfile extends Component {
  render() {
    const { patientAssignmentAlgorithm } = this.props

    return (
      <React.Fragment>
        <Row>
          <PatientAssignmentAlgorithm patientAssignmentAlgorithm={patientAssignmentAlgorithm} />
        </Row>
      </React.Fragment>
    )
  }
}

export { PatientAssignmentAlgorithmProfile }
