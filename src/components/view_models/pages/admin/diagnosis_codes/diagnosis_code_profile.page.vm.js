import { AbstractPageViewModel } from "../../"
import { diagnosisCodeApi } from "../../../../../api/admin"
import { userCredentialsHelper } from "../../../../../helpers"

class DiagnosisCodeProfilePageViewModel extends AbstractPageViewModel {
  constructor(props) {
    super(props)

    this.loadData = this.loadData.bind(this)
  }

  loadData() {
    this.clearData(false)

    const userCredentials = userCredentialsHelper.get()
    const pathEntries = this.pathEntries()
    const diagnosis_code_id = pathEntries["diagnosis-codes"].value

    diagnosisCodeApi.show(
      userCredentials,
      diagnosis_code_id,
      (diagnosisCode) => { this.addField("diagnosisCode", diagnosisCode, this.redraw) },
      this.onError
    )
  }
}

export { DiagnosisCodeProfilePageViewModel }
