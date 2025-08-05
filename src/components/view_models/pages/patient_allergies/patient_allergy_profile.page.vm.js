import { AbstractPageViewModel } from "../abstract.page.vm.js"
import { patientAllergyApi, patientAllergyHelper } from "@aprexis/aprexis-api-utility"
import { apiEnvironmentHelper, pathHelper, userCredentialsHelper } from "../../../../helpers/index.js"

class PatientAllergyProfilePageViewModel extends AbstractPageViewModel {
  constructor(props) {
    super(props)

    this.editProfileModal = this.editProfileModal.bind(this)
    this.loadData = this.loadData.bind(this)
  }

  editProfileModal(patientAllergyToEdit) {
    patientAllergyApi.edit(
      apiEnvironmentHelper.apiEnvironment(userCredentialsHelper.get(), this.props.reconnectAndRetry),
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
    const patient_allergy_id = pathHelper.pathEntryValue(pathEntries, 'patient-allergies')
    patientAllergyApi.profile(
      apiEnvironmentHelper.apiEnvironment(userCredentials, this.props.reconnectAndRetry),
      patient_allergy_id,
      (patientAllergy) => { this.addField('patientAllergy', patientAllergy, this.redrawView) },
      this.onError
    )
  }
}

export { PatientAllergyProfilePageViewModel }
