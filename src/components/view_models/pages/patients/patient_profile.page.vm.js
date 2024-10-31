import { AbstractPageViewModel } from "../"
import { patientApi, healthPlanHelper, patientHelper, valueHelper } from "@aprexis/aprexis-api-utility"
import { apiEnvironmentHelper, contextHelper, pathHelper, userCredentialsHelper } from "../../../../helpers"

class PatientProfilePageViewModel extends AbstractPageViewModel {
  constructor(props) {
    super(props)

    this.editConfigurationModal = this.editConfigurationModal.bind(this)
    this.editProfileModal = this.editProfileModal.bind(this)
    this.editSubscriberModal = this.editSubscriberModal.bind(this)
    this.fetchPatient = this.fetchPatient.bind(this)
    this.launchEditModal = this.launchEditModal.bind(this)
    this.loadData = this.loadData.bind(this)
    this.refreshData = this.refreshData.bind(this)
    this.requiresPersonNumber = this.requiresPersonNumber.bind(this)
  }

  editConfigurationModal(patientToEdit) {
    this.launchEditModal(patientToEdit, "patient-configuration", "update")
  }

  editProfileModal(patientToEdit) {
    this.launchEditModal(patientToEdit, "patient-profile", "update")
  }

  editSubscriberModal(patientToEdit) {
    this.launchEditModal(patientToEdit, "patient-subscriber", "update")
  }

  fetchPatient(nextOperation) {
    const userCredentials = userCredentialsHelper.get()
    const pathEntries = this.pathEntries()
    const patient_id = pathHelper.pathEntryValue(pathEntries, 'patients')
    patientApi.show(
      apiEnvironmentHelper.apiEnvironment(userCredentials, this.props.reconnectAndRetry),
      patient_id,
      (patient) => { this.addField('patient', patient, nextOperation) },
      this.onError
    )
  }

  launchEditModal(patientToEdit, modalType, operation) {
    patientApi.edit(
      apiEnvironmentHelper.apiEnvironment(userCredentialsHelper.get(), this.props.reconnectAndRetry),
      patientHelper.id(patientToEdit),
      (patient) => {
        this.props.launchModal(
          modalType,
          {
            operation,
            onUpdateView: this.refreshData,
            patient
          }
        )
      },
      this.onError
    )
  }

  loadData() {
    this.clearData(false)
    this.fetchPatient(this.redrawView)
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
