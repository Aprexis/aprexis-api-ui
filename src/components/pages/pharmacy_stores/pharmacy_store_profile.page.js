import React, { Component } from "react"
import { Card, CardBody, CardTitle, Col, Container, Row } from 'reactstrap'
import { Address, Contact, Spinner } from '../../shared'
import { PharmacyStoreProfilePageViewModel } from "../../view_models/pages/pharmacy_stores"
import { fieldHelper, pharmacyStoreHelper, valueHelper } from '../../../helpers'

const PharmacyStoreConfiguration = ({ pharmacyStore }) => {
  return (
    <Col className="col-sm d-flex">
      <Card className="card flex-fill">
        <CardTitle>
          <h3>Configuration</h3>
        </CardTitle>

        <CardBody>
          {fieldHelper.display("NPI Deactivation Code", pharmacyStoreHelper.npiDeactivationReasonCode(pharmacyStore))}
          {fieldHelper.dateDisplay("NPI Deactivation Date", pharmacyStoreHelper.npiDeactivationDate(pharmacyStore))}
          {fieldHelper.dateDisplay("NPI Reactivation Date", pharmacyStoreHelper.npiReactivationDate(pharmacyStore))}
          {
            fieldHelper.booleanDisplay(
              "Overide Billing Info",
              pharmacyStoreHelper.overridePharmacyOrganizationBillingInfo(pharmacyStore)
            )
          }
          {fieldHelper.display("CCD Code", pharmacyStoreHelper.ccdCode(pharmacyStore))}
          {fieldHelper.booleanDisplay("Stripe Customer", pharmacyStoreHelper.stripeCustomer(pharmacyStore))}
          {fieldHelper.booleanDisplay("Stripe Subscription", pharmacyStoreHelper.stripeSubscription(pharmacyStore))}
          {
            fieldHelper.booleanDisplay(
              "Stripe Pharmacist License Price",
              pharmacyStoreHelper.stripePharmacistLicensePrice(pharmacyStore)
            )
          }
          {
            fieldHelper.booleanDisplay(
              "Stripe Pharmacy Technician License Price",
              pharmacyStoreHelper.stripePharmacyTechnicianLicensePrice(pharmacyStore)
            )
          }
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
          {fieldHelper.display("Latitude", pharmacyStoreHelper.latitude(pharmacyStore))}
          {fieldHelper.display("Longitude", pharmacyStoreHelper.longitude(pharmacyStore))}
          <Contact contactable={pharmacyStore} />
          {fieldHelper.display("NPI", pharmacyStoreHelper.npi(pharmacyStore))}
          {fieldHelper.display("EIN Number", pharmacyStoreHelper.einNumber(pharmacyStore))}
          {fieldHelper.display("NABP", pharmacyStoreHelper.nabp(pharmacyStore))}
          {fieldHelper.display("Notes", pharmacyStoreHelper.notes(pharmacyStore))}
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
}

export { PharmacyStoreProfilePage }
