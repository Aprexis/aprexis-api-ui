import { AbstractPageViewModel } from "../"
import { patientAllergyApi } from "../../../../api"
import { userCredentialsHelper } from "../../../../helpers"

class PatientAllergyProfilePageViewModel extends AbstractPageViewModel {
  constructor(props) {
    super(props)

    this.loadData = this.loadData.bind(this)
  }

  loadData() {
    this.clearData(false)

    const userCredentials = userCredentialsHelper.get()
    const pathEntries = this.pathEntries()
    const patient_allergy_id = pathEntries['patient-allergies'].value
    patientAllergyApi.profile(
      userCredentials,
      patient_allergy_id,
      (patientAllergy) => { this.addField('patientAllergy', patientAllergy, this.redraw) },
      this.onError
    )
  }
}

export { PatientAllergyProfilePageViewModel }
