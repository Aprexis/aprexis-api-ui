import { AbstractModalViewModel } from "../abstract.modal.vm.js"
import { patientApi, patientPhysicianApi, physicianApi, patientPhysicianHelper, valueHelper } from "@aprexis/aprexis-api-utility"
import { apiEnvironmentHelper, jsEventHelper, pathHelper, userCredentialsHelper } from "../../../../helpers/index.js"

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
    this.dateAndTimeFields = this.dateAndTimeFields.bind(this)
    this.fetchPatient = this.fetchPatient.bind(this)
    this.fetchPhysician = this.fetchPhysician.bind(this)
    this.helper = this.helper.bind(this)
    this.loadData = this.loadData.bind(this)
    this.model = this.model.bind(this)
    this.modelName = this.modelName.bind(this)
    this.requiredFields = this.requiredFields.bind(this)
    this.selectPhysician = this.selectPhysician.bind(this)
  }

  api() {
    return patientPhysicianApi
  }

  dateAndTimeFields() {
    return patientPhysicianDateAndTimeFields
  }

  fetchPatient(patientId, nextOperation) {
    patientApi.show(
      apiEnvironmentHelper.apiEnvironment(userCredentialsHelper.get(), this.props.reconnectAndRetry),
      patientId,
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

  modelName() {
    return 'patientPhysician'
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
