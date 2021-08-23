import React, { Component } from 'react'
import { Card, CardBody, CardTitle, Col, Container, Row } from 'reactstrap'
import { EditButton, Spinner } from "../../../shared"
import {
  BillingContractPharmacyStoreProfilePageViewModel
} from "../../../view_models/pages/billing/pharmacy_stores"
import { fieldHelper, valueHelper } from "../../../../helpers"
import { billingContractPharmacyStoreHelper } from "../../../../helpers/billing"

const BillingContractPharmacyStoreProfile = (
  {
    currentUser,
    onEditProfile,
    billingContractPharmacyStore
  }
) => {
  return (
    <Col className="col-sm d-flex">
      <Card className="card flex-fill">
        <CardTitle>
          <h3>
            Profile
            {
              billingContractPharmacyStoreHelper.canEdit(currentUser, billingContractPharmacyStore) &&
              <EditButton onEdit={(event) => { onEditProfile(billingContractPharmacyStore) }} />
            }
          </h3>
        </CardTitle>

        <CardBody>
          {
            fieldHelper.display(
              "Health Plan",
              billingContractPharmacyStoreHelper.healthPlanName(billingContractPharmacyStore)
            )
          }
          {
            fieldHelper.booleanDisplay(
              "Clinical Programs",
              billingContractPharmacyStoreHelper.clinical(billingContractPharmacyStore)
            )
          }
          {
            fieldHelper.booleanDisplay(
              "Transactional Programs",
              billingContractPharmacyStoreHelper.transactional(billingContractPharmacyStore)
            )
          }
          {
            fieldHelper.booleanDisplay(
              "Pulls Enabled",
              billingContractPharmacyStoreHelper.pullsEnabled(billingContractPharmacyStore)
            )
          }
          {
            fieldHelper.booleanDisplay(
              "Claims Enabled",
              billingContractPharmacyStoreHelper.claimsEnabled(billingContractPharmacyStore)
            )
          }
        </CardBody>
      </Card>
    </Col>
  )
}

const BillingContractPharmacyStoreDisplay = ({ currentUser, onEditProfile, billingContractPharmacyStore }) => {
  if (!valueHelper.isValue(billingContractPharmacyStore)) {
    return (<Spinner showAtStart={true} />)
  }

  return (
    <Row>
      <BillingContractPharmacyStoreProfile
        currentUser={currentUser}
        onEditProfile={onEditProfile}
        billingContractPharmacyStore={billingContractPharmacyStore}
      />
    </Row>
  )
}

class BillingContractPharmacyStoreProfilePage extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new BillingContractPharmacyStoreProfilePageViewModel(
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
    const { billingContractPharmacyStore } = this.state

    return (
      <Container>
        <Col>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 mb-3">
            <h1>
              {billingContractPharmacyStoreHelper.pharmacyStoreName(billingContractPharmacyStore)}
              {billingContractPharmacyStoreHelper.pharmacyStoreNumber(billingContractPharmacyStore)}
            </h1>
          </div>

          <BillingContractPharmacyStoreDisplay
            currentUser={this.props.currentUser}
            onEditProfile={this.vm.editModal}
            billingContractPharmacyStore={billingContractPharmacyStore}
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

export { BillingContractPharmacyStoreProfilePage }
