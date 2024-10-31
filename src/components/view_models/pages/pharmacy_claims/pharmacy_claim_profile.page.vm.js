import { AbstractPageViewModel } from "../"
import { pharmacyClaimApi } from "@aprexis/aprexis-api-utility"
import { apiEnvironmentHelper, pathHelper, userCredentialsHelper } from "../../../../helpers"

class PharmacyClaimProfilePageViewModel extends AbstractPageViewModel {
  constructor(props) {
    super(props)

    this.loadData = this.loadData.bind(this)
  }

  loadData() {
    this.clearData(false)

    const userCredentials = userCredentialsHelper.get()
    const pathEntries = this.pathEntries()
    const patient_allergy_id = pathHelper.pathEntryValue(pathEntries, 'pharmacy-claims')
    pharmacyClaimApi.profile(
      apiEnvironmentHelper.apiEnvironment(userCredentials, this.props.reconnectAndRetry),
      patient_allergy_id,
      (pharmacyClaim) => { this.addField('pharmacyClaim', pharmacyClaim, this.redrawView) },
      this.onError
    )
  }
}

export { PharmacyClaimProfilePageViewModel }
