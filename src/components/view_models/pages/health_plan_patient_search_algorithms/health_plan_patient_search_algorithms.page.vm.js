import { AbstractListPageViewModel } from '..'
import { healthPlanApi, patientSearchAlgorithmApi } from '@aprexis/aprexis-api-utility'
import { apiEnvironmentHelper, pathHelper, userCredentialsHelper } from '../../../../helpers'

class HealthPlanPatientSearchAlgorithmsPageViewModel extends AbstractListPageViewModel {
  constructor(props) {
    super(props)

    this.filterDescriptions = this.filterDescriptions.bind(this)
    this.filtersOptions = this.filtersOptions.bind(this)
    this.gotoPatientSearchAlgorithmProfile = this.gotoPatientSearchAlgorithmProfile.bind(this)
    this.healthPlanId = this.healthPlanId.bind(this)
    this.loadData = this.loadData.bind(this)
    this.loadHealthPlan = this.loadHealthPlan.bind(this)
    this.loadHealthPlanPatientSearchAlgorithms = this.loadHealthPlanPatientSearchAlgorithms.bind(this)
    this.loadPatientSearchAlgorithms = this.loadPatientSearchAlgorithms.bind(this)
    this.title = this.title.bind(this)
  }

  filterDescriptions() {
    return []
  }

  filtersOptions() {
    return {}
  }

  gotoPatientSearchAlgorithmProfile(patientSearchAlgorithm) {
    const pathArray = pathHelper.buildPathArray(window.location, patientSearchAlgorithm, "profile")

    pathHelper.gotoPage(pathArray)
  }

  healthPlanId() {
    const pathEntries = this.pathEntries()

    return pathEntries["health-plans"].value
  }

  loadData() {
    const userCredentials = userCredentialsHelper.get()

    this.clearData()
    this.loadHealthPlan(
      userCredentials,
      (healthPlan) => {
        this.loadPatientSearchAlgorithms(
          userCredentials,
          (patientSearchAlgorithms) => {
            this.loadHealthPlanPatientSearchAlgorithms(
              userCredentials,
              (healthPlanPatientSearchAlgorithms) => {
                this.addData(
                  {
                    healthPlan,
                    healthPlanPatientSearchAlgorithms,
                    patientSearchAlgorithms
                  },
                  this.redrawView
                )
              }
            )
          }
        )
      }
    )
  }

  loadHealthPlan(userCredentials, nextOperation) {
    healthPlanApi.show(apiEnvironmentHelper.apiEnvironment(userCredentials, this.props.reconnectAndRetry), this.healthPlanId(), nextOperation, this.onError)
  }

  loadHealthPlanPatientSearchAlgorithms(userCredentials, nextOperation) {
    patientSearchAlgorithmApi.indexForHealthPlan(
      apiEnvironmentHelper.apiEnvironment(userCredentials, this.props.reconnectAndRetry),
      this.healthPlanId(),
      {},
      nextOperation,
      this.onError
    )
  }

  loadPatientSearchAlgorithms(userCredentials, nextOperation) {
    patientSearchAlgorithmApi.legitimate(apiEnvironmentHelper.apiEnvironment(userCredentials, this.props.reconnectAndRetry), nextOperation, this.onError)
  }

  title() {
    return "Patient Search Algorithms"
  }
}

export { HealthPlanPatientSearchAlgorithmsPageViewModel }
