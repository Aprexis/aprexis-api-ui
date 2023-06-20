import { AbstractPageViewModel } from '..'
import { healthPlanPatientSearchAlgorithmApi } from '@aprexis/aprexis-api-utility'
import { apiEnvironmentHelper, userCredentialsHelper } from '../../../../helpers'

class HealthPlanPatientSearchAlgorithmProfilePageViewModel extends AbstractPageViewModel {
  constructor(props) {
    super(props)

    this.loadData = this.loadData.bind(this)
  }

  loadData() {
    this.clearData(false)

    const userCredentials = userCredentialsHelper.get()
    const pathEntries = this.pathEntries()
    const patient_search_algorithm_id = pathEntries['patient-search-algorithms'].value
    healthPlanPatientSearchAlgorithmApi.profile(
      apiEnvironmentHelper.apiEnvironment(userCredentials),
      patient_search_algorithm_id,
      (healthPlanPatientSearchAlgorithm) => { this.addField('healthPlanPatientSearchAlgorithm', healthPlanPatientSearchAlgorithm, this.redrawView) },
      this.onError
    )
  }
}

export { HealthPlanPatientSearchAlgorithmProfilePageViewModel }
