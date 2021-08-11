import { AbstractPageViewModel } from "../"
import { medicalClaimApi } from "../../../../api"
import { userCredentialsHelper } from "../../../../helpers"

class MedicalClaimProfilePageViewModel extends AbstractPageViewModel {
  constructor(props) {
    super(props)

    this.loadData = this.loadData.bind(this)
  }

  loadData() {
    this.clearData(false)

    const userCredentials = userCredentialsHelper.get()
    const pathEntries = this.pathEntries()
    const patient_allergy_id = pathEntries['medical-claims'].value
    medicalClaimApi.profile(
      userCredentials,
      patient_allergy_id,
      (medicalClaim) => { this.addField('medicalClaim', medicalClaim, this.redrawView) },
      this.onError
    )
  }
}

export { MedicalClaimProfilePageViewModel }
