import React, { Component } from "react"
import { faPlus, faTrashAlt } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Col, Container, Form, FormGroup, Row } from "reactstrap"
import {
  AprexisTable,
  BooleanFieldEditor,
  DayFieldEditor,
  NumberFieldEditor,
  SelectFieldEditor,
  SelectPatientMedication,
  SelectPatientSupplement,
  TextFieldEditor,
  TimeFieldEditor
} from "../../shared"
import { ReminderModalViewModel } from "../../view_models/modals/reminders"
import { AprexisModal, AprexisModalHeader, aprexisWrapperModal } from "../../../containers/modals"
import { patientHelper, reminderHelper, reminderMedicationHelper, reminderSupplementHelper, valueHelper } from "../../../helpers"
import { reminderActions, reminderTypes, timeZones } from "../../../types"

const medicationHeadings = ["Label", ""]
const supplementHeadings = ["Name", "Physician Name", "Physician NPI", ""]

const ReminderMonthlyFrequency = ({ changeNumericField, isRequired, reminder }) => {
  return (
    <FormGroup row>
      <NumberFieldEditor
        changeField={changeNumericField}
        fieldName="day_of_month"
        helper={reminderHelper}
        model={reminder}
        min={1}
        max={31}
        required={isRequired("day_of_month")}
      />
    </FormGroup>
  )
}

const ReminderWeeklyFrequency = ({ changeField, isRequired, reminder }) => {
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'].map(
    (dayOfWeek) => {
      return (
        <BooleanFieldEditor
          key={`weekly-${dayOfWeek}`}
          changeField={changeField}
          fieldName={dayOfWeek}
          helper={reminderHelper}
          model={reminder}
          required={isRequired(dayOfWeek)}
        />
      )
    }
  )

  return (
    <FormGroup row><Col xs="1">On Days</Col>{days}</FormGroup>
  )
}

const ReminderFrequency = ({ changeField, changeNumericField, isRequired, reminder }) => {
  switch (reminderHelper.type(reminder)) {
    case 'WeeklyReminder':
      return (
        <ReminderWeeklyFrequency
          changeField={changeField}
          isRequired={isRequired}
          reminder={reminder}
        />
      )

    case 'MonthlyReminder':
      return (
        <ReminderMonthlyFrequency
          changeNumericField={changeNumericField}
          isRequired={isRequired}
          reminder={reminder}
        />
      )

    default:
  }

  return (<React.Fragment />)
}

const ReminderMedicationsTable = ({ reminder, removeReminderMedication }) => {
  const reminderMedications = reminderHelper.reminderMedications(reminder)

  return (
    <AprexisTable
      data={reminderMedicationRows(reminderMedications, removeReminderMedication)}
      headings={medicationHeadings}
    />
  )

  function reminderMedicationRows(reminderMedications, removeReminderMedication) {
    if (!valueHelper.isValue(reminderMedications)) {
      return []
    }

    return reminderMedications.map(
      (reminderMedication) => {
        return [
          reminderMedicationHelper.medicationLabel(reminderMedication),
          <td>
            <button
              type="button"
              onClick={(_event) => { removeReminderMedication(reminderMedication) }}>
              <FontAwesomeIcon icon={faTrashAlt} />
            </button>
          </td>
        ]
      }
    )
  }
}

const ReminderMedicationsTitle = ({ reminder, addReminderMedication }) => {
  if (valueHelper.isSet(reminderHelper.addingReminderMedication(reminder))) {
    return (<h3>Medications</h3>)
  }

  return (
    <h3>
      Medications
      <button
        className="btn btn-sm"
        type="button"
        onClick={addReminderMedication}>
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </h3>
  )
}

const ReminderNewMedication = ({ patient, props, reminder, selectReminderMedication }) => {
  if (!valueHelper.isSet(reminderHelper.addingReminderMedication(reminder))) {
    return (<React.Fragment />)
  }

  return (
    <SelectPatientMedication
      {...valueHelper.importantProps(props)}
      baseFilters={{ for_supersets: true }}
      fieldLabel="New Medication"
      inForm={true}
      patient_id={patientHelper.id(patient)}
      onChange={selectReminderMedication}
    />
  )
}

