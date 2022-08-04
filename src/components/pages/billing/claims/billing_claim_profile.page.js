import React, { Component } from 'react'
import { Card, CardBody, CardTitle, Col, Container, Row } from 'reactstrap'
import { EditButton, Spinner } from "../../../shared"
import { BillingClaimProfilePageViewModel } from "../../../view_models/pages/billing/claims"
import { dateHelper, valueHelper, billingClaimHelper, billingClaimServiceHelper } from "@aprexis/aprexis-api-utility"

const BillingClaimCharges = ({ currentUser, billingClaim }) => {
  return (
    <Col className="col-sm d-flex">
      <Card className="card flex-fill">
        <CardTitle>
          <h3>
            Charges
          </h3>
        </CardTitle>

        <CardBody>
          <Row>
            <Col>
              {billingClaimHelper.claimProgramName(billingClaim)} Service Units
            </Col>
            <Col>
              Total Claim Amount: ${billingClaimHelper.totalCharge(billingClaim)}
            </Col>
          </Row>

          <div className="table-responsive-sm scrollable">
            <table className="table-sm table-striped table">
              <thead>
                <tr>
                  <th>Date of Service</th>
                  <th>Place of Service</th>
                  <th>NPI</th>
                  <th>Program</th>
                  <th>Diagnosis Code</th>
                  <th>CPT Code</th>
                  <th>Modifier</th>
                  <th>Units</th>
                  <th>Charge</th>
                </tr>
              </thead>

              <tbody>{claimChargesList(currentUser, billingClaim)}</tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    </Col>
  )

  function claimChargesList(_currentUser, billingClaim) {
    const claimServices = billingClaimHelper.claimServices(billingClaim)
    if (!valueHelper.isValue(claimServices) || claimServices.length === 0) {
      return (<tr><td colSpan="9">No claim services.</td></tr>)
    }

    return claimServices.map((claimService, idx) => {
      return (
        <tr key={`billing-claim-service-${idx}`}>
          <td>{billingClaimServiceHelper.displayDateOfServiceStart(claimService)}</td>
          <td>{billingClaimServiceHelper.placeOfServiceName(claimService)}</td>
          <td>{billingClaimServiceHelper.npi(claimService)}</td>
          <td>{billingClaimHelper.claimProgramName(billingClaim)}</td>
          <td>{billingClaimServiceHelper.diagnosis(claimService)}</td>
          <td>{billingClaimServiceHelper.cptCode(claimService)}</td>
          <td>{billingClaimServiceHelper.userMod(claimService)}</td>
          <td>{billingClaimServiceHelper.unit(claimService)}</td>
          <td>${billingClaimServiceHelper.charge(claimService)}</td>
        </tr>
      )
    }
    )
  }
}

const BillingClaimProfile = ({ currentUser, onEdit, billingClaim }) => {
  return (
    <Col className="col-sm d-flex">
      <Card className="card flex-fill">
        <CardTitle>
          <h3>
            Profile
            {
              billingClaimHelper.canEdit(currentUser, billingClaim) &&
              <EditButton onEdit={(event) => { onEdit(billingClaim) }} />
            }
          </h3>
        </CardTitle>

        <CardBody>
          <div className="table-responsive-sm scrollable">
            <table className="table-sm table-striped table">
              <thead>
                <tr>
                  <th>Payer</th>
                  <th>Billing Provider</th>
                  <th>Pharmacy Location</th>
                  <th>Patient</th>
                  <th>Pharmacist Name</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{billingClaimHelper.claimPayerName(billingClaim)}</td>
                  <td>{claimProvider(billingClaim)}</td>
                  <td>{claimFacility(billingClaim)}</td>
                  <td>{claimPatient(billingClaim)}</td>
                  <td>{billingClaimHelper.claimPharmacistName(billingClaim)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    </Col>
  )

  function claimFacility(billingClaim) {
    return (
      <React.Fragment>
        {billingClaimHelper.claimFacilityName(billingClaim)}<br />
        {billingClaimHelper.claimFacilityFullAddress(billingClaim)}<br />
        NPI: {billingClaimHelper.claimFacilityNpi(billingClaim)}
      </React.Fragment >
    )
  }

  function claimPatient(billingClaim) {
    return (
      <React.Fragment>
        {billingClaimHelper.claimPatientName(billingClaim)}<br />
        DOB: {billingClaimHelper.claimPatientDateOfBirth(billingClaim)}<br />
        Address: {billingClaimHelper.claimPatientFullAddress(billingClaim)}<br />
        {phone(billingClaim)}
        Health Plan #: {billingClaimHelper.displayClaimPatientHealthPlanNumber(billingClaim)}
      </React.Fragment >
    )

    function phone(billingClaim) {
      const patientPhone = billingClaimHelper.claimPatientPhone(billingClaim)
      if (!valueHelper.isStringValue(patientPhone)) {
        return
      }

      return (<React.Fragment>Phone: {patientPhone}<br /></React.Fragment>)
    }
  }

  function claimProvider(billingClaim) {
    const name = billingClaimHelper.claimProviderName(billingClaim)
    const ein = billingClaimHelper.claimProviderEinNumber(billingClaim)

    if (!valueHelper.isStringValue(ein)) {
      return name
    }

    return (
      <React.Fragment>
        {name}<br />
        EIN: {ein}
      </React.Fragment>
    )
  }
}

const BillingClaimDisplay = ({ currentUser, onEdit, billingClaim }) => {
  if (!valueHelper.isValue(billingClaim)) {
    return (<Spinner showAtStart={true} />)
  }

  return (
    <React.Fragment>
      <Row>
        <BillingClaimProfile currentUser={currentUser} onEdit={onEdit} billingClaim={billingClaim} />
      </Row>
      <Row>
        <BillingClaimCharges currentUser={currentUser} billingClaim={billingClaim} />
      </Row>
    </React.Fragment>
  )
}

class BillingClaimProfilePage extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new BillingClaimProfilePageViewModel(
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
    const { billingClaim } = this.state

    return (
      <Container>
        <Col>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 mb-3">
            <h1>
              Pharmacy Reference #: {billingClaimHelper.displayPharmacyReferenceNumber(billingClaim)}<br />
              Aprexis Reference #: {billingClaimHelper.displayAprexisReferenceNumber(billingClaim)}
            </h1>
          </div>
          <div>
            Payer Reference #: {billingClaimHelper.displayPayerClaimTrackingNumber(billingClaim)}<br />
            Submitted: {dateHelper.displayDate(billingClaimHelper.submittedAt(billingClaim), "MMMM dd, yyyy")}<br />
            Billing Status: {billingClaimHelper.displayBillingStatus(billingClaim, true)}
          </div>
          <p />

          <BillingClaimDisplay
            currentUser={this.props.currentUser}
            onEdit={this.vm.editModal}
            billingClaim={billingClaim}
          />
        </Col>
      </Container>
    )
  }

  shouldComponentUpdate(nextProps, nextState) {
    this.vm.props = { ...this.vm.props, ...nextProps }
    return true
  }
}

export { BillingClaimProfilePage }
