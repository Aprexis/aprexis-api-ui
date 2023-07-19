import { AbstractPageViewModel } from "../"
import { pharmacyStoreApi } from "@aprexis/aprexis-api-utility"
import { apiEnvironmentHelper, userCredentialsHelper } from "../../../../helpers"

class PharmacyStoreProfilePageViewModel extends AbstractPageViewModel {
  constructor(props) {
    super(props)

    this.loadData = this.loadData.bind(this)
  }

  loadData() {
    this.clearData(false)

    const userCredentials = userCredentialsHelper.get()
    const pathEntries = this.pathEntries()
    const pharmacy_store_id = pathEntries['pharmacy-stores'].value
    pharmacyStoreApi.show(
      apiEnvironmentHelper.apiEnvironment(userCredentials, this.props.reconnectAndRetry),
      pharmacy_store_id,
      (pharmacyStore) => { this.addField('pharmacyStore', pharmacyStore, this.redrawView) },
      this.onError
    )
  }
}

export { PharmacyStoreProfilePageViewModel }
