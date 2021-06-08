import { AbstractPageViewModel } from "../"
import { patientApi } from "../../../../api"
import { patientHelper, userCredentialsHelper } from "../../../../helpers"

class PatientProfilePageViewModel extends AbstractPageViewModel {
  constructor(props) {
    super(props)

    this.editProfileModal = this.editProfileModal.bind(this)
    this.fetchPatient = this.fetchPatient.bind(this)
    this.loadData = this.loadData.bind(this)
    this.refreshData = this.refreshData.bind(this)
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
}

export { PatientProfilePageViewModel }
