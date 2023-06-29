import { AbstractPageViewModel } from '../..'
import { patientSearchAlgorithmBatchApi } from '@aprexis/aprexis-api-utility'
import { apiEnvironmentHelper, userCredentialsHelper } from '../../../../../helpers'

class HealthPlanPatientSearchAlgorithmBatchPageViewModel extends AbstractPageViewModel {
  constructor(props) {
    super(props)

    this.loadData = this.loadData.bind(this)
  }

  loadData() {
    this.clearData(false)

    const userCredentials = userCredentialsHelper.get()
    const pathEntries = this.pathEntries()
    const patient_search_algorithm_id = pathEntries['patient-search-algorithms'].value
    const batch = pathEntries['batches'].value
    patientSearchAlgorithmBatchApi.profile(
      apiEnvironmentHelper.apiEnvironment(userCredentials),
      patient_search_algorithm_id,
      batch,
      (healthPlanPatientSearchAlgorithmBatch) => { this.addField('healthPlanPatientSearchAlgorithmBatch', healthPlanPatientSearchAlgorithmBatch, this.redrawView) },
      this.onError
    )
  }
}

export { HealthPlanPatientSearchAlgorithmBatchPageViewModel }
