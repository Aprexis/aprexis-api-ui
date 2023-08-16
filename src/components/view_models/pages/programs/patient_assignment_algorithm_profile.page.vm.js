import { AbstractPageViewModel } from "../"
import { patientAssignmentAlgorithmApi } from "@aprexis/aprexis-api-utility"
import { apiEnvironmentHelper, userCredentialsHelper } from "../../../../helpers"

class PatientAssignmentAlgorithmPageViewModel extends AbstractPageViewModel {
  constructor(props) {
    super(props)

    this.fetchPatientAssignmentAlgorithm = this.fetchPatientAssignmentAlgorithm.bind(this)
    this.loadData = this.loadData.bind(this)
  }

  fetchPatientAssignmentAlgorithm() {
    const userCredentials = userCredentialsHelper.get()
    const pathEntries = this.pathEntries()
    const program_id = pathEntries['programs'].value

    patientAssignmentAlgorithmApi.patientAssignmentAlgorithmForProgram(
      apiEnvironmentHelper.apiEnvironment(userCredentials, this.props.reconnectAndRetry),
      program_id,
      (patientAssignmentAlgorithm) => { this.addField("patientAssignmentAlgorithm", patientAssignmentAlgorithm, this.redrawView) },
      this.onError
    )
  }

  loadData() {
    this.clearData(false)
    this.fetchPatientAssignmentAlgorithm()
  }
}

export { PatientAssignmentAlgorithmPageViewModel }
