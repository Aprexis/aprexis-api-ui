import { Component } from "react"
import { Col, Container, Form, FormGroup, Row } from "reactstrap"
import {
  AddressEditor,
  BooleanFieldEditor,
  ContactEditor,
  SelectFieldEditor,
  TextFieldEditor
} from "../../shared/index.js"
import { CaregiverModalViewModel } from "../../view_models/modals/caregivers/index.js"
import { AprexisModal, AprexisModalHeader, aprexisWrapperModal } from "../../../containers/modals/index.js"
import { caregiverHelper, valueHelper, relationships } from "@aprexis/aprexis-api-utility"

class CaregiverModal extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new CaregiverModalViewModel(
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
    const { caregiver } = this.state

    return (
      <AprexisModal
        {...this.props}
        modalClassName="caregiver-profile modal-xw"
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
                    fieldXs={5}
                    helper={caregiverHelper}
                    model={caregiver}
                  />
                  <TextFieldEditor
                    changeField={this.vm.changeField}
                    fieldName="last_name"
                    fieldXs={5}
                    helper={caregiverHelper}
                    model={caregiver}
                    omitLabel={true}
                  />
                </FormGroup>

                <FormGroup row>
                  <Col xs={2} />
                  <BooleanFieldEditor
                    changeField={this.vm.changeField}
                    fieldLabel="Current"
                    fieldName="is_current_caregiver"
                    fieldXs={4}
                    helper={caregiverHelper}
                    model={caregiver}
                  />
                  <SelectFieldEditor
                    changeField={this.vm.changeField}
                    fieldName="relationship"
                    fieldXs={5}
                    fieldOptions={relationships}
                    helper={caregiverHelper}
                    model={caregiver}
                  />
                </FormGroup>

                <FormGroup row>
                  <Col xs={2} />
                  <BooleanFieldEditor
                    changeField={this.vm.changeField}
                    fieldName="use_patient_address"
                    fieldXs={4}
                    helper={caregiverHelper}
                    model={caregiver}
                  />
                </FormGroup>

                {
                  !valueHelper.isSet(caregiverHelper.usePatientAddress(caregiver)) &&
                  <AddressEditor
                    addressable={caregiver}
                    allowEdit={caregiverHelper.canModifyField(caregiver, "address")}
                    onChangeField={this.vm.changeField}
                  />
                }

                <ContactEditor
                  allowEdit={caregiverHelper.canModifyField(caregiver, "contact")}
                  allowMobile={true}
                  allowPerson={false}
                  contactable={caregiver}
                  onChangeField={this.vm.changeField}
                />
              </Form>
            </Col>
          </Row>
        </Container>
      </AprexisModal>
    )
  }

  renderFooter() {
    const { changedCaregiver, clearModal, operation, caregiver } = this.state

    return (
      <div>
        <button
          className="btn btn-sm btn-secondary mr-auto"
          onClick={(event) => { this.vm.toggleModal(clearModal) }}>
          Cancel
        </button>
        <button
          className="btn btn-sm btn-primary"
          onClick={(event) => { this.vm.submitModalCreateOrUpdate("caregiver", caregiver, changedCaregiver) }}>
          {valueHelper.humanize(operation)}
        </button>
      </div>
    )
  }

  renderHeader() {
    const { caregiver } = this.state
    const title = `Profile for ${caregiverHelper.name(caregiver)}`

    return (
      <AprexisModalHeader title={title} />
    )
  }

  shouldComponentUpdate(nextProps, nextState) {
    this.vm.props = { ...this.vm.props, ...nextProps }
    return true
  }
}

const aprexisCaregiverModal = aprexisWrapperModal(CaregiverModal)
export { aprexisCaregiverModal as CaregiverModal }
