import React, { Component } from "react"
import { Col, Container, Form, FormGroup, Row } from "reactstrap"
import {
  BooleanFieldEditor,
  DayTimeFieldEditor,
  SelectLabTest,
  SelectPharmacyStore,
  TextFieldEditor
} from "../../shared/index.js"
import { LabTestValueModalViewModel } from "../../view_models/modals/lab_test_values/index.js"
import { AprexisModal, AprexisModalHeader, aprexisWrapperModal } from "../../../containers/modals/index.js"
import { patientHelper, labTestValueHelper, valueHelper } from "@aprexis/aprexis-api-utility"
import { pathHelper } from "../../../helpers/index.js"

const LabTestValueLabTest = ({ isRequired, labTestValue, onChange, props }) => {
  return (
    <SelectLabTest
      {...valueHelper.importantProps(props)}
      fieldLabel="Lab Test"
      inForm={true}
      id={labTestValueHelper.labTestId(labTestValue)}
      onChange={onChange}
      readOnly={!labTestValueHelper.canModifyField(labTestValue, "lab_test_id")}
      reconnectAndRetry={props.reconnectAndRetry}
      required={isRequired("lab_test_id")}
      targetName="lab_test_id"
    />
  )
}

const LabTestValuePharmacyStore = ({ isRequired, labTestValue, onChange, pathEntries, props }) => {
  if (pathHelper.isSingular(pathEntries, "pharmacy-stores")) {
    return (<React.Fragment />)
  }

  return (
    <SelectPharmacyStore
      {...valueHelper.importantProps(props)}
      fieldLabel="Pharmacy Store"
      inForm={true}
      id={labTestValueHelper.pharmacyStoreId(labTestValue)}
      onChange={onChange}
      readOnly={!pathHelper.isSingular(pathEntries, "pharmacy-stores") && !labTestValueHelper.canModifyField(labTestValue, "pharmacy_store_id")}
      reconnectAndRetry={props.reconnectAndRetry}
      required={isRequired("pharmacy_store_id")}
      targetName="pharmacy_store_id"
      useSearch={true}
    />
  )
}

class LabTestValueModal extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new LabTestValueModalViewModel(
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
    const { labTestValue } = this.state
    const { pathEntries } = this.vm.pathEntries()

    return (
      <AprexisModal
        {...this.props}
        modalClassName="lab-test-value modal-xw"
        modalFooterComponents={this.renderFooter()}
        modalHeaderComponents={this.renderHeader()}>
        <Container>
          <Row>
            <Col>
              <Form>
                <LabTestValuePharmacyStore
                  isRequired={this.vm.isRequired}
                  labTestValue={labTestValue}
                  onChange={this.vm.changeField}
                  pathEntries={pathEntries}
                  props={this.props}
                />

                <LabTestValueLabTest
                  isRequired={this.vm.isRequired}
                  labTestValue={labTestValue}
                  onChange={this.vm.changeField}
                  props={this.props}
                />

                <FormGroup row>
                  <BooleanFieldEditor
                    changeField={this.vm.changeField}
                    fieldName="confirmed"
                    helper={labTestValueHelper}
                    model={labTestValue}
                    readOnly={!labTestValueHelper.canModifyField(labTestValue, "confirmed")}
                    required={this.vm.isRequired("confirmed")}
                  />
                  <BooleanFieldEditor
                    changeField={this.vm.changeField}
                    fieldName="calculated"
                    helper={labTestValueHelper}
                    model={labTestValue}
                    readOnly={!labTestValueHelper.canModifyField(labTestValue, "calculated")}
                    required={this.vm.isRequired("calculated")}
                  />
                </FormGroup>

                <FormGroup row>
                  <TextFieldEditor
                    changeField={this.vm.changeField}
                    email={true}
                    fieldName="value"
                    helper={labTestValueHelper}
                    model={labTestValue}
                    required={this.vm.isRequired("value")}
                  />
                </FormGroup>

                <FormGroup row>
                  <DayTimeFieldEditor
                    allowBlank={false}
                    changeField={this.vm.changeDateTime}
                    fieldLabel="Taken At"
                    fieldName="value_taken_at"
                    helper={labTestValueHelper}
                    earliestDayTime={new Date()}
                    model={labTestValue}
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
    const { changedLabTestValue, operation, labTestValue } = this.state

    return (
      <div>
        <button
          className="btn btn-sm btn-secondary mr-auto"
          onClick={(_event) => { this.vm.toggleModal(clearModal) }}>
          Cancel
        </button>
        <button
          className="btn btn-sm btn-primary"
          onClick={
            (_event) => {
              this.vm.submitModalCreateOrUpdate(this.vm.modelName(), labTestValue, changedLabTestValue)
            }
          }>
          {valueHelper.humanize(operation)}
        </button>
      </div>
    )
  }

  renderHeader() {
    const { patient } = this.state
    const title = `Lab Test for ${patientHelper.name(patient)}`

    return (
      <AprexisModalHeader title={title} />
    )
  }

  shouldComponentUpdate(nextProps, _nextState) {
    this.vm.props = { ...this.vm.props, ...nextProps }
    return true
  }
}

const aprexisLabTestValueModal = aprexisWrapperModal(LabTestValueModal)
export { aprexisLabTestValueModal as LabTestValueModal }
