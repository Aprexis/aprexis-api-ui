import { AbstractModalViewModel } from "../"
import { medicationApi, patientApi, patientMedicationApi, pharmacyStoreApi, physicianApi } from "../../../../api"
import {
  jsEventHelper,
  pathHelper,
  patientMedicationHelper,
  userCredentialsHelper,
  valueHelper
} from "../../../../helpers"

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

    this.create = this.create.bind(this)
    this.dateAndTimeFields = this.dateAndTimeFields.bind(this)
    this.fetchMedication = this.fetchMedication.bind(this)
    this.fetchPatient = this.fetchPatient.bind(this)
    this.fetchPharmacyStore = this.fetchPharmacyStore.bind(this)
    this.fetchPhysician = this.fetchPhysician.bind(this)
    this.helper = this.helper.bind(this)
    this.loadData = this.loadData.bind(this)
    this.model = this.model.bind(this)
    this.requiredFields = this.requiredFields.bind(this)
    this.selectMedication = this.selectMedication.bind(this)
    this.selectPharmacyStore = this.selectPharmacyStore.bind(this)
    this.selectPhysician = this.selectPhysician.bind(this)
    this.submitModel = this.submitModal.bind(this)
    this.update = this.update.bind(this)
  }

  create(modalChangedModel) {
    patientMedicationApi.create(
      userCredentialsHelper.getAdmin(),
      modalChangedModel,
      () => { this.toggleModal(this.props.onUpdateView) },
      this.onError
    )
  }

  dateAndTimeFields() {
    return patientMedicationDateAndTimeFields
  }

  fetchMedication(medicationId, nextOperation) {
    medicationApi.show(
      userCredentialsHelper.get(),
      medicationId,
      nextOperation,
      this.onError
    )
  }

  fetchPatient(patientId, nextOperation) {
    patientApi.show(
      userCredentialsHelper.get(),
      patientId,
      nextOperation,
      this.onError
    )
  }

  fetchPharmacyStore(pharmacyStoreId, nextOperation) {
    pharmacyStoreApi.show(
      userCredentialsHelper.get(),
      pharmacyStoreId,
      nextOperation,
      this.onError
    )
  }

  fetchPhysician(physicianId, nextOperation) {
    physicianApi.show(
      userCredentialsHelper.get(),
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

    return { changedModel: changedPatientMedication, model: patientMedication, modelName: "patientMedication" }
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

  submitModal(modalModelName, modalModel, modalChangedModel) {
    if (modalModelName != "patientMedication") {
      this.onError(`Unrecognized patient medication model ${modalModelName}`)
      return
    }
    if (!this.checkRequiredFields(modalModel) || !this.checkValidDatesAndTimes(modalModel)) {
      this.redrawView()
      return
    }

    const { operation } = this.props
    switch (operation) {
      case 'create':
        this.create(modalChangedModel)
        return

      case 'update':
        this.update(modalChangedModel)
        return

      default:
        this.onError(`Unrecognized patient medication operation ${operation}`)
    }
  }

  update(modalChangedModel) {
    patientMedicationApi.update(
      userCredentialsHelper.getAdmin(),
      modalChangedModel,
      () => { this.toggleModal(this.props.onUpdateView) },
      this.onError
    )
  }
}

export { PatientMedicationModalViewModel }
