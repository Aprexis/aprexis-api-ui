import { AbstractPageViewModel } from "../"
import { pharmacyClaimApi } from "../../../../api"
import { userCredentialsHelper } from "../../../../helpers"

class PharmacyClaimProfilePageViewModel extends AbstractPageViewModel {
  constructor(props) {
    super(props)

    this.loadData = this.loadData.bind(this)
  }

  loadData() {
    this.clearData(false)

    const userCredentials = userCredentialsHelper.get()
    const pathEntries = this.pathEntries()
    const patient_allergy_id = pathEntries['pharmacy-claims'].value
    pharmacyClaimApi.profile(
      userCredentials,
      patient_allergy_id,
      (pharmacyClaim) => { this.addField('pharmacyClaim', pharmacyClaim, this.redraw) },
      this.onError
    )
  }
}

export { PharmacyClaimProfilePageViewModel }
