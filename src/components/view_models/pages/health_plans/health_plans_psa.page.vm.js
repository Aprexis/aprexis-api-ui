import { AbstractListPageViewModel } from '../'
import { healthPlanApi, patientSearchAlgorithmApi } from '../../../../api'
import { userCredentialsHelper } from '../../../../helpers'

class HealthPlanPatientSearchAlgorithmsPageViewModel extends AbstractListPageViewModel {
  constructor(props) {
    super(props)

    this.filterDescriptions = this.filterDescriptions.bind(this)
    this.filtersOptions = this.filtersOptions.bind(this)
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
                this.addData({ healthPlan, healthPlanPatientSearchAlgorithms, patientSearchAlgorithms })
                this.redrawView()
              }
            )
          }
        )
      }
    )
  }

  loadHealthPlan(userCredentials, nextOperation) {
    healthPlanApi.show(userCredentials, this.healthPlanId(), nextOperation, this.onError)
  }

  loadHealthPlanPatientSearchAlgorithms(userCredentials, nextOperation) {
    patientSearchAlgorithmApi.forHealthPlan(
      userCredentials,
      this.healthPlanId(),
      {},
      nextOperation,
      this.onError
    )
  }

  loadPatientSearchAlgorithms(userCredentials, nextOperation) {
    patientSearchAlgorithmApi.legitimate(userCredentials, nextOperation, this.onError)
  }

  title() {
    return "Patient Search Algorithms"
  }
}

export { HealthPlanPatientSearchAlgorithmsPageViewModel }
