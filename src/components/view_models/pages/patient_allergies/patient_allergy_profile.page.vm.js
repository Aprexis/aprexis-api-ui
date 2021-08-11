import { AbstractPageViewModel } from "../"
import { patientAllergyApi } from "../../../../api"
import { patientAllergyHelper, userCredentialsHelper } from "../../../../helpers"

class PatientAllergyProfilePageViewModel extends AbstractPageViewModel {
  constructor(props) {
    super(props)

    this.editProfileModal = this.editProfileModal.bind(this)
    this.loadData = this.loadData.bind(this)
  }

  editProfileModal(patientAllergyToEdit) {
    patientAllergyApi.edit(
      userCredentialsHelper.get(),
      patientAllergyHelper.id(patientAllergyToEdit),
      (patientAllergy) => {
        this.props.launchModal(
          "patient-allergy",
          {
            operation: "update",
            onUpdateView: this.refreshData,
            patientAllergy
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
    const patient_allergy_id = pathEntries['patient-allergies'].value
    patientAllergyApi.profile(
      userCredentials,
      patient_allergy_id,
      (patientAllergy) => { this.addField('patientAllergy', patientAllergy, this.redrawView) },
      this.onError
    )
  }
}

export { PatientAllergyProfilePageViewModel }
