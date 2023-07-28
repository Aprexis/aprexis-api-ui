import { AbstractListPageViewModel } from "../.."
import { conditionMedicationApi, pageHelper } from '@aprexis/aprexis-api-utility'
import { apiEnvironmentHelper, filtersHelper, pathHelper, userCredentialsHelper } from "../../../../../helpers"

class ConditionMedicationsPageViewModel extends AbstractListPageViewModel {
  constructor(props) {
    super(props)

    this.defaultParameters = this.defaultParameters.bind(this)
    this.filterDescriptions = this.filterDescriptions.bind(this)
    this.filtersOptions = this.filtersOptions.bind(this)
    this.gotoConditionMedicationProfile = this.gotoConditionMedicationProfile.bind(this)
    this.loadData = this.loadData.bind(this)
    this.refreshData = this.refreshData.bind(this)
    this.title = this.title.bind(this)
  }

  defaultParameters() {
    const filters = {}
    const sorting = { sort: "type,medication" }
    this.addData({ filters, sorting, page: this.defaultPage() })
  }

  filterDescriptions(_filters, _filtersOptions) {
    return [
      filtersHelper.stringFilter("Condition", "for_condition"),
      filtersHelper.stringFilter("Medication", "for_medication")
    ]
  }

  filtersOptions() {
    return {}
  }

  gotoConditionMedicationProfile(conditionMedication) {
    const pathArray = pathHelper.buildPathArray(window.location, conditionMedication, "profile")

    pathHelper.gotoPage(pathArray)
  }

  loadData() {
    this.clearData()
    this.defaultParameters()
    this.refreshData()
  }

  refreshData() {
    const userCredentials = userCredentialsHelper.get()
    this.removeField("conditionMedicationHeaders")
    const { filters, sorting, page } = this.data

    conditionMedicationApi.list(
      apiEnvironmentHelper.apiEnvironment(userCredentials, this.props.reconnectAndRetry),
      { ...filters, ...sorting, page },
      (conditionMedications, conditionMedicationHeaders) => {
        this.addData(
          {
            conditionMedications,
            page: pageHelper.updatePageFromLastPage(conditionMedicationHeaders)
          },
          this.redrawView
        )
      },
      this.onError
    )
  }

  title() {
    return "Condition Medications"
  }
}

export { ConditionMedicationsPageViewModel }
