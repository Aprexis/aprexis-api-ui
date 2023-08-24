import React, { Component } from 'react'
import { Card, CardBody, CardTitle, Col, Container, Row } from 'reactstrap'
import { EditButton, Spinner } from "../../../shared"
import { BillingInvoiceProfilePageViewModel } from "../../../view_models/pages/billing/invoices"
import { dateHelper, valueHelper } from "@aprexis/aprexis-api-utility"
import { displayHelper } from '../../../../helpers'

const BillingInvoiceProfile = ({ currentUser, onEdit, billingInvoice, vm }) => {
  return (
    <Col className="col-sm d-flex">
      <Card className="card flex-fill">
        <CardTitle>
          <h3>
            Profile
            {
              vm.helper().canEdit(currentUser, billingInvoice) &&
              <EditButton onEdit={(_event) => { onEdit(billingInvoice) }} />
            }
          </h3>
        </CardTitle>

        <CardBody>
          {displayHelper.display("Submitted At", dateHelper.displayDateTime(vm.helper().submittedAt(billingInvoice)))}
          {displayHelper.display("Resolved At", dateHelper.displayDateTime(vm.helper().resolvedAt(billingInvoice)))}
        </CardBody>
      </Card>
    </Col>
  )
}

const BillingInvoiceCharges = ({ billingInvoice, vm }) => {
  return (
    <Col className="col-sm d-flex">
      <Card className="card flex-fill">
        <CardTitle><h3>Charges</h3></CardTitle>

        <CardBody>
          {displayHelper.display("Amount", vm.helper().amount(billingInvoice))}
          {displayHelper.display("Paid", vm.helper().amountPaid(billingInvoice))}
        </CardBody>
      </Card>
    </Col>
  )
}

const BillingInvoiceDisplay = ({ currentUser, onEdit, billingInvoice, vm }) => {
  if (!valueHelper.isValue(billingInvoice)) {
    return (<Spinner showAtStart={true} />)
  }

  return (
    <React.Fragment>
      <Row>
        <BillingInvoiceProfile currentUser={currentUser} onEdit={onEdit} billingInvoice={billingInvoice} vm={vm} />
      </Row>
      <Row>
        <BillingInvoiceCharges currentUser={currentUser} billingInvoice={billingInvoice} vm={vm} />
      </Row>
    </React.Fragment>
  )
}

class BillingInvoiceProfilePage extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new BillingInvoiceProfilePageViewModel(
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
    const { billingInvoice } = this.state

    return (
      <Container>
        <Col>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 mb-3">
            <h1>
              {this.vm.helper().name(billingInvoice)} at {dateHelper.displayDateTime(this.vm.helper().dueAt(billingInvoice))}
            </h1>
          </div>

          <BillingInvoiceDisplay
            currentUser={this.props.currentUser}
            onEdit={this.vm.editModal}
            billingInvoice={billingInvoice}
            vm={this.vm}
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

export { BillingInvoiceProfilePage }
