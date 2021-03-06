import React, { Component } from "react"
import { Col, Container, Form, FormGroup, Row } from "reactstrap"
import {
  BooleanFieldEditor,
  NumberFieldEditor,
  TextFieldEditor
} from "../../shared"
import { PatientConfigurationModalViewModel } from "../../view_models/modals/patients"
import { AprexisModal, AprexisModalHeader, aprexisWrapperModal } from "../../../containers/modals"
import { patientHelper, valueHelper } from "../../../helpers"

class PatientConfigurationModal extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new PatientConfigurationModalViewModel(
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

    return (
      <AprexisModal
        {...this.props}
        modalClassName="patient-configuration modal-xw"
        modalFooterComponents={this.renderFooter()}
        modalHeaderComponents={this.renderHeader()}>
        <Container>
          <Row>
            <Col>
              <Form>
                <FormGroup row>
                  <Col xs={2} />
                  <BooleanFieldEditor
                    changeField={this.vm.changeField}
                    fieldName="cognitively_impaired"
                    fieldXs={3}
                    helper={patientHelper}
                    model={patient}
                  />
                  <Col xs={2} />
                  <BooleanFieldEditor
                    changeField={this.vm.changeField}
                    fieldName="no_known_allergies"
                    fieldXs={3}
                    helper={patientHelper}
                    model={patient}
                  />
                </FormGroup>

                <FormGroup row>
                  {
                    /*
                      FIXME:
                      Ideally, this should be a number field editor, but the anonymizer produces values that
                      are non-numeric. That's actually an error, but we have to deal with it for now.
                    */
                  }
                  <TextFieldEditor
                    changeField={this.vm.changeField}
                    fieldName="primary_care_provider_npi"
                    helper={patientHelper}
                    model={patient}
                  />
                </FormGroup>

                <FormGroup row>
                  <NumberFieldEditor
                    changeField={this.vm.changeNumericField}
                    cols={3}
                    fieldName="latitude"
                    fieldXs={4}
                    helper={patientHelper}
                    max={90}
                    min={-90}
                    model={patient}
                  />
                  <NumberFieldEditor
                    changeField={this.vm.changeNumericField}
                    cols={4}
                    fieldName="longitude"
                    fieldXs={4}
                    helper={patientHelper}
                    max={180}
                    min={-180}
                    model={patient}
                  />
                </FormGroup>
              </Form>
            </Col>
          </Row>
        </Container>
      </AprexisModal >
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
    const title = `Configuration for ${patientHelper.name(patient)}`

    return (
      <AprexisModalHeader title={title} />
    )
  }

  shouldComponentUpdate(nextProps, nextState) {
    this.vm.props = { ...this.vm.props, ...nextProps }
    return true
  }
}

const aprexisPatientConfigurationModal = aprexisWrapperModal(PatientConfigurationModal)
export { aprexisPatientConfigurationModal as PatientConfigurationModal }
