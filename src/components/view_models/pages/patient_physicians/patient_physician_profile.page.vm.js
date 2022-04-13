import { AbstractPageViewModel } from "../"
import { patientPhysicianApi } from "../../../../api"
import { patientPhysicianHelper, userCredentialsHelper } from "../../../../helpers"

class PatientPhysicianProfilePageViewModel extends AbstractPageViewModel {
  constructor(props) {
    super(props)

    this.editProfileModal = this.editProfileModal.bind(this)
    this.loadData = this.loadData.bind(this)
  }

  editProfileModal(patientPhysicianToEdit) {
    patientPhysicianApi.edit(
      userCredentialsHelper.get(),
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
    const patient_physician_id = pathEntries['patient-physicians'].value
    patientPhysicianApi.profile(
      userCredentials,
      patient_physician_id,
      (patientPhysician) => { this.addField('patientPhysician', patientPhysician, this.redrawView) },
      this.onError
    )
  }
}

export { PatientPhysicianProfilePageViewModel }
