import React, { Component } from "react"
import { Col, Container, Form, FormGroup, Row } from "reactstrap"
import {
  DateFieldEditor,
  NumberFieldEditor,
  SelectFieldEditor,
  SelectMedication,
  SelectPharmacyStore,
  SelectPhysician,
  TextFieldEditor
} from "../../shared"
import { PatientMedicationModalViewModel } from "../../view_models/modals/patients"
import { AprexisModal, AprexisModalHeader, aprexisWrapperModal } from "../../../containers/modals"
import { patientHelper, patientMedicationHelper, pathHelper, valueHelper } from "../../../helpers"
import { patientMedications } from "../../../types"

class PatientMedicationModal extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new PatientMedicationModalViewModel(
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
    const pathEntries = this.vm.pathEntries()
    const patientId = pathHelper.id(pathEntries, "patients")
    const pharmacyStoreId = pathHelper.id(pathEntries, "pharmacy-stores")
    const { patientMedication } = this.state

    return (
      <AprexisModal
        {...this.props}
        modalClassName="patient-medication modal-xw"
        modalFooterComponents={this.renderFooter()}
        modalHeaderComponents={this.renderHeader()}>
        <Container>
          <Row>
            <Col>
              <Form>
                <FormGroup row>
                  <SelectFieldEditor
                    changeField={this.vm.changeField}
                    fieldName="type"
                    fieldOptions={patientMedications}
                    helper={patientMedicationHelper}
                    model={patientMedication}
                  />
                </FormGroup>

                {
                  !valueHelper.isNumberValue(pharmacyStoreId) &&
                  <SelectPharmacyStore
                    {...valueHelper.importantProps(this.props)}
                    fieldLabel="Pharmacy Store"
                    inForm={true}
                    id={patientMedicationHelper.pharmacyStoreId(patientMedication)}
                    onChange={this.vm.selectPharmacyStore}
                    readOnly={!patientMedicationHelper.canModifyField(patientMedication, "pharmacy_store_id")}
                  />
                }

                <SelectPhysician
                  {...valueHelper.importantProps(this.props)}
                  baseFilters={{ for_patient: patientId }}
                  fieldLabel="Physician"
                  inForm={true}
                  id={patientMedicationHelper.physicianId(patientMedication)}
                  onChange={this.vm.selectPhysician}
                  readOnly={!patientMedicationHelper.canModifyField(patientMedication, "physician_id")}
                />

                <SelectMedication
                  {...valueHelper.importantProps(this.props)}
                  baseFilters={{ for_supersets: true }}
                  fieldLabel="Medication"
                  inForm={true}
                  id={patientMedicationHelper.medicationId(patientMedication)}
                  onChange={this.vm.selectMedication}
                  readOnly={!patientMedicationHelper.canModifyField(patientMedication, "medication_id")}
                />

                <FormGroup row>
                  <DateFieldEditor
                    allowBlank={true}
                    changeField={this.vm.changeDate}
                    fieldLabel="Filled"
                    fieldName="filled_at"
                    helper={patientMedicationHelper}
                    latestDate={new Date()}
                    model={patientMedication}
                  />
                </FormGroup>

                <FormGroup row>
                  <DateFieldEditor
                    allowBlank={true}
                    changeField={this.vm.changeDate}
                    fieldName="start_date"
                    fieldXs={3}
                    helper={patientMedicationHelper}
                    model={patientMedication}
                    style={{ width: 110 }}
                  />
                </FormGroup>

                <FormGroup row>
                  <NumberFieldEditor
                    changeField={this.vm.changeNumericField}
                    fieldName="days_supply"
                    helper={patientMedicationHelper}
                    max={365}
                    min={1}
                    model={patientMedication}
                  />
                </FormGroup>

                <FormGroup row>
                  <TextFieldEditor
                    changeField={this.vm.changeField}
                    fieldName="strength"
                    fieldXs={4}
                    helper={patientMedicationHelper}
                    model={patientMedication}
                  />
                  <TextFieldEditor
                    changeField={this.vm.changeField}
                    fieldLabel="Units"
                    fieldName="strength_units"
                    fieldXs={4}
                    helper={patientMedicationHelper}
                    model={patientMedication}
                  />
                </FormGroup>

                <FormGroup row>
                  <TextFieldEditor
                    changeField={this.vm.changeField}
                    fieldName="indication"
                    helper={patientMedicationHelper}
                    model={patientMedication}
                  />
                </FormGroup>

                <FormGroup row>
                  <TextFieldEditor
                    changeField={this.vm.changeField}
                    fieldName="directions"
                    helper={patientMedicationHelper}
                    model={patientMedication}
                  />
                </FormGroup>

                <FormGroup row>
                  <TextFieldEditor
                    changeField={this.vm.changeField}
                    fieldName="additional_information"
                    helper={patientMedicationHelper}
                    model={patientMedication}
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
    const { changedPatientMedication, operation, patientMedication } = this.state

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
              this.vm.submitModalCreateOrUpdate("patientMedication", patientMedication, changedPatientMedication)
            }
          }>
          {valueHelper.humanize(operation)}
        </button>
      </div>
    )
  }

  renderHeader() {
    const { patient } = this.state
    const title = `Medication for ${patientHelper.name(patient)}`

    return (
      <AprexisModalHeader title={title} />
    )
  }

  shouldComponentUpdate(nextProps, nextState) {
    this.vm.props = { ...this.vm.props, ...nextProps }
    return true
  }
}

const aprexisPatientMedicationModal = aprexisWrapperModal(PatientMedicationModal)
export { aprexisPatientMedicationModal as PatientMedicationModal }
