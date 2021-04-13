import { AbstractPageViewModel } from "../../"
import { diseaseApi } from "../../../../../api/admin"
import { userCredentialsHelper } from "../../../../../helpers"

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
      userCredentials,
      disease_id,
      (disease) => { this.addField("disease", disease, this.redraw) },
      this.onError
    )
  }
}

export { DiseaseProfilePageViewModel }
