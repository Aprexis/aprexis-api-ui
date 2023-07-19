import { AbstractListPageViewModel } from "../../"
import { medicationApi, pageHelper } from "@aprexis/aprexis-api-utility"
import { apiEnvironmentHelper, filtersHelper, pathHelper, userCredentialsHelper } from "../../../../../helpers"

class MedicationsPageViewModel extends AbstractListPageViewModel {
  constructor(props) {
    super(props)

    this.defaultParameters = this.defaultParameters.bind(this)
    this.filterDescriptions = this.filterDescriptions.bind(this)
    this.filtersOptions = this.filtersOptions.bind(this)
    this.gotoMedicationProfile = this.gotoMedicationProfile.bind(this)
    this.loadData = this.loadData.bind(this)
    this.refreshData = this.refreshData.bind(this)
    this.title = this.title.bind(this)
  }

  defaultParameters() {
    const filters = {}
    const sorting = { sort: "label" }
    this.addData({ filters, sorting, page: this.defaultPage() })
  }

  filterDescriptions(_filters, _filtersOptions) {
    return [
      filtersHelper.stringFilter("Medication", "for_medication")
    ]
  }

  filtersOptions() {
    return {}
  }

  gotoMedicationProfile(medication) {
    const pathArray = pathHelper.buildPathArray(window.location, medication, "profile")

    pathHelper.gotoPage(pathArray)
  }

  loadData() {
    this.clearData()
    this.defaultParameters()
    this.refreshData()
  }

  refreshData() {
    const userCredentials = userCredentialsHelper.get()
    this.removeField("medicationHeaders")
    const { filters, sorting, page } = this.data

    medicationApi.list(
      apiEnvironmentHelper.apiEnvironment(userCredentials, this.props.reconnectAndRetry),
      { ...filters, ...sorting, page },
      (medications, medicationHeaders) => {
        this.addData(
          {
            medications,
            page: pageHelper.updatePageFromLastPage(medicationHeaders)
          },
          this.redrawView
        )
      },
      this.onError
    )
  }

  title() {
    return "Medications"
  }
}

export { MedicationsPageViewModel }