const ReminderMedications = ({ addReminderMedication, patient, props, reminder, removeReminderMedication, selectReminderMedication }) => {
  return (
    <React.Fragment>
      <ReminderNewMedication
        patient={patient}
        props={props}
        reminder={reminder}
        selectReminderMedication={selectReminderMedication}
      />
      <ReminderMedicationsTitle reminder={reminder} addReminderMedication={addReminderMedication} />
      <ReminderMedicationsTable reminder={reminder} removeReminderMedication={removeReminderMedication} />
    </React.Fragment>
  )
}

const ReminderSupplementsTable = ({ reminder, removeReminderSupplement }) => {
  const reminderSupplements = reminderHelper.reminderSupplements(reminder)

  return (
    <AprexisTable
      data={reminderSupplementRows(reminderSupplements, removeReminderSupplement)}
      headings={supplementHeadings}
    />
  )

  function reminderSupplementRows(reminderSupplements, removeReminderSupplement) {
    if (!valueHelper.isValue(reminderSupplements)) {
      return []
    }

    return reminderSupplements.map(
      (reminderSupplement) => {
        return [
          reminderSupplementHelper.patientSupplementName(reminderSupplement),
          reminderSupplementHelper.patientSupplementPhysicianName(reminderSupplement),
          reminderSupplementHelper.patientSupplementPhysicianNpi(reminderSupplement),
          <td>
            <button
              type="button"
              onClick={(_event) => { removeReminderSupplement(reminderSupplement) }}>
              <FontAwesomeIcon icon={faTrashAlt} />
            </button>
          </td>
        ]
      }
    )
  }
}

const ReminderSupplementsTitle = ({ reminder, addReminderSupplement }) => {
  if (valueHelper.isSet(reminderHelper.addingReminderSupplement(reminder))) {
    return (<h3>Supplements</h3>)
  }

  return (
    <h3>
      Supplements
      <button
        className="btn btn-sm"
        type="button"
        onClick={addReminderSupplement}>
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </h3>
  )
}

const ReminderNewSupplement = ({ patient, props, reminder, selectReminderSupplement }) => {
  if (!valueHelper.isSet(reminderHelper.addingReminderSupplement(reminder))) {
    return (<React.Fragment />)
  }

  return (
    <SelectPatientSupplement
      {...valueHelper.importantProps(props)}
      baseFilters={{ for_supersets: true }}
      fieldLabel="New Supplement"
      inForm={true}
      patient_id={patientHelper.id(patient)}
      onChange={selectReminderSupplement}
    />
  )
}

const ReminderSupplements = ({ addReminderSupplement, patient, props, reminder, removeReminderSupplement, selectReminderSupplement }) => {
  return (
    <React.Fragment>
      <ReminderNewSupplement
        patient={patient}
        props={props}
        reminder={reminder}
        selectReminderSupplement={selectReminderSupplement}
      />
      <ReminderSupplementsTitle reminder={reminder} addReminderSupplement={addReminderSupplement} />
      <ReminderSupplementsTable reminder={reminder} removeReminderSupplement={removeReminderSupplement} />
    </React.Fragment>
  )
}

