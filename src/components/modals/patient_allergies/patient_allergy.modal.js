import React, { Component } from "react"
import { Col, Container, Form, FormGroup, Row } from "reactstrap"
import { NumberFieldEditor, SelectAllergy, SelectFieldEditor, TextFieldEditor } from "../../shared"
import { PatientAllergyModalViewModel } from "../../view_models/modals/patient_allergies"
import { AprexisModal, AprexisModalHeader, aprexisWrapperModal } from "../../../containers/modals"
import { patientHelper, patientAllergyHelper, valueHelper, allergyCategories } from "@aprexis/aprexis-api-utility"

class PatientAllergyModal extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new PatientAllergyModalViewModel(
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
    const { reconnectAndRetry } = this.props
    const { patientAllergy } = this.state

    return (
      <AprexisModal
        {...this.props}
        modalClassName="patient-allergy modal-xw"
        modalFooterComponents={this.renderFooter()}
        modalHeaderComponents={this.renderHeader()}>
        <Container>
          <Row>
            <Col>
              <Form>
                <FormGroup row>
                  <SelectFieldEditor
                    changeField={this.vm.changeField}
                    fieldLabel="Type"
                    fieldName="allergy_type"
                    fieldOptions={allergyCategories}
                    helper={patientAllergyHelper}
                    model={patientAllergy}
                  />
                </FormGroup>

                <FormGroup row>
                  <TextFieldEditor
                    changeField={this.vm.changeAllergyName}
                    fieldLabel="Name"
                    fieldName="allergy_name"
                    helper={patientAllergyHelper}
                    model={patientAllergy}
                  />
                </FormGroup>

                <SelectAllergy
                  {...valueHelper.importantProps(this.props)}
                  baseFilters={{}}
                  fieldLabel="Gold Standard"
                  inForm={true}
                  id={patientAllergyHelper.goldStandardAllergyId(patientAllergy)}
                  minSearchLength={this.vm.minSearchLength()}
                  onChange={this.vm.selectGoldStandardAllergy}
                  readOnly={!patientAllergyHelper.canModifyField(patientAllergy, "gold_standard_allergy_id")}
                  reconnectAndRetry={reconnectAndRetry}
                />

                <FormGroup row>
                  <TextFieldEditor
                    area={true}
                    changeField={this.vm.changeField}
                    fieldName="reaction"
                    helper={patientAllergyHelper}
                    maxLength={1000}
                    model={patientAllergy}
                  />
                </FormGroup>

                <FormGroup row>
                  <NumberFieldEditor
                    changeField={this.vm.changeNumericField}
                    fieldName="year"
                    helper={patientAllergyHelper}
                    max={(new Date()).year}
                    min={1900}
                    model={patientAllergy}
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
    const { changedPatientAllergy, operation, patientAllergy } = this.state

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
              this.vm.submitModalCreateOrUpdate("patientAllergy", patientAllergy, changedPatientAllergy)
            }
          }>
          {valueHelper.humanize(operation)}
        </button>
      </div>
    )
  }

  renderHeader() {
    const { patient } = this.state
    const title = `Allergy for ${patientHelper.name(patient)}`

    return (
      <AprexisModalHeader title={title} />
    )
  }

  shouldComponentUpdate(nextProps, nextState) {
    this.vm.props = { ...this.vm.props, ...nextProps }
    return true
  }
}

const aprexisPatientAllergyModal = aprexisWrapperModal(PatientAllergyModal)
export { aprexisPatientAllergyModal as PatientAllergyModal }

