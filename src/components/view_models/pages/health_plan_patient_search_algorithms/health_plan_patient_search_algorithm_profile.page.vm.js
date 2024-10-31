import { AbstractPageViewModel } from '..'
import { patientSearchAlgorithmApi } from '@aprexis/aprexis-api-utility'
import { apiEnvironmentHelper, pathHelper, userCredentialsHelper } from '../../../../helpers'

class HealthPlanPatientSearchAlgorithmProfilePageViewModel extends AbstractPageViewModel {
  constructor(props) {
    super(props)

    this.gotoPatientSearchAlgorithmBatchProfile = this.gotoPatientSearchAlgorithmBatchProfile.bind(this)
    this.loadData = this.loadData.bind(this)
  }

  gotoPatientSearchAlgorithmBatchProfile(patientSearchAlgorithmBatch) {
    let { pathname } = window.location
    pathname = pathname.substring(0, pathname.lastIndexOf('/profile'))
    const pathArray = pathHelper.buildPathArray({ pathname }, 'batches', patientSearchAlgorithmBatch, "profile")

    pathHelper.gotoPage(pathArray)
  }

  loadData() {
    this.clearData(false)

    const userCredentials = userCredentialsHelper.get()
    const pathEntries = this.pathEntries()
    const patient_search_algorithm_id = pathHelper.pathEntryValue(pathEntries, 'patient-search-algorithms')
    patientSearchAlgorithmApi.profile(
      apiEnvironmentHelper.apiEnvironment(userCredentials, this.props.reconnectAndRetry),
      patient_search_algorithm_id,
      (healthPlanPatientSearchAlgorithm) => { this.addField('healthPlanPatientSearchAlgorithm', healthPlanPatientSearchAlgorithm, this.redrawView) },
      this.onError
    )
  }
}

export { HealthPlanPatientSearchAlgorithmProfilePageViewModel }
