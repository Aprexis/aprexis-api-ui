import { AbstractPageViewModel } from "../"
import { patientPhysicianApi, patientPhysicianHelper } from "@aprexis/aprexis-api-utility"
import { apiEnvironmentHelper, pathHelper, userCredentialsHelper } from "../../../../helpers"

class PatientPhysicianProfilePageViewModel extends AbstractPageViewModel {
  constructor(props) {
    super(props)

    this.editProfileModal = this.editProfileModal.bind(this)
    this.loadData = this.loadData.bind(this)
  }

  editProfileModal(patientPhysicianToEdit) {
    patientPhysicianApi.edit(
      apiEnvironmentHelper.apiEnvironment(userCredentialsHelper.get(), this.props.reconnectAndRetry),
      patientPhysicianHelper.id(patientPhysicianToEdit),
      (patientPhysician) => {
        this.props.launchModal(
          "patient-physician",
          {
            operation: "update",
            onUpdateView: this.refreshData,
            patientPhysician
          }
        )
      },
      this.onError
    )
  }

  loadData() {
    this.clearData(false)

    const userCredentials = userCredentialsHelper.get()
    const pathEntries = this.pathEntries()
    const patient_physician_id = pathHelper.pathEntryValue(pathEntries, 'patient-physicians')
    patientPhysicianApi.profile(
      apiEnvironmentHelper.apiEnvironment(userCredentials, this.props.reconnectAndRetry),
      patient_physician_id,
      (patientPhysician) => { this.addField('patientPhysician', patientPhysician, this.redrawView) },
      this.onError
    )
  }
}

export { PatientPhysicianProfilePageViewModel }
