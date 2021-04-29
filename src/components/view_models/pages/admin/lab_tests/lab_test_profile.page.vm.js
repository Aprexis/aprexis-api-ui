import { AbstractPageViewModel } from "../../"
import { labTestApi } from "../../../../../api/admin"
import { userCredentialsHelper } from "../../../../../helpers"

class LabTestProfilePageViewModel extends AbstractPageViewModel {
  constructor(props) {
    super(props)

    this.loadData = this.loadData.bind(this)
  }

  loadData() {
    this.clearData(false)

    const userCredentials = userCredentialsHelper.get()
    const pathEntries = this.pathEntries()
    const lab_test_id = pathEntries["lab-tests"].value

    labTestApi.show(
      userCredentials,
      lab_test_id,
      (labTest) => { this.addField("labTest", labTest, this.redraw) },
      this.onError
    )
  }
}

export { LabTestProfilePageViewModel }
