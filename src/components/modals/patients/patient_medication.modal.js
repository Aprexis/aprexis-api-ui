import React, { Component } from "react"
import NumericInput from 'react-numeric-input'
import { Col, Container, Form, FormGroup, Input, Row } from "reactstrap"
import { DatePicker, DateTimePicker, SelectMedication, SelectPharmacyStore, SelectPhysician } from "../../shared"
import { PatientMedicationModalViewModel } from "../../view_models/modals/patients"
import { AprexisModal, AprexisModalHeader, aprexisWrapperModal } from "../../../containers/modals"
import { patientHelper, patientMedicationHelper, pathHelper, valueHelper } from "../../../helpers"
import { patientMedications } from "../../../types"

const PatientMedicationTypeOptions = () => {
  return Object.keys(patientMedications).map(
    (id) => {
      const value = patientMedications[id]
      return (<option key={`patient-medication-type-${id}`} value={id}>{value}</option>)
    }
  )
}

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
        modalClassName="patient-medication modal-w"
        modalFooterComponents={this.renderFooter()}
        modalHeaderComponents={this.renderHeader()}>
        <Container>
          <Row>
            <Col>
              <Form>
                <FormGroup row>
                  <Col xs={2}>
                    <label>Type</label>
                  </Col>
                  <Col xs={10}>
                    <Input
                      className="form-control"
                      onChange={this.vm.changeField}
                      name="type"
                      type="select"
                      value={valueHelper.makeString(patientMedicationHelper.type(patientMedication))}>
                      <PatientMedicationTypeOptions />
                    </Input>
                  </Col>
                </FormGroup>

                {
                  !valueHelper.isNumberValue(pharmacyStoreId) &&
                  <SelectPharmacyStore
                    fieldName="Pharmacy Store"
                    inForm={true}
                    item={patientMedicationHelper.pharmacyStore(patientMedication)}
                    id={patientMedicationHelper.pharmacyStoreId(patientMedication)}
                    onChange={this.vm.selectPharmacyStore}
                  />
                }

                <SelectPhysician
                  baseFilters={{ for_patient: patientId }}
                  fieldName="Physician"
                  inForm={true}
                  item={patientMedicationHelper.physician(patientMedication)}
                  id={patientMedicationHelper.physicianId(patientMedication)}
                  onChange={this.vm.selectPhysician}
                />

                <SelectMedication
                  baseFilters={{ for_supersets: true }}
                  fieldName="Medication"
                  inForm={true}
                  item={patientMedicationHelper.medication(patientMedication)}
                  id={patientMedicationHelper.medicationId(patientMedication)}
                  onChange={this.vm.selectMedication}
                />

                <FormGroup row>
                  <Col xs={2}>
                    <label>Filled At</label>
                  </Col>
                  <Col>
                    <DateTimePicker
                      allowBlank={true}
                      allowEdit={true}
                      changeDateTime={this.vm.changeDateTime}
                      dateField="filled_at_Date"
                      dateTime={patientMedicationHelper.filledAt(patientMedication)}
                      latestDate={new Date()}
                      timeField="filled_at_Time"
                    />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Col xs={2}>
                    <label>Start Date</label>
                  </Col>
                  <Col>
                    <DatePicker
                      allowBlank={true}
                      allowEdit={true}
                      changeDate={this.vm.changeDate}
                      dateField="start_date"
                      date={patientMedicationHelper.startDate(patientMedication)}
                    />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Col xs={2}>
                    <label>Days Supply</label>
                  </Col>
                  <Col xs={10}>
                    <NumericInput
                      className="form-control"
                      max={365}
                      min={1}
                      name="days_supply"
                      onChange={this.vm.changeNumericField}
                      value={valueHelper.makeString(patientMedicationHelper.daysSupply(patientMedication))}
                    />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Col xs={2}>
                    <label>Strength</label>
                  </Col>
                  <Col xs={4}>
                    <Input
                      className="form-control"
                      name="strength"
                      onChange={this.vm.changeField}
                      value={valueHelper.makeString(patientMedicationHelper.strength(patientMedication))}
                    />
                  </Col>
                  <Col xs={2}>
                    <label>Units</label>
                  </Col>
                  <Col xs={4}>
                    <Input
                      className="form_control"
                      name="strength_units"
                      onChange={this.vm.changeField}
                      value={valueHelper.makeString(patientMedicationHelper.strengthUnits(patientMedication))}
                    />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Col xs={2}>
                    <label>Indication</label>
                  </Col>
                  <Col xs={10}>
                    <Input
                      className="form_control"
                      maxLength={255}
                      name="indication"
                      onChange={this.vm.changeField}
                      value={valueHelper.makeString(patientMedicationHelper.indication(patientMedication))}
                    />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Col xs={2}>
                    <label>Directions</label>
                  </Col>
                  <Col xs={10}>
                    <Input
                      className="form_control"
                      maxLength={255}
                      name="directions"
                      onChange={this.vm.changeField}
                      value={valueHelper.makeString(patientMedicationHelper.directions(patientMedication))}
                    />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Col xs={2}>
                    <label>Additional Information</label>
                  </Col>
                  <Col xs={10}>
                    <Input
                      className="form_control"
                      maxLength={255}
                      name="additional_information"
                      onChange={this.vm.changeField}
                      value={valueHelper.makeString(patientMedicationHelper.additionalInformation(patientMedication))}
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
    const { changedPatientMedication, operation, patientMedication } = this.state

    return (
      <div>
        <button
          className="btn btn-sm btn-secondary mr-auto"
          onClick={(event) => { this.props.toggleModal(this.props.onClearModal) }}>
          Cancel
        </button>
        <button
          className="btn btn-sm btn-primary"
          onClick={(event) => { this.vm.submitModel("patientMedication", patientMedication, changedPatientMedication) }}>
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
}

const aprexisPatientMedicationModal = aprexisWrapperModal(PatientMedicationModal)
export { aprexisPatientMedicationModal as PatientMedicationModal }
