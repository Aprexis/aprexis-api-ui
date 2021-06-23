import React, { Component } from 'react'
import { Card, CardBody, CardTitle, Col, Container, Row } from 'reactstrap'
import { Address, Contact, Spinner } from '../../shared'
import { HealthPlanProfilePageViewModel } from '../../view_models/pages/health_plans'
import { fieldHelper, healthPlanHelper, valueHelper } from '../../../helpers'
import { pharmacyClaimsUploaders, segmentedUploaders } from '../../../types'

const HealthPlanActivity = ({ healthPlan }) => {
  return (
    <Col className="col-sm d-flex">
      <Card className="card flex-fill">
        <CardTitle>
          <h3>Activity</h3>
        </CardTitle>

        <CardBody>
          {fieldHelper.booleanDisplay("Importing Patient Data", healthPlanHelper.importingPatientData(healthPlan))}
          {fieldHelper.booleanDisplay("Importing Claims Data", healthPlanHelper.currentlyImportingData(healthPlan))}
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
          {fieldHelper.titleDisplay("Billing Claims Gateway", healthPlanHelper.billingClaimsGateway(healthPlan))}
          {fieldHelper.display("Zirmed Payer Name", healthPlanHelper.zirmedPayerNameMatching(healthPlan))}
          {
            fieldHelper.booleanDisplay(
              "Save Claim Submission Files",
              healthPlanHelper.saveClaimSubmissionFiles(healthPlan)
            )
          }
          {fieldHelper.display("Two Seventy Six Mode", healthPlanHelper.twoSeventySixMode(healthPlan))}
          {
            fieldHelper.optionDisplay(
              "Segmented Health Plan Uploader",
              segmentedUploaders,
              healthPlanHelper.segmentedUploader(healthPlan)
            )
          }
          {
            fieldHelper.optionDisplay(
              "Pharmacy Claim Uploader",
              pharmacyClaimsUploaders,
              healthPlanHelper.pharmacyClaimsUploader(healthPlan)
            )
          }
          {
            fieldHelper.booleanDisplay(
              "Allow Manually Added Patients",
              healthPlanHelper.allowManuallyAddedPatients(healthPlan)
            )
          }
          {fieldHelper.booleanDisplay("Requires Person Number", healthPlanHelper.requiresPersonNumber(healthPlan))}
          {fieldHelper.titleDisplay("Insurance Detail Type", healthPlanHelper.insuranceDetailType(healthPlan))}
          {
            fieldHelper.booleanDisplay(
              "Requires Explicit Authorization",
              healthPlanHelper.requiresExplicitAuthorization(healthPlan)
            )
          }
          {fieldHelper.booleanDisplay("Show Pharmacy Claims", healthPlanHelper.showPharmacyClaims(healthPlan))}
          {
            fieldHelper.booleanDisplay(
              "Generate Completed Interventions Report",
              healthPlanHelper.generateCompletedInterventionsReport(healthPlan)
            )
          }
          {fieldHelper.titleDisplay("CCD Generator", healthPlanHelper.ccdGenerator(healthPlan))}
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
          {fieldHelper.display("Notes", healthPlanHelper.notes(healthPlan))}
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
          {fieldHelper.display("Code", healthPlanHelper.code(healthPlan))}
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

  shouldComponentUpdate(nextProps, nextState) {
    this.vm.props = { ...this.vm.props, ...nextProps }
    return true
  }
}

export { HealthPlanProfilePage }
