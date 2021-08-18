import React, { Component } from "react"
import { Col, Container, Form, FormGroup, Row } from "reactstrap"
import { DayFieldEditor, TextFieldEditor } from "../../../shared"
import { BillingContractModalViewModel } from "../../../view_models/modals/billing/contracts"
import { AprexisModal, AprexisModalHeader, aprexisWrapperModal } from "../../../../containers/modals"
import { valueHelper } from "../../../../helpers"
import { billingContractHelper } from "../../../../helpers/billing"

class BillingContractModal extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new BillingContractModalViewModel(
      {
        ...props,
        view: this
      }
    )

    this.renderFooter = this.renderFooter.bind(this)
    this.renderHeader = this.renderHeader.bind(this)
  }

  componentDidMount() {
    this.vm.loadData()
  }

  render() {
    const { billingContract } = this.state

    return (
      <AprexisModal
        {...this.props}
        modalClassName="billing-contract modal-xw"
        modalFooterComponents={this.renderFooter()}
        modalHeaderComponents={this.renderHeader()}>
        <Container>
          <Row>
            <Col>
              <Form>
                <FormGroup row>
                  <Col xs="2">
                    <label>Health Plan</label>
                  </Col>
                  <Col xs="9">

                    {billingContractHelper.healthPlanName(billingContract)}
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <TextFieldEditor
                    changeField={this.vm.changeField}
                    fieldName="name"
                    helper={billingContractHelper}
                    model={billingContract}
                  />
                </FormGroup>

                <FormGroup row>
                  <DayFieldEditor
                    allowBlank={true}
                    changeField={this.vm.changeDate}
                    fieldLabel="Start Date"
                    fieldName="start_date"
                    helper={billingContractHelper}
                    model={billingContract}
                  />
                  <DayFieldEditor
                    allowBlank={true}
                    changeField={this.vm.changeDate}
                    fieldLabel="Stop Date"
                    fieldName="stop_date"
                    helper={billingContractHelper}
                    model={billingContract}
                  />
                </FormGroup>
              </Form>
            </Col>
          </Row>
        </Container>
      </AprexisModal>
    )
  }

  renderFooter() {
    const { clearModal } = this.props
    const { changedBillingContract, operation, billingContract } = this.state

    return (
      <div>
        <button
          className="btn btn-sm btn-secondary mr-auto"
          onClick={(event) => { this.vm.toggleModal(clearModal) }}>
          Cancel
        </button>
        <button
          className="btn btn-sm btn-primary"
          onClick={
            (event) => {
              this.vm.submitModalCreateOrUpdate("billingContract", billingContract, changedBillingContract)
            }
          }>
          {valueHelper.humanize(operation)}
        </button>
      </div>
    )
  }

  renderHeader() {
    const { billingContract } = this.state

    return (
      <AprexisModalHeader title={billingContractHelper.name(billingContract)} />
    )
  }

  shouldComponentUpdate(nextProps, nextState) {
    this.vm.props = { ...this.vm.props, ...nextProps }
    return true
  }
}

const aprexisBillingContractModal = aprexisWrapperModal(BillingContractModal)
export { aprexisBillingContractModal as BillingContractModal }
