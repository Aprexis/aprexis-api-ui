import { AbstractPageViewModel } from "../../"
import { diagnosisCodeApi } from "@aprexis/aprexis-api-utility"
import { apiEnvironmentHelper, userCredentialsHelper } from "../../../../../helpers"

class DiagnosisCodeProfilePageViewModel extends AbstractPageViewModel {
  constructor(props) {
    super(props)

    this.loadData = this.loadData.bind(this)
  }

  loadData() {
    this.clearData(false)

    const pathEntries = this.pathEntries()
    const diagnosis_code_id = pathEntries["diagnosis-codes"].value

    diagnosisCodeApi.show(
      apiEnvironmentHelper.apiEnvironment(userCredentialsHelper.get(), this.props.reconnectAndRetry),
      diagnosis_code_id,
      (diagnosisCode) => { this.addField("diagnosisCode", diagnosisCode, this.redrawView) },
      this.onError
    )
  }
}

export { DiagnosisCodeProfilePageViewModel }
