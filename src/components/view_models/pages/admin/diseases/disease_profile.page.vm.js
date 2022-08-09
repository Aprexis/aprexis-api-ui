import { AbstractPageViewModel } from "../../"
import { diseaseApi } from "@aprexis/aprexis-api-utility"
import { apiEnvironmentHelper, userCredentialsHelper } from "../../../../../helpers"

class DiseaseProfilePageViewModel extends AbstractPageViewModel {
  constructor(props) {
    super(props)

    this.loadData = this.loadData.bind(this)
  }

  loadData() {
    this.clearData(false)

    const userCredentials = userCredentialsHelper.get()
    const pathEntries = this.pathEntries()
    const disease_id = pathEntries["diseases"].value

    diseaseApi.show(
      apiEnvironmentHelper.apiEnvironment(userCredentials),
      disease_id,
      (disease) => { this.addField("disease", disease, this.redrawView) },
      this.onError
    )
  }
}

export { DiseaseProfilePageViewModel }
