import React, { Component } from 'react'
import { Card, CardBody, CardTitle, Col, Container, Row } from 'reactstrap'
import { EditButton, Spinner } from "../../../shared"
import { BillingContractProfilePageViewModel } from "../../../view_models/pages/billing/contracts"
import { valueHelper, billingContractHelper } from "@aprexis/aprexis-api-utility"
import { displayHelper } from '../../../../helpers'

const BillingContractProfile = ({ currentUser, onEdit, billingContract }) => {
  return (
    <Col className="col-sm d-flex">
      <Card className="card flex-fill">
        <CardTitle>
          <h3>
            Profile
            {
              billingContractHelper.canEdit(currentUser, billingContract) &&
              <EditButton onEdit={(_event) => { onEdit(billingContract) }} />
            }
          </h3>
        </CardTitle>

        <CardBody>
          {displayHelper.display("Health Plan", billingContractHelper.healthPlanName(billingContract))}
          {displayHelper.booleanDisplay("Active", billingContractHelper.active(billingContract))}
          {displayHelper.dateDisplay("Start Date", billingContractHelper.startDate(billingContract))}
          {displayHelper.dateDisplay("Stop Date", billingContractHelper.stopDate(billingContract))}
        </CardBody>
      </Card>
    </Col>
  )
}

const BillingContractDisplay = ({ currentUser, onEdit, billingContract }) => {
  if (!valueHelper.isValue(billingContract)) {
    return (<Spinner showAtStart={true} />)
  }

  return (
    <Row>
      <BillingContractProfile currentUser={currentUser} onEdit={onEdit} billingContract={billingContract} />
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
            <h1>{billingContractHelper.name(billingContract)}</h1>
          </div>

          <BillingContractDisplay
            currentUser={this.props.currentUser}
            onEdit={this.vm.editModal}
            billingContract={billingContract}
          />
        </Col>
      </Container>
    )
  }

  shouldComponentUpdate(nextProps, _nextState) {
    this.vm.props = { ...this.vm.props, ...nextProps }
    return true
  }
}

export { BillingContractProfilePage }
