import React, { Component } from 'react'
import { Card, CardBody, CardTitle, Col, Container, Row } from 'reactstrap'
import { Address, Contact, Spinner } from '../../shared'
import { HealthPlanProfilePageViewModel } from '../../view_models/pages/health_plans'
import { healthPlanHelper, valueHelper, pharmacyClaimsUploaders, segmentedUploaders } from '@aprexis/aprexis-api-utility'
import { displayHelper } from '../../../helpers'

const HealthPlanActivity = ({ healthPlan }) => {
  return (
    <Col className="col-sm d-flex">
      <Card className="card flex-fill">
        <CardTitle>
          <h3>Activity</h3>
        </CardTitle>

        <CardBody>
          {displayHelper.booleanDisplay("Importing Patient Data", healthPlanHelper.importingPatientData(healthPlan))}
          {displayHelper.booleanDisplay("Importing Claims Data", healthPlanHelper.currentlyImportingData(healthPlan))}
        </CardBody>
      </Card>
    </Col>
  )
}

const HealthPlanConfiguration = ({ healthPlan }) => {
  return (
    <Col className="col-sm d-flex">
      <Card className="card flex-fill">
        <CardTitle>
          <h3>Configuration</h3>
        </CardTitle>

        <CardBody>
          {displayHelper.titleDisplay("Billing Claims Gateway", healthPlanHelper.billingClaimsGateway(healthPlan))}
          {displayHelper.display("Zirmed Payer Name", healthPlanHelper.zirmedPayerNameMatching(healthPlan))}
          {
            displayHelper.booleanDisplay(
              "Save Claim Submission Files",
              healthPlanHelper.saveClaimSubmissionFiles(healthPlan)
            )
          }
          {displayHelper.display("Two Seventy Six Mode", healthPlanHelper.twoSeventySixMode(healthPlan))}
          {
            displayHelper.optionDisplay(
              "Segmented Health Plan Uploader",
              segmentedUploaders,
              healthPlanHelper.segmentedUploader(healthPlan)
            )
          }
          {
            displayHelper.optionDisplay(
              "Pharmacy Claim Uploader",
              pharmacyClaimsUploaders,
              healthPlanHelper.pharmacyClaimsUploader(healthPlan)
            )
          }
          {
            displayHelper.booleanDisplay(
              "Allow Manually Added Patients",
              healthPlanHelper.allowManuallyAddedPatients(healthPlan)
            )
          }
          {displayHelper.booleanDisplay("Requires Person Number", healthPlanHelper.requiresPersonNumber(healthPlan))}
          {displayHelper.titleDisplay("Insurance Detail Type", healthPlanHelper.insuranceDetailType(healthPlan))}
          {
            displayHelper.booleanDisplay(
              "Requires Explicit Authorization",
              healthPlanHelper.requiresExplicitAuthorization(healthPlan)
            )
          }
          {displayHelper.booleanDisplay("Show Pharmacy Claims", healthPlanHelper.showPharmacyClaims(healthPlan))}
          {
            displayHelper.booleanDisplay(
              "Generate Completed Interventions Report",
              healthPlanHelper.generateCompletedInterventionsReport(healthPlan)
            )
          }
          {displayHelper.titleDisplay("CCD Generator", healthPlanHelper.ccdGenerator(healthPlan))}
          {displayHelper.booleanDisplay("Reminders", healthPlanHelper.enableReminders(healthPlan))}
        </CardBody>
      </Card>
    </Col>
  )
}

const HealthPlanInvoice = ({ healthPlan }) => {
  return (
    <Col className="col-sm d-flex">
      <Card className="card flex-fill">
        <CardTitle>
          <h3>Invoice</h3>
        </CardTitle>

        <CardBody>
          <Address addressable={healthPlan} prefix='invoice' />
          <Contact contactable={healthPlan} prefix='invoice' />
        </CardBody>
      </Card>
    </Col>
  )
}

const HealthPlanNotes = ({ healthPlan }) => {
  return (
    <Col className="col-sm d-flex">
      <Card className="card flex-fill">
        <CardTitle>
          <h3>Contract Instructions</h3>
        </CardTitle>

        <CardBody>
          {displayHelper.display("Notes", healthPlanHelper.notes(healthPlan))}
        </CardBody>
      </Card>
    </Col>
  )
}

const HealthPlanProfile = ({ healthPlan }) => {
  return (
    <Col className="col-sm d-flex">
      <Card className="card flex-fill">
        <CardTitle>
          <h3>Profile</h3>
        </CardTitle>

        <CardBody>
          {displayHelper.display("Code", healthPlanHelper.code(healthPlan))}
          <Address addressable={healthPlan} />
          <Contact contactable={healthPlan} />
        </CardBody>
      </Card>
    </Col>
  )
}

const HealthPlanConfigurationDisplay = ({ currentUser, healthPlan }) => {
  if (!healthPlanHelper.canConfigure(currentUser)) {
    return (<React.Fragment />)
  }

  return (
    <React.Fragment>
      <Row>
        <HealthPlanNotes healthPlan={healthPlan} />
      </Row>

      <Row>
        <HealthPlanConfiguration healthPlan={healthPlan} />
        <HealthPlanActivity healthPlan={healthPlan} />
      </Row>
    </React.Fragment>
  )
}

const HealthPlanDisplay = ({ currentUser, healthPlan }) => {
  if (!valueHelper.isValue(healthPlan)) {
    return (<Spinner showAtStart={true} />)
  }

  return (
    <React.Fragment>
      <Row>
        <HealthPlanProfile healthPlan={healthPlan} />
        <HealthPlanInvoice healthPLan={healthPlan} />
      </Row>

      <HealthPlanConfigurationDisplay currentUser={currentUser} healthPlan={healthPlan} />
    </React.Fragment>
  )
}

class HealthPlanProfilePage extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new HealthPlanProfilePageViewModel(
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
    const { healthPlan } = this.state

    return (
      <Container>
        <Col>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 mb-3">
            <h1>{healthPlanHelper.name(healthPlan)}</h1>
          </div>

          <HealthPlanDisplay currentUser={this.props.currentUser} healthPlan={healthPlan} />
        </Col>
      </Container>
    )
  }

  shouldComponentUpdate(nextProps, _nextState) {
    this.vm.props = { ...this.vm.props, ...nextProps }
    return true
  }
}

export { HealthPlanProfilePage }
