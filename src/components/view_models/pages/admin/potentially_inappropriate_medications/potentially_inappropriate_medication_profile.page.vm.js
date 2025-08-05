import { AbstractPageViewModel } from "../../abstract.page.vm.js"
import { potentiallyInappropriateMedicationApi } from "@aprexis/aprexis-api-utility"
import { apiEnvironmentHelper, pathHelper, userCredentialsHelper } from "../../../../../helpers/index.js"

class PotentiallyInappropriateMedicationProfilePageViewModel extends AbstractPageViewModel {
  constructor(props) {
    super(props)

    this.loadData = this.loadData.bind(this)
  }

  loadData() {
    this.clearData(false)

    const userCredentials = userCredentialsHelper.get()
    const pathEntries = this.pathEntries()
    const potentially_inappropriate_medication_id = pathHelper.pathEntryValue(pathEntries, "potentially-inappropriate-medications")

    potentiallyInappropriateMedicationApi.profile(
      apiEnvironmentHelper.apiEnvironment(userCredentials, this.props.reconnectAndRetry),
      potentially_inappropriate_medication_id,
      (potentiallyInappropriateMedication) => { this.addField("potentiallyInappropriateMedication", potentiallyInappropriateMedication, this.redrawView) },
      this.onError
    )
  }
}

export { PotentiallyInappropriateMedicationProfilePageViewModel }
