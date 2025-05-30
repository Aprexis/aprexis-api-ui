import React, { Component } from "react"
import { Col, Container, Form, FormGroup, Row } from "reactstrap"
import {
  DayFieldEditor,
  NumberFieldEditor,
  SelectFieldEditor,
  SelectMedication,
  SelectPharmacyStore,
  SelectPhysician,
  TextFieldEditor
} from "../../shared"
import { PatientMedicationModalViewModel } from "../../view_models/modals/patient_medications"
import { AprexisModal, AprexisModalHeader, aprexisWrapperModal } from "../../../containers/modals"
import { patientHelper, patientMedicationHelper, valueHelper, patientMedications } from "@aprexis/aprexis-api-utility"
import { pathHelper } from "../../../helpers"

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
    const { reconnectAndRetry } = this.props
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
                    reconnectAndRetry={reconnectAndRetry}
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
                  reconnectAndRetry={reconnectAndRetry}
                />

                <SelectMedication
                  {...valueHelper.importantProps(this.props)}
                  baseFilters={{ for_supersets: true }}
                  fieldLabel="Medication"
                  inForm={true}
                  id={patientMedicationHelper.medicationId(patientMedication)}
                  onChange={this.vm.selectMedication}
                  readOnly={!patientMedicationHelper.canModifyField(patientMedication, "medication_id")}
                  reconnectAndRetry={reconnectAndRetry}
                />

                <FormGroup row>
                  <DayFieldEditor
                    allowBlank={true}
                    changeField={this.vm.changeDate}
                    fieldLabel="Last Filled At"
                    fieldName="last_filled_at"
                    helper={patientMedicationHelper}
                    latestDate={new Date()}
                    model={patientMedication}
                  />
                </FormGroup>

                <FormGroup row>
                  <DayFieldEditor
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

                <FormGroup row>
                  <DayFieldEditor
                    allowBlank={true}
                    changeField={this.vm.changeDate}
                    fieldLabel="Removed At"
                    fieldName="removed_at"
                    helper={patientMedicationHelper}
                    latestDate={new Date()}
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