class ReminderModal extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new ReminderModalViewModel(
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
    const { reminder } = this.state

    return (
      <AprexisModal
        {...this.props}
        modalClassName="reminder modal-xw"
        modalFooterComponents={this.renderFooter()}
        modalHeaderComponents={this.renderHeader()}>
        <Container>
          <Row>
            <Col>
              <Form>
                <FormGroup row>
                  <SelectFieldEditor
                    changeField={this.vm.changeField}
                    fieldLabel="Frequency"
                    fieldName="type"
                    fieldOptions={{ "": "", ...reminderTypes }}
                    fieldXs={4}
                    helper={reminderHelper}
                    method="type"
                    model={reminder}
                    required={this.vm.isRequired("type")}
                  />
                  <SelectFieldEditor
                    changeField={this.vm.changeField}
                    fieldLabel="Action"
                    fieldName="action"
                    fieldOptions={{ "": "", ...reminderActions }}
                    fieldXs={4}
                    helper={reminderHelper}
                    method="type"
                    model={reminder}
                    required={this.vm.isRequired("action")}
                  />
                </FormGroup>

                <FormGroup row>
                  <DayFieldEditor
                    allowBlank={false}
                    changeField={this.vm.changeDate}
                    fieldLabel="Recur From"
                    fieldName="recur_from"
                    fieldXs={4}
                    helper={reminderHelper}
                    earliestDate={new Date()}
                    model={reminder}
                    required={this.vm.isRequired("recur_from")}
                  />
                  <DayFieldEditor
                    allowBlank={true}
                    changeField={this.vm.changeDate}
                    fieldLabel="Recur To"
                    fieldName="recur_to"
                    fieldXs={4}
                    helper={reminderHelper}
                    earliestDate={new Date()}
                    model={reminder}
                    required={this.vm.isRequired("recur_to")}
                  />
                </FormGroup>

                <FormGroup row>
                  <TimeFieldEditor
                    allowBlank={false}
                    changeField={this.vm.changeTime}
                    fieldLabel="Remind At"
                    fieldName="remind_at"
                    fieldXs={4}
                    helper={reminderHelper}
                    model={reminder}
                    required={this.vm.isRequired("remind_at")}
                  />
                  <SelectFieldEditor
                    allowBlank={true}
                    changeField={this.vm.changeField}
                    fieldLabel="Time Zone"
                    fieldName="remind_at_time_zone"
                    fieldOptions={["", ...Object.keys(timeZones)]}
                    fieldXs={4}
                    helper={reminderHelper}
                    method="type"
                    model={reminder}
                    required={this.vm.isRequired("remind_at_time_zone")}
                  />
                </FormGroup>

                <FormGroup row>
                  <TextFieldEditor
                    changeField={this.vm.changeField}
                    email={true}
                    fieldName="email_address"
                    helper={reminderHelper}
                    model={reminder}
                    required={this.vm.isRequired("email_address")}
                  />
                </FormGroup>

                <FormGroup row>
                  <TextFieldEditor
                    changeField={this.vm.changeField}
                    fieldLabel="Voice Phone"
                    fieldName="voice_number"
                    fieldXs={4}
                    phone={true}
                    helper={reminderHelper}
                    model={reminder}
                    required={this.vm.isRequired("voice_number")}
                  />
                  <TextFieldEditor
                    changeField={this.vm.changeField}
                    fieldLabel="SMS Text"
                    fieldName="txt_number"
                    fieldXs={4}
                    phone={true}
                    helper={reminderHelper}
                    model={reminder}
                    required={this.vm.isRequired("txt_number")}
                  />
                </FormGroup>

                <ReminderFrequency
                  changeField={this.vm.changeField}
                  changeNumericField={this.vm.changeNumericField}
                  isRequired={this.vm.isRequired}
                  reminder={reminder}
                />

                <ReminderMedications
                  addReminderMedication={this.vm.addReminderMedication}
                  patient={this.state.patient}
                  props={this.props}
                  reminder={reminder}
                  removeReminderMedication={this.vm.removeReminderMedication}
                  selectReminderMedication={this.vm.selectReminderMedication}
                />

                <ReminderSupplements
                  addReminderSupplement={this.vm.addReminderSupplement}
                  patient={this.state.patient}
                  props={this.props}
                  reminder={reminder}
                  removeReminderSupplement={this.vm.removeReminderSupplement}
                  selectReminderSupplement={this.vm.selectReminderSupplement}
                />
              </Form>
            </Col>
          </Row>
        </Container>
      </AprexisModal>
    )
  }

  renderFooter() {
    const { clearModal } = this.props
    const { changedReminder, operation, reminder } = this.state

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
              this.vm.submitModalCreateOrUpdate("reminder", reminder, changedReminder)
            }
          }>
          {valueHelper.humanize(operation)}
        </button>
      </div>
    )
  }

  renderHeader() {
    const { patient } = this.state
    const title = `Reminder for ${patientHelper.name(patient)}`

    return (
      <AprexisModalHeader title={title} />
    )
  }

  shouldComponentUpdate(nextProps, nextState) {
    this.vm.props = { ...this.vm.props, ...nextProps }
    return true
  }
}

const aprexisReminderModal = aprexisWrapperModal(ReminderModal)
export { aprexisReminderModal as ReminderModal }
