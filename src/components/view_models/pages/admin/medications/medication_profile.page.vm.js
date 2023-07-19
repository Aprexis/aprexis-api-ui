import { AbstractPageViewModel } from "../../"
import { medicationApi } from "@aprexis/aprexis-api-utility"
import { apiEnvironmentHelper, userCredentialsHelper } from "../../../../../helpers"

class MedicationProfilePageViewModel extends AbstractPageViewModel {
  constructor(props) {
    super(props)

    this.loadData = this.loadData.bind(this)
  }

  loadData() {
    this.clearData(false)

    const userCredentials = userCredentialsHelper.get()
    const pathEntries = this.pathEntries()
    const medication_id = pathEntries["medications"].value

    medicationApi.profile(
      apiEnvironmentHelper.apiEnvironment(userCredentials, this.props.reconnectAndRetry),
      medication_id,
      (medication) => { this.addField("medication", medication, this.redrawView) },
      this.onError
    )
  }
}

export { MedicationProfilePageViewModel }
