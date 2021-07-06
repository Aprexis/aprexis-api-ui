import React, { Component } from "react"
import { Col, Container, Form, FormGroup, Row } from "reactstrap"
import {
  AddressEditor,
  ContactEditor,
  DateFieldEditor,
  SelectFieldEditor,
  TextFieldEditor
} from "../../shared"
import { PatientProfileModalViewModel } from "../../view_models/modals/patients"
import { AprexisModal, AprexisModalHeader, aprexisWrapperModal } from "../../../containers/modals"
import { patientHelper, valueHelper } from "../../../helpers"
import { contactMethods } from "../../../types"

class PatientProfileModal extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new PatientProfileModalViewModel(
      {
        ...props,
        view: this
      }
    )

    this.contactMethods = this.contactMethods.bind(this)
    this.renderFooter = this.renderFooter.bind(this)
    this.renderHeader = this.renderHeader.bind(this)
  }

  componentDidMount() {
    this.vm.loadData()
  }

  contactMethods(preferredContactMethod) {
    if (valueHelper.isValue(contactMethods.find((contactMethod) => contactMethod.value == preferredContactMethod))) {
      return contactMethods
    }

    return [
      {
        value: preferredContactMethod,
        label: preferredContactMethod
      },
      ...contactMethods,
    ]
  }

  render() {
    const { patient } = this.state

    return (
      <AprexisModal
        {...this.props}
        modalClassName="patient-profile modal-xw"
        modalFooterComponents={this.renderFooter()}
        modalHeaderComponents={this.renderHeader()}>
        <Container>
          <Row>
            <Col>
              <Form>
                <FormGroup row>
                  <TextFieldEditor
                    changeField={this.vm.changeField}
                    fieldLabel="Name"
                    fieldName="first_name"
                    fieldXs={3}
                    helper={patientHelper}
                    model={patient}
                  />
                  <TextFieldEditor
                    changeField={this.vm.changeField}
                    fieldName="middle_name"
                    fieldXs={3}
                    helper={patientHelper}
                    model={patient}
                    omitLabel={true}
                  />
                  <TextFieldEditor
                    changeField={this.vm.changeField}
                    fieldName="last_name"
                    fieldXs={3}
                    helper={patientHelper}
                    model={patient}
                    omitLabel={true}
                  />
                </FormGroup>

                <FormGroup row>
                  <TextFieldEditor
                    changeField={this.vm.changeField}
                    fieldName="member_number"
                    fieldXs={4}
                    helper={patientHelper}
                    model={patient}
                  />
                  {
                    patientHelper.requiresPersonNumber(patient) &&
                    <TextFieldEditor
                      changeField={this.vm.changeField}
                      fieldName="person_number"
                      fieldXs={3}
                      helper={patientHelper}
                      model={patient}
                    />
                  }
                </FormGroup>

                <FormGroup row>
                  <DateFieldEditor
                    allowBlank={true}
                    changeField={this.vm.changeDate}
                    fieldName="date_of_birth"
                    fieldXs={3}
                    helper={patientHelper}
                    model={patient}
                    style={{ width: 110 }}
                  />
                </FormGroup>

                <FormGroup row>
                  <DateFieldEditor
                    allowBlank={true}
                    changeField={this.vm.changeDate}
                    fieldLabel="Coverage Effective"
                    fieldName="coverage_effective_date"
                    fieldXs={3}
                    helper={patientHelper}
                    model={patient}
                    style={{ width: 110 }}
                  />
                  <DateFieldEditor
                    allowBlank={true}
                    changeField={this.vm.changeDate}
                    fieldLabel="Coverage Ends"
                    fieldName="coverage_end_date"
                    fieldXs={3}
                    helper={patientHelper}
                    model={patient}
                    style={{ width: 110 }}
                  />
                </FormGroup>

                <AddressEditor
                  addressable={patient}
                  allowEdit={patientHelper.canModifyField(patient, "address")}
                  onChangeField={this.vm.changeField}
                />

                <ContactEditor
                  allowEdit={patientHelper.canModifyField(patient, "contact")}
                  allowMobile={true}
                  contactable={patient}
                  onChangeField={this.vm.changeField}
                />

                <FormGroup row>
                  <SelectFieldEditor
                    changeField={this.vm.changeField}
                    fieldName="preferred_contact_method"
                    fieldOptions={this.contactMethods(patientHelper.preferredContactMethod(patient))}
                    fieldXs={4}
                    helper={patientHelper}
                    model={patient}
                  />
                  <TextFieldEditor
                    changeField={this.vm.changeField}
                    fieldName="race"
                    fieldXs={4}
                    helper={patientHelper}
                    model={patient}
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
    const { changedPatient, clearModal, operation, patient } = this.state

    return (
      <div>
        <button
          className="btn btn-sm btn-secondary mr-auto"
          onClick={(event) => { this.vm.toggleModal(clearModal) }}>
          Cancel
        </button>
        <button
          className="btn btn-sm btn-primary"
          onClick={(event) => { this.vm.submitModalCreateOrUpdate("patient", patient, changedPatient) }}>
          {valueHelper.humanize(operation)}
        </button>
      </div>
    )
  }

  renderHeader() {
    const { patient } = this.state
    const title = `Profile for ${patientHelper.name(patient)}`

    return (
      <AprexisModalHeader title={title} />
    )
  }

  shouldComponentUpdate(nextProps, nextState) {
    this.vm.props = { ...this.vm.props, ...nextProps }
    return true
  }
}

const aprexisPatientProfileModal = aprexisWrapperModal(PatientProfileModal)
export { aprexisPatientProfileModal as PatientProfileModal }
