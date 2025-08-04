import React, { Component } from 'react'
import { Card, CardBody, CardTitle, Col, Container, Row } from 'reactstrap'
import { Spinner } from '../../shared/index.js'
import { PharmacyStoreProgramReportProfilePageViewModel } from '../../view_models/pages/pharmacy_store_program_reports/index.js'
import { pharmacyStoreProgramReportHelper, valueHelper } from '@aprexis/aprexis-api-utility'
import { displayHelper } from '../../../helpers/index.js'

const PharmacyStoreProgramReportConfiguration = ({ pharmacyStoreProgramReport }) => {
  return (
    <Col className="col-sm d-flex">
      <Card className="card flex-fill">
        <CardTitle>
          <h3>Configuration</h3>
        </CardTitle>

        <CardBody>
          {displayHelper.dateTimeDisplay("Created At", pharmacyStoreProgramReportHelper.createdAt(pharmacyStoreProgramReport))}
          {displayHelper.dateTimeDisplay("Updated At", pharmacyStoreProgramReportHelper.updatedAt(pharmacyStoreProgramReport))}
        </CardBody>
      </Card>
    </Col>
  )
}

const PharmacyStoreProgramReport = ({ pharmacyStoreProgramReport }) => {
  return (
    <Col className="col-sm d-flex">
      <Card className="card flex-fill">
        <CardTitle>
          <h3>Report</h3>
        </CardTitle>

        <CardBody>
          {displayHelper.display("Patients", pharmacyStoreProgramReportHelper.patientCount(pharmacyStoreProgramReport))}
          {displayHelper.display("Males", pharmacyStoreProgramReportHelper.malesCount(pharmacyStoreProgramReport))}
          {displayHelper.display("Females", pharmacyStoreProgramReportHelper.femalesCount(pharmacyStoreProgramReport))}
          {displayHelper.display("Minimum Age", pharmacyStoreProgramReportHelper.ageMin(pharmacyStoreProgramReport))}
          {displayHelper.display("Average Age", pharmacyStoreProgramReportHelper.ageAverage(pharmacyStoreProgramReport))}
          {displayHelper.display("Maximum Age", pharmacyStoreProgramReportHelper.ageMax(pharmacyStoreProgramReport))}
          {displayHelper.display("Consults Scheduled", pharmacyStoreProgramReportHelper.consultsScheduled(pharmacyStoreProgramReport))}
          {displayHelper.display("Active Interventions", pharmacyStoreProgramReportHelper.activeInterventions(pharmacyStoreProgramReport))}
          {displayHelper.display("Completed Interventions", pharmacyStoreProgramReportHelper.completedInterventions(pharmacyStoreProgramReport))}
          {displayHelper.display("Inactive Interventions", pharmacyStoreProgramReportHelper.inactiveInterventions(pharmacyStoreProgramReport))}
          {displayHelper.display("RX Changes Approved", pharmacyStoreProgramReportHelper.rxChangesApproved(pharmacyStoreProgramReport))}
          {displayHelper.display("RX Changes Approved With Modification", pharmacyStoreProgramReportHelper.rxChangesApprovedWithModification(pharmacyStoreProgramReport))}
          {displayHelper.display("RX Changes Rejected", pharmacyStoreProgramReportHelper.rxChangesRejected(pharmacyStoreProgramReport))}
          {displayHelper.display("RX Recommendations Made", pharmacyStoreProgramReportHelper.rxRecommendationsMade(pharmacyStoreProgramReport))}
          {displayHelper.display("Average Recommendations Per Member", pharmacyStoreProgramReportHelper.averageRecommendationsPerMember(pharmacyStoreProgramReport))}
          {displayHelper.display("RX Follow Ups Made", pharmacyStoreProgramReportHelper.rxFollowUpsMade(pharmacyStoreProgramReport))}
          {displayHelper.display("Average Follow Ups Per Member", pharmacyStoreProgramReportHelper.averageFollowUpsPerMember(pharmacyStoreProgramReport))}
          {displayHelper.display("Immunizations Given", pharmacyStoreProgramReportHelper.immunizationsGiven(pharmacyStoreProgramReport))}
          {displayHelper.display("Device Instructions Given", pharmacyStoreProgramReportHelper.deviceInstructionsGiven(pharmacyStoreProgramReport))}
          {displayHelper.display("Patients Reporting Satisfaction", pharmacyStoreProgramReportHelper.satisfactionPatientCount(pharmacyStoreProgramReport))}
          {displayHelper.display("Patient Satisfaction Score", pharmacyStoreProgramReportHelper.patientSatisfactionScore(pharmacyStoreProgramReport))}
          {displayHelper.display("Average Patient Satisfaction", pharmacyStoreProgramReportHelper.averagePatientSatisfaction(pharmacyStoreProgramReport))}
        </CardBody>
      </Card>
    </Col>
  )
}

const PharmacyStoreProgramReportDisplay = ({ pharmacyStoreProgramReport }) => {
  if (!valueHelper.isValue(pharmacyStoreProgramReport)) {
    return (<Spinner showAtStart={true} />)
  }

  return (
    <React.Fragment>
      <Row>
        <PharmacyStoreProgramReportConfiguration pharmacyStoreProgramReport={pharmacyStoreProgramReport} />
      </Row>

      <Row>
        <PharmacyStoreProgramReport pharmacyStoreProgramReport={pharmacyStoreProgramReport} />
      </Row>
    </React.Fragment>
  )
}

class PharmacyStoreProgramReportProfilePage extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new PharmacyStoreProgramReportProfilePageViewModel(
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
    const { pharmacyStoreProgramReport } = this.state

    return (
      <Container>
        <Col>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 mb-3">
            <h1>
              {pharmacyStoreProgramReportHelper.healthPlanName(pharmacyStoreProgramReport)}&nbsp;
              {valueHelper.titleize(pharmacyStoreProgramReportHelper.type(pharmacyStoreProgramReport))}
              &nbsp;for {pharmacyStoreProgramReportHelper.pharmacyStoreIdentification(pharmacyStoreProgramReport)}
            </h1>
          </div>

          <PharmacyStoreProgramReportDisplay currentUser={this.props.currentUser} pharmacyStoreProgramReport={pharmacyStoreProgramReport} />
        </Col>
      </Container>
    )
  }

  shouldComponentUpdate(nextProps, _nextState) {
    this.vm.props = { ...this.vm.props, ...nextProps }
    return true
  }
}

export { PharmacyStoreProgramReportProfilePage }
