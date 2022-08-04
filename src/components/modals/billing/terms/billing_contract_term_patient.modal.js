import React, { Component } from "react"
import { Col, Container, Form, FormGroup, Row } from "reactstrap"
import { NumberFieldEditor, TextFieldEditor } from "../../../shared"
import { BillingContractTermPatientModalViewModel } from "../../../view_models/modals/billing/terms"
import { AprexisModal, AprexisModalHeader, aprexisWrapperModal } from "../../../../containers/modals"
import { valueHelper, billingContractTermHelper } from "@aprexis/aprexis-api-utility"

const PatientSection = ({ billingContractTerm, changeField, changeNumericField, patientType, section }) => {
  return (
    <React.Fragment>
      <Row>
        <Col>
          <h5>{valueHelper.humanize(section)}</h5>
        </Col>
      </Row>

      <FormGroup row>
        <TextFieldEditor
          changeField={changeField}
          fieldName={`${patientType}_${section}_cpt_code`}
          fieldLabel="CPT Code"
          fieldXs={3}
          helper={billingContractTermHelper}
          labelXs={1}
          model={billingContractTerm}
        />
        <TextFieldEditor
          changeField={changeField}
          fieldName={`${patientType}_${section}_user_mod`}
          fieldLabel="User Mod"
          fieldXs={3}
          helper={billingContractTermHelper}
          labelXs={1}
          model={billingContractTerm}
        />
        <NumberFieldEditor
          changeField={changeNumericField}
          fieldName={`${patientType}_${section}_charge`}
          fieldLabel="Charge"
          fieldXs={3}
          helper={billingContractTermHelper}
          labelXs={1}
          model={billingContractTerm}
          precision={2}
          step=".01"
        />
      </FormGroup>
    </React.Fragment>
  )
}

class BillingContractTermPatientModal extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new BillingContractTermPatientModalViewModel(
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
    const { patientType } = this.props
    const { billingContractTerm } = this.state

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
                <PatientSection
                  billingContractTerm={billingContractTerm}
                  changeField={this.vm.changeField}
                  changeNumericField={this.vm.changeNumericField}
                  patientType={patientType}
                  section="initial_15min"
                />

                <PatientSection
                  billingContractTerm={billingContractTerm}
                  changeField={this.vm.changeField}
                  changeNumericField={this.vm.changeNumericField}
                  patientType={patientType}
                  section="additional_15min"
                />

                <PatientSection
                  billingContractTerm={billingContractTerm}
                  changeField={this.vm.changeField}
                  changeNumericField={this.vm.changeNumericField}
                  patientType={patientType}
                  section="follow_up"
                />
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
    const { patientType } = this.props
    const { billingContractTerm } = this.state

    return (
      <AprexisModalHeader
        title={`${billingContractTermHelper.type(billingContractTerm)} for ${valueHelper.humanize(patientType)}`}
      />
    )
  }

  shouldComponentUpdate(nextProps, nextState) {
    this.vm.props = { ...this.vm.props, ...nextProps }
    return true
  }
}

const aprexisBillingContractTermPatientModal = aprexisWrapperModal(BillingContractTermPatientModal)
export { aprexisBillingContractTermPatientModal as BillingContractTermPatientModal }
