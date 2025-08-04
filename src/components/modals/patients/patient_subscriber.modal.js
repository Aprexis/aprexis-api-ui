import { Component } from "react"
import { Col, Container, Form, FormGroup, Row } from "reactstrap"
import { AddressEditor, DayFieldEditor, TextFieldEditor } from "../../shared/index.js"
import { PatientSubscriberModalViewModel } from "../../view_models/modals/patients/index.js"
import { AprexisModal, AprexisModalHeader, aprexisWrapperModal } from "../../../containers/modals/index.js"
import { patientHelper, valueHelper, contactMethods } from "@aprexis/aprexis-api-utility"

class PatientSubscriberModal extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new PatientSubscriberModalViewModel(
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
        modalClassName="patient-subscriber modal-xw"
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
                    fieldName="subscriber_name"
                    helper={patientHelper}
                    model={patient}
                  />
                </FormGroup>

                <FormGroup row>
                  <DayFieldEditor
                    allowBlank={true}
                    changeField={this.vm.changeDate}
                    fieldLabel="Date of Birth"
                    fieldName="date_of_birth"
                    fieldXs={3}
                    helper={patientHelper}
                    model={patient}
                    prefix="subscriber"
                    style={{ width: 110 }}
                  />
                </FormGroup>

                <AddressEditor
                  addressable={patient}
                  allowEdit={patientHelper.canModifyField(patient, "subscriber_address")}
                  onChangeField={this.vm.changeField}
                  prefix="subscriber"
                />

                <FormGroup row>
                  <TextFieldEditor
                    changeField={this.vm.changeField}
                    fieldLabel="Gender"
                    fieldName="gender"
                    helper={patientHelper}
                    model={patient}
                    prefix="subcriber"
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
    const title = `Subscriber for ${patientHelper.name(patient)}`

    return (
      <AprexisModalHeader title={title} />
    )
  }

  shouldComponentUpdate(nextProps, nextState) {
    this.vm.props = { ...this.vm.props, ...nextProps }
    return true
  }
}

const aprexisPatientSubscriberModal = aprexisWrapperModal(PatientSubscriberModal)
export { aprexisPatientSubscriberModal as PatientSubscriberModal }
