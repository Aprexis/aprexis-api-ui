import { AbstractPageViewModel } from '../..'
import { healthPlanPatientSearchAlgorithmHelper, healthPlanPatientSearchStageHelper, patientSearchAlgorithmBatchApi, valueHelper } from '@aprexis/aprexis-api-utility'
import { apiEnvironmentHelper, listHelper, pathHelper, userCredentialsHelper } from '../../../../../helpers'

class HealthPlanPatientSearchAlgorithmBatchPageViewModel extends AbstractPageViewModel {
  constructor(props) {
    super(props)

    this.gotoProgram = this.gotoProgram.bind(this)
    this.healthPlanId = this.healthPlanId.bind(this)
    this.noProgramName = this.noProgramName.bind(this)
    this.healthPlanId = this.healthPlanId.bind(this)
    this.loadData = this.loadData.bind(this)
    this.yesProgramName = this.yesProgramName.bind(this)
  }

  gotoProgram(healthPlanId, programId) {
    const pathEntries = ['health-plans', healthPlanId, 'programs', programId, 'dry-run-program-patient-assignments']

    return () => pathHelper.gotoPage(pathEntries)
  }

  healthPlanId() {
    const { healthPlanPatientSearchAlgorithmBatch } = this.data
    const { patient_search_algorithm } = healthPlanPatientSearchAlgorithmBatch

    return healthPlanPatientSearchAlgorithmHelper.healthPlanId(patient_search_algorithm)
  }

  noProgramName(patientSearchStage) {
    const noProgramName = healthPlanPatientSearchStageHelper.noProgramName(patientSearchStage)
    if (!valueHelper.isStringValue(noProgramName)) {
      return ''
    }

    return listHelper.listButton(
      noProgramName,
      this.gotoProgram(this.healthPlanId(), healthPlanPatientSearchStageHelper.noProgramId(patientSearchStage))
    )
  }

  loadData() {
    this.clearData(false)

    const userCredentials = userCredentialsHelper.get()
    const pathEntries = this.pathEntries()
    const patient_search_algorithm_id = pathEntries['patient-search-algorithms'].value
    const batch = pathEntries['batches'].value
    patientSearchAlgorithmBatchApi.profile(
      apiEnvironmentHelper.apiEnvironment(userCredentials, this.props.reconnectAndRetry),
      patient_search_algorithm_id,
      batch,
      (healthPlanPatientSearchAlgorithmBatch) => { this.addField('healthPlanPatientSearchAlgorithmBatch', healthPlanPatientSearchAlgorithmBatch, this.redrawView) },
      this.onError
    )
  }

  yesProgramName(patientSearchStage) {
    const yesProgramName = healthPlanPatientSearchStageHelper.yesProgramName(patientSearchStage)
    if (!valueHelper.isStringValue(yesProgramName)) {
      return ''
    }

    return listHelper.listButton(
      yesProgramName,
      this.gotoProgram(this.healthPlanId(), healthPlanPatientSearchStageHelper.yesProgramId(patientSearchStage))
    )
  }
}

export { HealthPlanPatientSearchAlgorithmBatchPageViewModel }
