import { AbstractModalViewModel } from "../"
import { patientApi, patientMedicationApi, pharmacyStoreApi, medicationApi, physicianApi, patientMedicationHelper, valueHelper } from "@aprexis/aprexis-api-utility"
import { apiEnvironmentHelper, jsEventHelper, pathHelper, userCredentialsHelper } from "../../../../helpers"

const patientMedicationDateAndTimeFields = {
  filled_at: { label: "Filled At", required: false, type: "date/time" },
  start_date: { label: "Start Date", required: false, type: "date" }
}

const patientMedicationRequiredFields = {
  medication_id: { label: "Medication", testMethod: valueHelper.isNumberValue },
  patient_id: { label: "Patient", testMethod: valueHelper.isNumberValue },
  type: { label: "Patient Medication Type", testMethod: valueHelper.isStringValue }
}

class PatientMedicationModalViewModel extends AbstractModalViewModel {
  constructor(props) {
    super(props)

    this.api = this.api.bind(this)
    this.dateAndTimeFields = this.dateAndTimeFields.bind(this)
    this.fetchMedication = this.fetchMedication.bind(this)
    this.fetchPatient = this.fetchPatient.bind(this)
    this.fetchPharmacyStore = this.fetchPharmacyStore.bind(this)
    this.fetchPhysician = this.fetchPhysician.bind(this)
    this.helper = this.helper.bind(this)
    this.loadData = this.loadData.bind(this)
    this.model = this.model.bind(this)
    this.modelName = this.modelName.bind(this)
    this.requiredFields = this.requiredFields.bind(this)
    this.selectMedication = this.selectMedication.bind(this)
    this.selectPharmacyStore = this.selectPharmacyStore.bind(this)
    this.selectPhysician = this.selectPhysician.bind(this)
  }

  api() {
    return patientMedicationApi
  }

  dateAndTimeFields() {
    return patientMedicationDateAndTimeFields
  }

  fetchMedication(medicationId, nextOperation) {
    medicationApi.show(
      apiEnvironmentHelper.apiEnvironment(userCredentialsHelper.get(), this.props.reconnectAndRetry),
      medicationId,
      nextOperation,
      this.onError
    )
  }

  fetchPatient(patientId, nextOperation) {
    patientApi.show(
      apiEnvironmentHelper.apiEnvironment(userCredentialsHelper.get(), this.props.reconnectAndRetry),
      patientId,
      nextOperation,
      this.onError
    )
  }

  fetchPharmacyStore(pharmacyStoreId, nextOperation) {
    pharmacyStoreApi.show(
      apiEnvironmentHelper.apiEnvironment(userCredentialsHelper.get(), this.props.reconnectAndRetry),
      pharmacyStoreId,
      nextOperation,
      this.onError
    )
  }

  fetchPhysician(physicianId, nextOperation) {
    physicianApi.show(
      apiEnvironmentHelper.apiEnvironment(userCredentialsHelper.get(), this.props.reconnectAndRetry),
      physicianId,
      nextOperation,
      this.onError
    )
  }

  helper() {
    return patientMedicationHelper
  }

  loadData() {
    const { operation, patientMedication } = this.props
    this.addData({ operation, patientMedication: this.initializeDateAndTimeValidities(patientMedication) })

    const pathEntries = this.pathEntries()
    const addPatientAndRedraw = (patient) => {
      this.addField("patient", patient, this.redrawView)
    }
    this.fetchPatient(pathHelper.id(pathEntries, "patients"), addPatientAndRedraw)
  }

  model() {
    const { changedPatientMedication, patientMedication } = this.data

    return { changedModel: changedPatientMedication, model: patientMedication, modelName: this.modelName() }
  }

  modelName() {
    return 'patientMedication'
  }

  requiredFields() {
    return patientMedicationRequiredFields
  }

  selectMedication(event) {
    const { value } = jsEventHelper.fromInputEvent(event)
    const addMedicationToPatientMedicationAndRedraw = (medication) => {
      const { patientMedication, changedPatientMedication } = this.data
      const updated = patientMedicationHelper.changeMedication(patientMedication, changedPatientMedication, medication)
      this.addData(updated, this.redrawView)
    }

    this.fetchMedication(value, addMedicationToPatientMedicationAndRedraw)
  }

  selectPharmacyStore(event) {
    const { value } = jsEventHelper.fromInputEvent(event)
    const addPharmacyStoreToPatientMedicationAndRedraw = (pharmacyStore) => {
      const { patientMedication, changedPatientMedication } = this.data
      const updated = patientMedicationHelper.changePharmacyStore(patientMedication, changedPatientMedication, pharmacyStore)
      this.addData(updated, this.redrawView)
    }

    this.fetchPharmacyStore(value, addPharmacyStoreToPatientMedicationAndRedraw)
  }

  selectPhysician(event) {
    const { value } = jsEventHelper.fromInputEvent(event)
    const addPhysicianToPatientMedicationAndRedraw = (physician) => {
      const { patientMedication, changedPatientMedication } = this.data
      const updated = patientMedicationHelper.changePhysician(patientMedication, changedPatientMedication, physician)
      this.addData(updated, this.redrawView)
    }

    this.fetchPhysician(value, addPhysicianToPatientMedicationAndRedraw)
  }
}

export { PatientMedicationModalViewModel }
