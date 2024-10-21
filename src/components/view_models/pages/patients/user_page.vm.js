import { AbstractPageViewModel } from "../"
import { userApi } from "@aprexis/aprexis-api-utility"
import { apiEnvironmentHelper, pathHelper, userCredentialsHelper } from "../../../../helpers"

class UserPageViewModel extends AbstractPageViewModel {
  constructor(props) {
    super(props)

    this.fetchUser = this.fetchUser.bind(this)
    this.loadData = this.loadData.bind(this)
  }

  fetchUser() {
    const userCredentials = userCredentialsHelper.get()
    const pathEntries = this.pathEntries()
    const patient_id = pathHelper.pathEntryValue(pathEntries, 'patients')

    userApi.userForPatient(
      apiEnvironmentHelper.apiEnvironment(userCredentials, this.props.reconnectAndRetry),
      patient_id,
      (user) => { this.addField("user", user, this.redrawView) },
      this.onError
    )
  }

  loadData() {
    this.clearData(false)
    this.fetchUser()
  }
}

export { UserPageViewModel }
