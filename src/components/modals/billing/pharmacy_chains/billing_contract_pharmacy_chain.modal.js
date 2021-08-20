import React, { Component } from "react"
import { Col, Container, Form, FormGroup, Row } from "reactstrap"
import { BooleanFieldEditor, SelectBillingContract, SelectPharmacyChain } from "../../../shared"
import { BillingContractPharmacyChainModalViewModel } from "../../../view_models/modals/billing/pharmacy_chains"
import { AprexisModal, AprexisModalHeader, aprexisWrapperModal } from "../../../../containers/modals"
import { valueHelper, pathHelper } from "../../../../helpers"
import { billingContractPharmacyChainHelper } from "../../../../helpers/billing"

class BillingContractPharmacyChainModal extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new BillingContractPharmacyChainModalViewModel(
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
    const { billingContractPharmacyChain } = this.state
    const pathEntries = this.vm.pathEntries()
    const billingContractId = pathHelper.id(pathEntries, "billing-contracts")
    const pharmacyId = pathHelper.id(pathEntries, "pharmacies")

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
                {
                  !valueHelper.isValue(billingContractId) &&
                  <SelectBillingContract
                    {...valueHelper.importantProps(this.props)}
                    fieldLabel="Contract"
                    inForm={true}
                    id={billingContractPharmacyChainHelper.contractId(billingContractPharmacyChain)}
                    onChange={this.vm.selectBilliingContract}
                    readOnly={
                      !billingContractPharmacyChainHelper.canModifyField(
                        billingContractPharmacyChain,
                        "contract_id"
                      )
                    }
                  />
                }

                {
                  !valueHelper.isValue(pharmacyId) &&
                  <SelectPharmacyChain
                    {...valueHelper.importantProps(this.props)}
                    fieldLabel="Pharmacy Chain"
                    inForm={true}
                    id={billingContractPharmacyChainHelper.pharmacyChainId(billingContractPharmacyChain)}
                    onChange={this.vm.selectPharmacyChain}
                    readOnly={
                      !billingContractPharmacyChainHelper.canModifyField(
                        billingContractPharmacyChain,
                        "pharmacy_id"
                      )
                    }
                  />
                }

                <FormGroup row>
                  <BooleanFieldEditor
                    changeField={this.vm.changeField}
                    fieldName="clinical"
                    helper={billingContractPharmacyChainHelper}
                    model={billingContractPharmacyChain}
                  />
                  <BooleanFieldEditor
                    changeField={this.vm.changeField}
                    fieldName="transactional"
                    helper={billingContractPharmacyChainHelper}
                    model={billingContractPharmacyChain}
                  />
                </FormGroup>

                <FormGroup row>
                  <BooleanFieldEditor
                    changeField={this.vm.changeField}
                    fieldName="pulls_enabled"
                    helper={billingContractPharmacyChainHelper}
                    model={billingContractPharmacyChain}
                  />
                  <BooleanFieldEditor
                    changeField={this.vm.changeField}
                    fieldName="claims_enabled"
                    helper={billingContractPharmacyChainHelper}
                    model={billingContractPharmacyChain}
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
    const { changedBillingContractPharmacyChain, operation, billingContractPharmacyChain } = this.state

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
                "billingContractPharmacyChain",
                billingContractPharmacyChain,
                changedBillingContractPharmacyChain
              )
            }
          }>
          {valueHelper.humanize(operation)}
        </button>
      </div>
    )
  }

  renderHeader() {
    return (
      <AprexisModalHeader title={"Contracted Pharmacy Chain"} />
    )
  }

  shouldComponentUpdate(nextProps, nextState) {
    this.vm.props = { ...this.vm.props, ...nextProps }
    return true
  }
}

const aprexisBillingContractPharmacyChainModal = aprexisWrapperModal(BillingContractPharmacyChainModal)
export { aprexisBillingContractPharmacyChainModal as BillingContractPharmacyChainModal }
