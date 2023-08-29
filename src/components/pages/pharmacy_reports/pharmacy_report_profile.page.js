import React, { Component } from 'react'
import { Card, CardBody, CardTitle, Col, Container, Row } from 'reactstrap'
import { Spinner } from '../../shared'
import { PharmacyReportProfilePageViewModel } from '../../view_models/pages/pharmacy_reports'
import { dateHelper, pharmacyReportHelper, valueHelper } from '@aprexis/aprexis-api-utility'
import { displayHelper } from '../../../helpers'

const PharmacyReportConfiguration = ({ pharmacyReport }) => {
  return (
    <Col className="col-sm d-flex">
      <Card className="card flex-fill">
        <CardTitle>
          <h3>Configuration</h3>
        </CardTitle>

        <CardBody>
          {displayHelper.dateTimeDisplay("Created At", pharmacyReportHelper.createdAt(pharmacyReport))}
          {displayHelper.dateTimeDisplay("Updated At", pharmacyReportHelper.updatedAt(pharmacyReport))}
        </CardBody>
      </Card>
    </Col>
  )
}

const PharmacyReport = ({ pharmacyReport }) => {
  return (
    <Col className="col-sm d-flex">
      <Card className="card flex-fill">
        <CardTitle>
          <h3>Report</h3>
        </CardTitle>

        <CardBody>
          {displayHelper.display("# CMR/A", pharmacyReportHelper.cmr(pharmacyReport))}
          {displayHelper.display("# CMR/A Completed", pharmacyReportHelper.cmrCompleted(pharmacyReport))}
          {displayHelper.display("# CMR/A Closed", pharmacyReportHelper.cmrClosed(pharmacyReport))}
          {displayHelper.display("# CMR/A Follow Ups", pharmacyReportHelper.cmrFollowUp(pharmacyReport))}
          {displayHelper.display("# CMR/A Follow Ups Completed", pharmacyReportHelper.cmrFollowUpCompleted(pharmacyReport))}
          {displayHelper.display("# CMR/A Follow Ups Closed", pharmacyReportHelper.cmrFollowUpClosed(pharmacyReport))}
          {displayHelper.display("# Clinically Relevant", pharmacyReportHelper.clinicallyRelevant(pharmacyReport))}
          {displayHelper.display("# Clinically Relevant Completed", pharmacyReportHelper.clinicallyRelevantCompleted(pharmacyReport))}
          {displayHelper.display("# Clinically Relevant Closed", pharmacyReportHelper.clinicallyRelevantClosed(pharmacyReport))}
          {displayHelper.display("# Cost Effectiveness", pharmacyReportHelper.costEffectiveness(pharmacyReport))}
          {displayHelper.display("# Cost Effectiveness Completed", pharmacyReportHelper.costEffectivenessCompleted(pharmacyReport))}
          {displayHelper.display("# Cost Effectiveness Closed", pharmacyReportHelper.costEffectivenessClosed(pharmacyReport))}
        </CardBody>
      </Card>
    </Col>
  )
}

const PharmacyReportDisplay = ({ pharmacyReport }) => {
  if (!valueHelper.isValue(pharmacyReport)) {
    return (<Spinner showAtStart={true} />)
  }

  return (
    <React.Fragment>
      <Row>
        <PharmacyReportConfiguration pharmacyReport={pharmacyReport} />
      </Row>

      <Row>
        <PharmacyReport pharmacyReport={pharmacyReport} />
      </Row>
    </React.Fragment>
  )
}

class PharmacyReportProfilePage extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new PharmacyReportProfilePageViewModel(
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
    const { pharmacyReport } = this.state

    return (
      <Container>
        <Col>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 mb-3">
            <h1>
              Report ending {dateHelper.displayDateTime(pharmacyReportHelper.endDate(pharmacyReport))}&nbsp;
              at {pharmacyReportHelper.pharmacyStoreIdentification(pharmacyReport)}&nbsp;
              for {pharmacyReportHelper.healthPlanName(pharmacyReport)}
            </h1>
          </div>

          <PharmacyReportDisplay currentUser={this.props.currentUser} pharmacyReport={pharmacyReport} />
        </Col>
      </Container>
    )
  }

  shouldComponentUpdate(nextProps, _nextState) {
    this.vm.props = { ...this.vm.props, ...nextProps }
    return true
  }
}

export { PharmacyReportProfilePage }
