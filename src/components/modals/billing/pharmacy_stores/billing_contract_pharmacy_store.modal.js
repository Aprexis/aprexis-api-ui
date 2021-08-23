import React, { Component } from "react"
import { Col, Container, Form, FormGroup, Row } from "reactstrap"
import { BooleanFieldEditor, SelectBillingContract, SelectPharmacyStore } from "../../../shared"
import { BillingContractPharmacyStoreModalViewModel } from "../../../view_models/modals/billing/pharmacy_stores"
import { AprexisModal, AprexisModalHeader, aprexisWrapperModal } from "../../../../containers/modals"
import { valueHelper, pathHelper } from "../../../../helpers"
import { billingContractPharmacyStoreHelper } from "../../../../helpers/billing"

class BillingContractPharmacyStoreModal extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new BillingContractPharmacyStoreModalViewModel(
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
    const { billingContractPharmacyStore } = this.state
    const pathEntries = this.vm.pathEntries()
    const billingContractId = pathHelper.id(pathEntries, "billing-contracts")
    const pharmacyStoreId = pathHelper.id(pathEntries, "pharmacy-stores")

    return (
      <AprexisModal
        {...this.props}
        modalClassName="billing-contract-pharmacy-store modal-xw"
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
                    id={billingContractPharmacyStoreHelper.contractId(billingContractPharmacyStore)}
                    onChange={this.vm.selectBilliingContract}
                    readOnly={
                      !billingContractPharmacyStoreHelper.canModifyField(
                        billingContractPharmacyStore,
                        "contract_id"
                      )
                    }
                  />
                }

                {
                  !valueHelper.isValue(pharmacyStoreId) &&
                  <SelectPharmacyStore
                    {...valueHelper.importantProps(this.props)}
                    fieldLabel="Pharmacy Store"
                    inForm={true}
                    id={billingContractPharmacyStoreHelper.pharmacyStoreId(billingContractPharmacyStore)}
                    onChange={this.vm.selectPharmacyStore}
                    readOnly={
                      !billingContractPharmacyStoreHelper.canModifyField(
                        billingContractPharmacyStore,
                        "pharmacy_store_id"
                      )
                    }
                  />
                }

                <FormGroup row>
                  <BooleanFieldEditor
                    changeField={this.vm.changeField}
                    fieldName="clinical"
                    helper={billingContractPharmacyStoreHelper}
                    model={billingContractPharmacyStore}
                  />
                  <BooleanFieldEditor
                    changeField={this.vm.changeField}
                    fieldName="transactional"
                    helper={billingContractPharmacyStoreHelper}
                    model={billingContractPharmacyStore}
                  />
                </FormGroup>

                <FormGroup row>
                  <BooleanFieldEditor
                    changeField={this.vm.changeField}
                    fieldName="pulls_enabled"
                    helper={billingContractPharmacyStoreHelper}
                    model={billingContractPharmacyStore}
                  />
                  <BooleanFieldEditor
                    changeField={this.vm.changeField}
                    fieldName="claims_enabled"
                    helper={billingContractPharmacyStoreHelper}
                    model={billingContractPharmacyStore}
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
    const { changedBillingContractPharmacyStore, operation, billingContractPharmacyStore } = this.state

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
                "billingContractPharmacyStore",
                billingContractPharmacyStore,
                changedBillingContractPharmacyStore
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
      <AprexisModalHeader title={"Contracted Pharmacy Store"} />
    )
  }

  shouldComponentUpdate(nextProps, nextState) {
    this.vm.props = { ...this.vm.props, ...nextProps }
    return true
  }
}

const aprexisBillingContractPharmacyStoreModal = aprexisWrapperModal(BillingContractPharmacyStoreModal)
export { aprexisBillingContractPharmacyStoreModal as BillingContractPharmacyStoreModal }
