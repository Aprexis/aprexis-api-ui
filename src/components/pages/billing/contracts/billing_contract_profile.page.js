import React, { Component } from 'react'
import { Card, CardBody, CardTitle, Col, Container, Row } from 'reactstrap'
import { EditButton, Spinner } from "../../../shared"
import { BillingContractProfilePageViewModel } from "../../../view_models/pages/billing/contracts"
import { fieldHelper, valueHelper } from "../../../../helpers"
import { billingContractHelper } from "../../../../helpers/billing"

const BillingContractProfile = ({ currentUser, onEditProfile, billingContract }) => {
  return (
    <Col className="col-sm d-flex">
      <Card className="card flex-fill">
        <CardTitle>
          <h3>
            Profile
            {
              billingContractHelper.canEdit(currentUser, billingContract) &&
              <EditButton onEdit={(event) => { onEditProfile(billingContract) }} />
            }
          </h3>
        </CardTitle>

        <CardBody>
          {fieldHelper.display("Name", billingContractHelper.name(billingContract))}
          {fieldHelper.display("Health Plan", billingContractHelper.healthPlanName(billingContract))}
          {fieldHelper.booleanDisplay("Active", billingContractHelper.active(billingContract))}
          {fieldHelper.dateDisplay("Start Date", billingContractHelper.startDate(billingContract))}
          {fieldHelper.dateDisplay("Stop Date", billingContractHelper.stopDate(billingContract))}
        </CardBody>
      </Card>
    </Col>
  )
}

const BillingContractDisplay = ({ currentUser, onEditProfile, billingContract }) => {
  if (!valueHelper.isValue(billingContract)) {
    return (<Spinner showAtStart={true} />)
  }

  return (
    <Row>
      <BillingContractProfile currentUser={currentUser} onEditProfile={onEditProfile} billingContract={billingContract} />
    </Row>
  )
}

class BillingContractProfilePage extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new BillingContractProfilePageViewModel(
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
    const { billingContract } = this.state

    return (
      <Container>
        <Col>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 mb-3">
            <h1>Contract</h1>
          </div>

          <BillingContractDisplay
            currentUser={this.props.currentUser}
            onEditProfile={this.vm.editProfileModal}
            billingContract={billingContract}
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

export { BillingContractProfilePage }
