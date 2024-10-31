import { AbstractPageViewModel } from "../../"
import { physicianApi } from "@aprexis/aprexis-api-utility"
import { apiEnvironmentHelper, pathHelper, userCredentialsHelper } from "../../../../../helpers"

class PhysicianProfilePageViewModel extends AbstractPageViewModel {
  constructor(props) {
    super(props)

    this.loadData = this.loadData.bind(this)
  }

  loadData() {
    this.clearData(false)

    const userCredentials = userCredentialsHelper.get()
    const pathEntries = this.pathEntries()
    const physician_id = pathHelper.pathEntryValue(pathEntries, "physicians")

    physicianApi.show(
      apiEnvironmentHelper.apiEnvironment(userCredentials, this.props.reconnectAndRetry),
      physician_id,
      (physician) => { this.addField("physician", physician, this.redrawView) },
      this.onError
    )
  }
}

export { PhysicianProfilePageViewModel }
