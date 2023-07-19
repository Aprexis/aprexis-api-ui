import React, { Component } from "react"
import { Col, Container, Form, FormGroup, Row } from "reactstrap"
import { BooleanFieldEditor, NumberFieldEditor, SelectBillingContract, TextFieldEditor } from "../../../shared"
import { BillingContractTermProfileModalViewModel } from "../../../view_models/modals/billing/terms"
import { AprexisModal, AprexisModalHeader, aprexisWrapperModal } from "../../../../containers/modals"
import { valueHelper, billingContractTermHelper } from "@aprexis/aprexis-api-utility"
import { pathHelper } from "../../../../helpers"

class BillingContractTermProfileModal extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new BillingContractTermProfileModalViewModel(
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
    const { reconnectAndRetry } = this.props
    const { billingContractTerm } = this.state
    const pathEntries = this.vm.pathEntries()
    const billingContractId = pathHelper.id(pathEntries, "billing-contracts")

    return (
      <AprexisModal
        {...this.props}
        modalClassName="billing-contract-pharmacy-chain modal-xw"
        modalFooterComponents={this.renderFooter()}
        modalHeaderComponents={this.renderHeader()}>
        <Container>
          <Row>
            <Col>
              <Form>
                {
                  !valueHelper.isValue(billingContractId) &&
                  <SelectBillingContract
                    {...valueHelper.importantProps(this.props)}
                    fieldLabel="Contract"
                    inForm={true}
                    id={billingContractTermHelper.contractId(billingContractTerm)}
                    onChange={this.vm.selectBilliingContract}
                    readOnly={
                      !billingContractTermHelper.canModifyField(
                        billingContractTerm,
                        "contract_id"
                      )
                    }
                    reconnectAndRetry={reconnectAndRetry}
                  />
                }

                <FormGroup row>
                  <TextFieldEditor
                    changeField={this.vm.changeField}
                    fieldName="diagnosis"
                    fieldXs={4}
                    helper={billingContractTermHelper}
                    model={billingContractTerm}
                  />
                  <Col xs={2} />
                  <BooleanFieldEditor
                    changeField={this.vm.changeField}
                    fieldName="allow_claims_despite_physician_denial"
                    fieldXs={4}
                    helper={billingContractTermHelper}
                    model={billingContractTerm}
                  />
                </FormGroup>

                <FormGroup row>
                  <Col xs={2} />
                  <BooleanFieldEditor
                    changeField={this.vm.changeField}
                    fieldName="family_plan"
                    fieldXs={4}
                    helper={billingContractTermHelper}
                    model={billingContractTerm}
                    textValue={true}
                  />
                  <Col xs={2} />
                  <BooleanFieldEditor
                    changeField={this.vm.changeField}
                    fieldName="epsdt"
                    fieldXs={4}
                    helper={billingContractTermHelper}
                    model={billingContractTerm}
                    textValue={true}
                  />
                </FormGroup>

                <FormGroup row>
                  <NumberFieldEditor
                    changeField={this.vm.changeField}
                    fieldName="aprexis_fee"
                    helper={billingContractTermHelper}
                    model={billingContractTerm}
                    precision={2}
                    step=".01"
                  />
                </FormGroup>

                <FormGroup row>
                  <Col xs={2} />
                  <BooleanFieldEditor
                    changeField={this.vm.changeField}
                    fieldName="pulls_enabled"
                    fieldXs={4}
                    helper={billingContractTermHelper}
                    model={billingContractTerm}
                  />
                  <Col xs={2} />
                  <BooleanFieldEditor
                    changeField={this.vm.changeField}
                    fieldName="pushes_enabled"
                    fieldXs={4}
                    helper={billingContractTermHelper}
                    model={billingContractTerm}
                  />
                </FormGroup>

                <FormGroup row>
                  <TextFieldEditor
                    changeField={this.vm.changeField}
                    fieldName="unit"
                    helper={billingContractTermHelper}
                    model={billingContractTerm}
                  />
                </FormGroup>

                <FormGroup row>
                  <TextFieldEditor
                    changeField={this.vm.changeField}
                    fieldName="place_of_service"
                    fieldXs={4}
                    helper={billingContractTermHelper}
                    model={billingContractTerm}
                  />
                  <TextFieldEditor
                    changeField={this.vm.changeField}
                    fieldName="emergency_service"
                    fieldXs={4}
                    helper={billingContractTermHelper}
                    model={billingContractTerm}
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
    const { changedBillingContractTerm, operation, billingContractTerm } = this.state

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
              this.vm.submitModalCreateOrUpdate(
                "billingContractTerm",
                billingContractTerm,
                changedBillingContractTerm
              )
            }
          }>
          {valueHelper.humanize(operation)}
        </button>
      </div>
    )
  }

  renderHeader() {
    const { billingContractTerm } = this.state

    return (
      <AprexisModalHeader title={billingContractTermHelper.type(billingContractTerm)} />
    )
  }

  shouldComponentUpdate(nextProps, nextState) {
    this.vm.props = { ...this.vm.props, ...nextProps }
    return true
  }
}

const aprexisBillingContractTermProfileModal = aprexisWrapperModal(BillingContractTermProfileModal)
export { aprexisBillingContractTermProfileModal as BillingContractTermProfileModal }
