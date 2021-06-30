import React, { Component } from "react"
import { Col, Container, Form, FormGroup, Input, Row } from "reactstrap"
import { AddressEditor, ContactEditor, DatePicker, TextFieldEditor } from "../../shared"
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

    this.renderFooter = this.renderFooter.bind(this)
    this.renderHeader = this.renderHeader.bind(this)
  }

  componentDidMount() {
    this.vm.loadData()
  }

  render() {
    const { patient } = this.state
    const preferredContactMethod = valueHelper.makeString(patientHelper.preferredContactMethod(patient))

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
                  <Col cs={2}><label>Date of Birth</label></Col>
                  <Col xs={4}>
                    <DatePicker
                      allowBlank={true}
                      allowEdit={patientHelper.canModifyField(patient, "date_of_birth")}
                      changeDate={this.vm.changeDate}
                      date={patientHelper.dateOfBirth(patient)}
                      dateField={`dateOfBirth`}
                      style={{ width: 110 }}
                    />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Col xs={2}>Coverage Effective</Col>
                  <Col xs={4}>
                    <DatePicker
                      allowBlank={true}
                      allowEdit={patientHelper.canModifyField(patient, "coverage_effective_date")}
                      changeDate={this.vm.changeDate}
                      date={patientHelper.coverageEffectiveDate(patient)}
                      dateField={`coverageEffectiveDate`}
                      style={{ width: 110 }}
                    />
                  </Col>
                  <Col xs={2}>Coverage Ends</Col>
                  <Col xs={4}>
                    <DatePicker
                      allowBlank={true}
                      allowEdit={patientHelper.canModifyField(patient, "coverage_end_date")}
                      changeDate={this.vm.changeDate}
                      date={patientHelper.coverageEndDate(patient)}
                      dateField={`coverageEndDate`}
                      style={{ width: 110 }}
                    />
                  </Col>
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
                  <Col xs={2}><label>Preferred Contact Method</label></Col>
                  <Col xs={4}>
                    <Input
                      className="form-control"
                      disabled={!patientHelper.canModifyField(patient, "preferred_contact_method")}
                      name="preferred_contact_method"
                      onChange={this.vm.changeField}
                      readOnly={!patientHelper.canModifyField(patient, "preferred_contact_method")}
                      type="select"
                      value={preferredContactMethod}>
                      {
                        !valueHelper.isValue(
                          contactMethods.find(
                            (contactMethod) => contactMethod.value == preferredContactMethod
                          )
                        ) &&
                        <option value={preferredContactMethod}>{preferredContactMethod}</option>
                      }
                      {
                        contactMethods.map(
                          (contactMethod) => {
                            return (
                              <option key={contactMethod.value} value={contactMethod.value}>
                                {contactMethod.label}
                              </option>
                            )
                          }
                        )
                      }
                    </Input>
                  </Col>
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
