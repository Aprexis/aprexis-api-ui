import { AbstractPageViewModel } from "../.."
import { conditionMedicationApi } from "@aprexis/aprexis-api-utility"
import { apiEnvironmentHelper, pathHelper, userCredentialsHelper } from "../../../../../helpers"

class ConditionMedicationProfilePageViewModel extends AbstractPageViewModel {
  constructor(props) {
    super(props)

    this.loadData = this.loadData.bind(this)
  }

  loadData() {
    this.clearData(false)

    const pathEntries = this.pathEntries()
    const condition_medication_id = pathHelper.pathEntryValue(pathEntries, "condition-medications")

    conditionMedicationApi.profile(
      apiEnvironmentHelper.apiEnvironment(userCredentialsHelper.get(), this.props.reconnectAndRetry),
      condition_medication_id,
      (conditionMedication) => { this.addField("conditionMedication", conditionMedication, this.redrawView) },
      this.onError
    )
  }
}

export { ConditionMedicationProfilePageViewModel }
