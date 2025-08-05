import { AbstractModalViewModel } from "../abstract.modal.vm.js"
import { patientApi, reminderApi, dateHelper, reminderHelper, reminderMedicationHelper, reminderSupplementHelper, valueHelper } from "@aprexis/aprexis-api-utility"
import { apiEnvironmentHelper, pathHelper, userCredentialsHelper } from "../../../../helpers/index.js"

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
    this.addReminderSupplement = this.addReminderSupplement.bind(this)
    this.api = this.api.bind(this)
    this.dateAndTimeFields = this.dateAndTimeFields.bind(this)
    this.fetchPatient = this.fetchPatient.bind(this)
    this.helper = this.helper.bind(this)
    this.loadData = this.loadData.bind(this)
    this.model = this.model.bind(this)
    this.modelName = this.modelName.bind(this)
    this.requiredFields = this.requiredFields.bind(this)
    this.removeReminderMedication = this.removeReminderMedication.bind(this)
    this.removeReminderSupplement = this.removeReminderSupplement.bind(this)
    this.selectReminderMedication = this.selectReminderMedication.bind(this)
    this.selectReminderSupplement = this.selectReminderSupplement.bind(this)
  }

  addReminderMedication() {
    this.changeFieldValue("addingReminderMedication", true)
  }

  addReminderSupplement() {
    this.changeFieldValue("addingReminderSupplement", true)
  }

  api() {
    return reminderApi
  }

  dateAndTimeFields() {
    return reminderDateAndTimeFields
  }

  fetchPatient(patientId, nextOperation) {
    patientApi.show(
      apiEnvironmentHelper.apiEnvironment(userCredentialsHelper.get(), this.props.reconnectAndRetry),
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

  modelName() {
    return 'reminder'
  }

  requiredFields() {
    return reminderRequiredFields
  }

  removeReminderMedication(reminderMedication) {
    this.removeEntry("reminder_medications", "medication_id", reminderMedication)
  }

  removeReminderSupplement(reminderSupplement) {
    this.removeEntry("reminder_supplements", "patient_supplement_id", reminderSupplement)
  }

  selectReminderMedication(_targetName, patientMedication) {
    this.changeFieldValue("addingReminderMedication", false)
    const reminderMedication = reminderMedicationHelper.buildFromPatientMedication(patientMedication)

    this.addEntry("reminder_medications", "medication_id", reminderMedication)
  }

  selectReminderSupplement(_targetName, patientSupplement) {
    this.changeFieldValue("addingReminderSupplement", false)
    const reminderSupplement = reminderSupplementHelper.buildFromPatientSupplement(patientSupplement)

    this.addEntry("reminder_supplements", "patient_supplement_id", reminderSupplement)
  }
}

export { ReminderModalViewModel }
