import { AbstractPageViewModel } from "../../"
import { physicianApi } from "@aprexis/aprexis-api-utility"
import { apiEnvironmentHelper, userCredentialsHelper } from "../../../../../helpers"

class PhysicianProfilePageViewModel extends AbstractPageViewModel {
  constructor(props) {
    super(props)

    this.loadData = this.loadData.bind(this)
  }

  loadData() {
    this.clearData(false)

    const userCredentials = userCredentialsHelper.get()
    const pathEntries = this.pathEntries()
    const physician_id = pathEntries["physicians"].value

    physicianApi.show(
      apiEnvironmentHelper.apiEnvironment(userCredentials),
      physician_id,
      (physician) => { this.addField("physician", physician, this.redrawView) },
      this.onError
    )
  }
}

export { PhysicianProfilePageViewModel }
