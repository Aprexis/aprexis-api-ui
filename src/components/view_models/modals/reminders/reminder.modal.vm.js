import { AbstractModalViewModel } from "../"
import { patientApi, reminderApi } from "../../../../api"
import {
  dateHelper,
  pathHelper,
  reminderHelper,
  reminderMedicationHelper,
  userCredentialsHelper,
  valueHelper
} from "../../../../helpers"

const reminderDateAndTimeFields = {
  recur_from: { label: "Recur From", required: true, type: "date" },
  recur_to: { label: "Recur To", required: false, type: "date" },
  remind_at: { label: "Remind At", required: true, type: "time" }
}

const reminderRequiredFields = {
  action: { label: "Action", testMethod: reminderHelper.isReminderActionValue },
  recur_from: { label: "Recur From", testMethod: dateHelper.isDateValue },
  remind_at: { label: "Remind At", testMethod: dateHelper.isTimeValue },
  patient_id: { label: "Patient", testMethod: valueHelper.isNumberValue },
  type: { label: "Frequency", testMethod: reminderHelper.isReminderTypeValue }
}

class ReminderModalViewModel extends AbstractModalViewModel {
  constructor(props) {
    super(props)

    this.addReminderMedication = this.addReminderMedication.bind(this)
    this.api = this.api.bind(this)
    this.dateAndTimeFields = this.dateAndTimeFields.bind(this)
    this.fetchPatient = this.fetchPatient.bind(this)
    this.helper = this.helper.bind(this)
    this.loadData = this.loadData.bind(this)
    this.model = this.model.bind(this)
    this.requiredFields = this.requiredFields.bind(this)
    this.removeReminderMedication = this.removeReminderMedication.bind(this)
    this.selectReminderMedication = this.selectReminderMedication.bind(this)
  }

  addReminderMedication() {
    this.changeFieldValue("addingReminderMedication", true)
  }

  api() {
    return reminderApi
  }

  dateAndTimeFields() {
    return reminderDateAndTimeFields
  }

  fetchPatient(patientId, nextOperation) {
    patientApi.show(
      userCredentialsHelper.get(),
      patientId,
      nextOperation,
      this.onError
    )
  }

  helper() {
    return reminderHelper
  }

  loadData() {
    const { operation, reminder } = this.props
    this.addData({ operation, reminder: this.initializeDateAndTimeValidities(reminder) })

    const pathEntries = this.pathEntries()
    const addPatientAndRedraw = (patient) => {
      this.addField("patient", patient, this.redrawView)
    }
    this.fetchPatient(pathHelper.id(pathEntries, "patients"), addPatientAndRedraw)
  }

  model() {
    const { changedReminder, reminder } = this.data

    return { changedModel: changedReminder, model: reminder, modelName: this.modelName() }
  }

  requiredFields() {
    return reminderRequiredFields
  }

  removeReminderMedication(reminderMedication) {
    this.removeEntry("reminder_medications", "medication_id", reminderMedication)
  }

  selectReminderMedication(_targetName, patientMedication) {
    this.changeFieldValue("addingReminderMedication", false)
    const reminderMedication = reminderMedicationHelper.buildFromPatientMedication(patientMedication)

    this.addEntry("reminder_medications", "medication_id", reminderMedication)
  }
}

export { ReminderModalViewModel }
