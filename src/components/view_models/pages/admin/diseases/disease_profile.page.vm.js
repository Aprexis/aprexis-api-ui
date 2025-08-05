import { AbstractPageViewModel } from "../../abstract.page.vm.js"
import { diseaseApi } from "@aprexis/aprexis-api-utility"
import { apiEnvironmentHelper, pathHelper, userCredentialsHelper } from "../../../../../helpers/index.js"

class DiseaseProfilePageViewModel extends AbstractPageViewModel {
  constructor(props) {
    super(props)

    this.loadData = this.loadData.bind(this)
  }

  loadData() {
    this.clearData(false)

    const userCredentials = userCredentialsHelper.get()
    const pathEntries = this.pathEntries()
    const disease_id = pathHelper.pathEntryValue(pathEntries, "diseases")

    diseaseApi.show(
      apiEnvironmentHelper.apiEnvironment(userCredentials, this.props.reconnectAndRetry),
      disease_id,
      (disease) => { this.addField("disease", disease, this.redrawView) },
      this.onError
    )
  }
}

export { DiseaseProfilePageViewModel }
