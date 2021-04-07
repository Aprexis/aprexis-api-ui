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
          {fieldHelper.booleanDisplay("Importing Patient Data", healthPlan.importing_patient_data)}
          {fieldHelper.booleanDisplay("Importing Claims Data", healthPlan.currently_importing_data)}
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
          {fieldHelper.titleDisplay("Billing Claims Gateway", healthPlan.billing_claims_gateway)}
          {fieldHelper.display("Zirmed Payer Name", healthPlan.zirmed_payer_name_matching)}
          {fieldHelper.booleanDisplay("Save Claim Submission Files", healthPlan.save_claim_submission_files)}
          {fieldHelper.display("Two Seventy Six Mode", healthPlan.two_seventy_six_mode)}
          {fieldHelper.optionDisplay("Segmented Health Plan Uploader", segmentedUploaders, healthPlan.segmented_uploader)}
          {fieldHelper.optionDisplay("Pharmacy Claim Uploader", pharmacyClaimsUploaders, healthPlan.pharmacy_claims_uploader)}
          {fieldHelper.booleanDisplay("Allow Manually Added Patients", healthPlan.allow_manually_added_patients)}
          {fieldHelper.booleanDisplay("Requires Person Number", healthPlan.requires_person_number)}
          {fieldHelper.titleDisplay("Insurance Detail Type", healthPlan.insurance_detail_type)}
          {fieldHelper.booleanDisplay("Requires Explicit Authorization", healthPlan.requires_explicit_authorization)}
          {fieldHelper.booleanDisplay("Show Pharmacy Claims", healthPlan.show_pharmacy_claims)}
          {fieldHelper.booleanDisplay("Generate Completed Interventions Report", healthPlan.generate_completed_interventions_report)}
          {fieldHelper.titleDisplay("CCD Generator", healthPlan.ccd_generator)}
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
          {fieldHelper.display("Notes", healthPlan.notes)}
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
          {fieldHelper.display("Code", healthPlan.code)}
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
    return (<Spinner />)
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
}

export { HealthPlanProfilePage }
