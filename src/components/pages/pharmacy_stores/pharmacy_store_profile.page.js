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
          {fieldHelper.display("NPI Deactivation Code", pharmacyStore.npi_deactivation_reason_code)}
          {fieldHelper.dateDisplay("NPI Deactivation Date", pharmacyStore.npi_deactivation_date)}
          {fieldHelper.dateDisplay("NPI Reactivation Date", pharmacyStore.npi_reactivation_date)}
          {fieldHelper.booleanDisplay("Overide Billing Info", pharmacyStore.override_pharmacy_organization_billing_info)}
          {fieldHelper.display("CCD Code", pharmacyStore.ccd_code)}
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
          {fieldHelper.display("Latitude", pharmacyStore.latitude)}
          {fieldHelper.display("Longitude", pharmacyStore.longitude)}
          <Contact contactable={pharmacyStore} />
          {fieldHelper.display("NPI", pharmacyStore.npi)}
          {fieldHelper.display("EIN Number", pharmacyStore.ein_number)}
          {fieldHelper.display("NABP", pharmacyStore.nabp)}
          {fieldHelper.display("Notes", pharmacyStore.notes)}
        </CardBody>
      </Card>
    </Col>
  )
}

const PharmacyStoreDisplay = ({ pharmacyStore }) => {
  if (!valueHelper.isValue(pharmacyStore)) {
    return (<Spinner />)
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
