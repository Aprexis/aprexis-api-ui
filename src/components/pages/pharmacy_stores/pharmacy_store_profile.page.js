import React, { Component } from "react"
import { Card, CardBody, CardTitle, Col, Container, Row } from 'reactstrap'
import { Address, Contact, Spinner } from '../../shared'
import { PharmacyStoreProfilePageViewModel } from "../../view_models/pages/pharmacy_stores"
import { pharmacyStoreHelper, valueHelper } from '@aprexis/aprexis-api-utility'
import { displayHelper } from "../../../helpers"
import { ModelConfigs } from "../../shared"

const PharmacyStoreConfiguration = ({ pharmacyStore }) => {
  return (
    <Col className="col-sm d-flex">
      <Card className="card flex-fill">
        <CardTitle>
          <h3>Configuration</h3>
        </CardTitle>

        <CardBody>
          {displayHelper.display("NPI Deactivation Code", pharmacyStoreHelper.npiDeactivationReasonCode(pharmacyStore))}
          {displayHelper.dateDisplay("NPI Deactivation Date", pharmacyStoreHelper.npiDeactivationDate(pharmacyStore))}
          {displayHelper.dateDisplay("NPI Reactivation Date", pharmacyStoreHelper.npiReactivationDate(pharmacyStore))}
          {
            displayHelper.booleanDisplay(
              "Overide Billing Info",
              pharmacyStoreHelper.overridePharmacyOrganizationBillingInfo(pharmacyStore)
            )
          }
          {displayHelper.display("CCD Code", pharmacyStoreHelper.ccdCode(pharmacyStore))}
          {displayHelper.booleanDisplay("Stripe Customer", pharmacyStoreHelper.stripeCustomer(pharmacyStore))}
          {displayHelper.booleanDisplay("Stripe Subscription", pharmacyStoreHelper.stripeSubscription(pharmacyStore))}
          {
            displayHelper.booleanDisplay(
              "Stripe Pharmacist License Price",
              pharmacyStoreHelper.stripePharmacistLicensePrice(pharmacyStore)
            )
          }
          {
            displayHelper.booleanDisplay(
              "Stripe Pharmacy Technician License Price",
              pharmacyStoreHelper.stripePharmacyTechnicianLicensePrice(pharmacyStore)
            )
          }
          <ModelConfigs helper={pharmacyStoreHelper} modelConfigurable={pharmacyStore} />
        </CardBody>
      </Card>
    </Col>
  )
}

const PharmacyStoreProfile = ({ pharmacyStore }) => {
  return (
    <Col className="col-sm d-flex">
      <Card className="card flex-fill">
        <CardTitle>
          <h3>Profile</h3>
        </CardTitle>

        <CardBody>
          <Address addressable={pharmacyStore} />
          {displayHelper.display("Latitude", pharmacyStoreHelper.latitude(pharmacyStore))}
          {displayHelper.display("Longitude", pharmacyStoreHelper.longitude(pharmacyStore))}
          <Contact contactable={pharmacyStore} />
          {displayHelper.display("NPI", pharmacyStoreHelper.npi(pharmacyStore))}
          {displayHelper.display("EIN Number", pharmacyStoreHelper.einNumber(pharmacyStore))}
          {displayHelper.display("NABP", pharmacyStoreHelper.nabp(pharmacyStore))}
          {displayHelper.display("Notes", pharmacyStoreHelper.notes(pharmacyStore))}
        </CardBody>
      </Card>
    </Col>
  )
}

const PharmacyStoreDisplay = ({ pharmacyStore }) => {
  if (!valueHelper.isValue(pharmacyStore)) {
    return (<Spinner showAtStart={true} />)
  }

  return (
    <React.Fragment>
      <Row>
        <PharmacyStoreProfile pharmacyStore={pharmacyStore} />
      </Row>

      <Row>
        <PharmacyStoreConfiguration pharmacyStore={pharmacyStore} />
      </Row>
    </React.Fragment>
  )
}

class PharmacyStoreProfilePage extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new PharmacyStoreProfilePageViewModel(
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
    const { pharmacyStore } = this.state

    return (
      <Container>
        <Col>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 mb-3">
            <h1>{pharmacyStoreHelper.name(pharmacyStore)} {pharmacyStoreHelper.storeNumber(pharmacyStore)}</h1>
          </div>

          <PharmacyStoreDisplay currentUser={this.props.currentUser} pharmacyStore={pharmacyStore} />
        </Col>
      </Container>
    )
  }

  shouldComponentUpdate(nextProps, _nextState) {
    this.vm.props = { ...this.vm.props, ...nextProps }
    return true
  }
}

export { PharmacyStoreProfilePage }
