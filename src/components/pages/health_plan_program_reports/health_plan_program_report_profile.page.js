import React, { Component } from 'react'
import { Card, CardBody, CardTitle, Col, Container, Row } from 'reactstrap'
import { Spinner } from '../../shared'
import { HealthPlanProgramReportProfilePageViewModel } from '../../view_models/pages/health_plan_program_reports'
import { healthPlanProgramReportHelper, valueHelper } from '@aprexis/aprexis-api-utility'
import { displayHelper } from '../../../helpers'

const HealthPlanProgramReportConfiguration = ({ healthPlanProgramReport }) => {
  return (
    <Col className="col-sm d-flex">
      <Card className="card flex-fill">
        <CardTitle>
          <h3>Configuration</h3>
        </CardTitle>

        <CardBody>
          {displayHelper.dateTimeDisplay("Created At", healthPlanProgramReportHelper.createdAt(healthPlanProgramReport))}
          {displayHelper.dateTimeDisplay("Updated At", healthPlanProgramReportHelper.updatedAt(healthPlanProgramReport))}
        </CardBody>
      </Card>
    </Col>
  )
}

const HealthPlanProgramReport = ({ healthPlanProgramReport }) => {
  return (
    <Col className="col-sm d-flex">
      <Card className="card flex-fill">
        <CardTitle>
          <h3>Report</h3>
        </CardTitle>

        <CardBody>
          {displayHelper.display("Patients", healthPlanProgramReportHelper.patientCount(healthPlanProgramReport))}
          {displayHelper.display("Males", healthPlanProgramReportHelper.malesCount(healthPlanProgramReport))}
          {displayHelper.display("Females", healthPlanProgramReportHelper.femalesCount(healthPlanProgramReport))}
          {displayHelper.display("Minimum Age", healthPlanProgramReportHelper.ageMin(healthPlanProgramReport))}
          {displayHelper.display("Average Age", healthPlanProgramReportHelper.ageAverage(healthPlanProgramReport))}
          {displayHelper.display("Maximum Age", healthPlanProgramReportHelper.ageMax(healthPlanProgramReport))}
          {displayHelper.display("Consults Scheduled", healthPlanProgramReportHelper.consultsScheduled(healthPlanProgramReport))}
          {displayHelper.display("Completed Interventions", healthPlanProgramReportHelper.completedInterventions(healthPlanProgramReport))}
          {displayHelper.display("RX Changes Approved", healthPlanProgramReportHelper.rxChangesApproved(healthPlanProgramReport))}
          {displayHelper.display("RX Changes Approved With Modification", healthPlanProgramReportHelper.rxChangesApprovedWithModification(healthPlanProgramReport))}
          {displayHelper.display("RX Changes Rejected", healthPlanProgramReportHelper.rxChangesRejected(healthPlanProgramReport))}
          {displayHelper.display("RX Recommendations Made", healthPlanProgramReportHelper.rxRecommendationsMade(healthPlanProgramReport))}
          {displayHelper.display("Average Recommendations Per Member", healthPlanProgramReportHelper.averageRecommendationsPerMember(healthPlanProgramReport))}
          {displayHelper.display("RX Follow Ups Made", healthPlanProgramReportHelper.rxFollowUpsMade(healthPlanProgramReport))}
          {displayHelper.display("Average Follow Ups Per Member", healthPlanProgramReportHelper.averageFollowUpsPerMember(healthPlanProgramReport))}
          {displayHelper.display("Immunizations Given", healthPlanProgramReportHelper.immunizationsGiven(healthPlanProgramReport))}
          {displayHelper.display("Device Instructions Given", healthPlanProgramReportHelper.deviceInstructionsGiven(healthPlanProgramReport))}
          {displayHelper.display("Patients Reporting Satisfaction", healthPlanProgramReportHelper.satisfactionPatientCount(healthPlanProgramReport))}
          {displayHelper.display("Patient Satisfaction Score", healthPlanProgramReportHelper.patientSatisfactionScore(healthPlanProgramReport))}
          {displayHelper.display("Average Patient Satisfaction", healthPlanProgramReportHelper.averagePatientSatisfaction(healthPlanProgramReport))}
        </CardBody>
      </Card>
    </Col>
  )
}

const HealthPlanProgramReportDisplay = ({ healthPlanProgramReport }) => {
  if (!valueHelper.isValue(healthPlanProgramReport)) {
    return (<Spinner showAtStart={true} />)
  }

  return (
    <React.Fragment>
      <Row>
        <HealthPlanProgramReportConfiguration healthPlanProgramReport={healthPlanProgramReport} />
      </Row>

      <Row>
        <HealthPlanProgramReport healthPlanProgramReport={healthPlanProgramReport} />
      </Row>
    </React.Fragment>
  )
}

class HealthPlanProgramReportProfilePage extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new HealthPlanProgramReportProfilePageViewModel(
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
    const { healthPlanProgramReport } = this.state

    return (
      <Container>
        <Col>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 mb-3">
            <h1>
              Report on {valueHelper.titleize(healthPlanProgramReportHelper.programType(healthPlanProgramReport))}
              &nbsp;for {healthPlanProgramReportHelper.healthPlanName(healthPlanProgramReport)}
            </h1>
          </div>

          <HealthPlanProgramReportDisplay currentUser={this.props.currentUser} healthPlanProgramReport={healthPlanProgramReport} />
        </Col>
      </Container>
    )
  }

  shouldComponentUpdate(nextProps, _nextState) {
    this.vm.props = { ...this.vm.props, ...nextProps }
    return true
  }
}

export { HealthPlanProgramReportProfilePage }
