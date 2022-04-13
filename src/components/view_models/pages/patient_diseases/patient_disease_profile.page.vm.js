import { AbstractPageViewModel } from ".."
import { patientDiseaseApi } from "../../../../api"
import { patientDiseaseHelper, userCredentialsHelper } from "../../../../helpers"

class PatientDiseaseProfilePageViewModel extends AbstractPageViewModel {
  constructor(props) {
    super(props)

    this.editProfileModal = this.editProfileModal.bind(this)
    this.loadData = this.loadData.bind(this)
  }

  editProfileModal(patientDiseaseToEdit) {
    patientDiseaseApi.edit(
      userCredentialsHelper.get(),
      patientDiseaseHelper.id(patientDiseaseToEdit),
      (patientDisease) => {
        this.props.launchModal(
          "patient-disease",
          {
            operation: "update",
            onUpdateView: this.refreshData,
            patientDisease
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
    const patient_disease_id = pathEntries['patient-diseases'].value
    patientDiseaseApi.profile(
      userCredentials,
      patient_disease_id,
      (patientDisease) => { this.addField('patientDisease', patientDisease, this.redrawView) },
      this.onError
    )
  }
}

export { PatientDiseaseProfilePageViewModel }
