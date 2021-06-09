import React, { Component } from "react"
import { Col, Container, Form, FormGroup, Input, Row } from "reactstrap"
import { AddressEditor, ContactEditor, DatePicker } from "../../shared"
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
                  <Col xs={2}><label>Name</label></Col>
                  <Col xs={3}>
                    <Input
                      className="form-control"
                      disabled={!patientHelper.canModifyField(patient, "first_name")}
                      name="first_name"
                      onChange={this.vm.changeField}
                      readOnly={!patientHelper.canModifyField(patient, "first_name")}
                      value={valueHelper.makeString(patientHelper.firstName(patient))}
                    />
                  </Col>
                  <Col xs={3}>
                    <Input
                      className="form-control"
                      disabled={!patientHelper.canModifyField(patient, "middle_name")}
                      name="middle_name"
                      onChange={this.vm.changeField}
                      readOnly={!patientHelper.canModifyField(patient, "middle_name")}
                      value={valueHelper.makeString(patientHelper.middleName(patient))}
                    />
                  </Col>
                  <Col xs={3}>
                    <Input
                      className="form-control"
                      disabled={!patientHelper.canModifyField(patient, "last_name")}
                      name="last_name"
                      onChange={this.vm.changeField}
                      readOnly={!patientHelper.canModifyField(patient, "last_name")}
                      value={valueHelper.makeString(patientHelper.lastName(patient))}
                    />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Col xs={2}><label>Member Number</label></Col>
                  <Col xs={4}>
                    <Input
                      className="form-control"
                      disabled={!patientHelper.canModifyField(patient, "member_number")}
                      name="member_number"
                      onChange={this.vm.changeField}
                      readOnly={!patientHelper.canModifyField(patient, "member_number")}
                      value={valueHelper.makeString(patientHelper.memberNumber(patient))}
                    />
                  </Col>
                  {
                    patientHelper.requiresPersonNumber(patient) &&
                    <React.Fragment>
                      <Col xs={2}><label>Person Number</label></Col>
                      <Col xs={4}>
                        <Input
                          className="form-control"
                          disabled={!patientHelper.canModifyField(patient, "person_number")}
                          name="person_number"
                          onChange={this.vm.changeField}
                          readOnly={!patientHelper.canModifyField(patient, "person_number")}
                          value={valueHelper.makeString(patientHelper.personNumber(patient))}
                        />
                      </Col>
                    </React.Fragment>
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
                  <Col xs={2}><label>Race</label></Col>
                  <Col xs={4}>
                    <Input
                      className="form-control"
                      disabled={!patientHelper.canModifyField(patient, "ract")}
                      name="race"
                      onChange={this.vm.changeField}
                      readOnly={!patientHelper.canModifyField(patient, "race")}
                      value={valueHelper.makeString(patientHelper.race(patient))}
                    />
                  </Col>
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
}

const aprexisPatientProfileModal = aprexisWrapperModal(PatientProfileModal)
export { aprexisPatientProfileModal as PatientProfileModal }
