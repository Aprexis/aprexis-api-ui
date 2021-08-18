import { AbstractModalViewModel } from "../"
import { patientApi, patientPhysicianApi, physicianApi } from "../../../../api"
import {
  jsEventHelper,
  pathHelper,
  patientPhysicianHelper,
  userCredentialsHelper,
  valueHelper
} from "../../../../helpers"

const patientPhysicianDateAndTimeFields = {
}

const patientPhysicianRequiredFields = {
  patient_id: { label: "Patient", testMethod: valueHelper.isNumberValue },
  physician_id: { label: "Physician", testMethod: valueHelper.isNumberValue }
}

class PatientPhysicianModalViewModel extends AbstractModalViewModel {
  constructor(props) {
    super(props)

    this.api = this.api.bind(this)
    this.create = this.create.bind(this)
    this.dateAndTimeFields = this.dateAndTimeFields.bind(this)
    this.fetchPatient = this.fetchPatient.bind(this)
    this.fetchPhysician = this.fetchPhysician.bind(this)
    this.helper = this.helper.bind(this)
    this.loadData = this.loadData.bind(this)
    this.model = this.model.bind(this)
    this.requiredFields = this.requiredFields.bind(this)
    this.selectPhysician = this.selectPhysician.bind(this)
  }

  api() {
    return patientPhysicianApi
  }

  create(modalChangedModel) {
    patientPhysicianApi.create(
      userCredentialsHelper.getAdmin(),
      modalChangedModel,
      () => { this.toggleModal(this.props.onUpdateView) },
      this.onError
    )
  }

  dateAndTimeFields() {
    return patientPhysicianDateAndTimeFields
  }

  fetchPatient(patientId, nextOperation) {
    patientApi.show(
      userCredentialsHelper.get(),
      patientId,
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
    return patientPhysicianHelper
  }

  loadData() {
    const { operation, patientPhysician } = this.props
    this.addData({ operation, patientPhysician: this.initializeDateAndTimeValidities(patientPhysician) })

    const pathEntries = this.pathEntries()
    const addPatientAndRedraw = (patient) => {
      this.addField("patient", patient, this.redrawView)
    }
    this.fetchPatient(pathHelper.id(pathEntries, "patients"), addPatientAndRedraw)
  }

  model() {
    const { changedPatientPhysician, patientPhysician } = this.data

    return { changedModel: changedPatientPhysician, model: patientPhysician, modelName: this.modelName() }
  }

  requiredFields() {
    return patientPhysicianRequiredFields
  }

  selectPhysician(event) {
    const { value } = jsEventHelper.fromInputEvent(event)
    const addPhysicianToPatientPhysicianAndRedraw = (physician) => {
      const { patientPhysician, changedPatientPhysician } = this.data
      const updated = patientPhysicianHelper.changePhysician(patientPhysician, changedPatientPhysician, physician)
      this.addData(updated, this.redrawView)
    }

    this.fetchPhysician(value, addPhysicianToPatientPhysicianAndRedraw)
  }
}

export { PatientPhysicianModalViewModel }
