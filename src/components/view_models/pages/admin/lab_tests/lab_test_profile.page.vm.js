import { AbstractPageViewModel } from "../../"
import { labTestApi } from "@aprexis/aprexis-api-utility"
import { apiEnvironmentHelper, pathHelper, userCredentialsHelper } from "../../../../../helpers"

class LabTestProfilePageViewModel extends AbstractPageViewModel {
  constructor(props) {
    super(props)

    this.loadData = this.loadData.bind(this)
  }

  loadData() {
    this.clearData(false)

    const userCredentials = userCredentialsHelper.get()
    const pathEntries = this.pathEntries()
    const lab_test_id = pathHelper.pathEntryValue(pathEntries, "lab-tests")

    labTestApi.show(
      apiEnvironmentHelper.apiEnvironment(userCredentials, this.props.reconnectAndRetry),
      lab_test_id,
      (labTest) => { this.addField("labTest", labTest, this.redrawView) },
      this.onError
    )
  }
}

export { LabTestProfilePageViewModel }
