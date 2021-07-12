import { AbstractPageViewModel } from "../"
import { patientApi } from "../../../../api"
import {
  contextHelper,
  healthPlanHelper,
  pathHelper,
  patientHelper,
  userCredentialsHelper,
  valueHelper
} from "../../../../helpers"

class PatientProfilePageViewModel extends AbstractPageViewModel {
  constructor(props) {
    super(props)

    this.editProfileModal = this.editProfileModal.bind(this)
    this.fetchPatient = this.fetchPatient.bind(this)
    this.loadData = this.loadData.bind(this)
    this.refreshData = this.refreshData.bind(this)
    this.requiresPersonNumber = this.requiresPersonNumber.bind(this)
  }

  editProfileModal(patientToEdit) {
    patientApi.edit(
      userCredentialsHelper.get(),
      patientHelper.id(patientToEdit),
      (patient) => {
        this.props.launchModal(
          "patient-profile",
          {
            operation: "update",
            onUpdateView: this.refreshData,
            patient
          }
        )
      },
      this.onError
    )
  }

  fetchPatient(nextOperation) {
    const userCredentials = userCredentialsHelper.get()
    const pathEntries = this.pathEntries()
    const patient_id = pathEntries['patients'].value
    patientApi.show(
      userCredentials,
      patient_id,
      (patient) => { this.addField('patient', patient, nextOperation) },
      this.onError
    )
  }

  loadData() {
    this.clearData(false)
    this.fetchPatient(this.redraw)
  }

  refreshData() {
    this.fetchPatient(this.redrawView)
  }

  requiresPersonNumber() {
    if (!pathHelper.isSingular(this.pathEntries(), "health-plans")) {
      return false
    }

    const healthPlan = contextHelper.currentContext()['health-plans']
    return valueHelper.isSet(healthPlanHelper.requiresPersonNumber(healthPlan))
  }
}

export { PatientProfilePageViewModel }
