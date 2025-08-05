import { AbstractListPageViewModel } from "../../abstract_list.page.vm.js"
import { potentiallyInappropriateMedicationApi, potentiallyInappropriateMedicationHelper, pageHelper } from "@aprexis/aprexis-api-utility"
import { apiEnvironmentHelper, pathHelper, userCredentialsHelper } from "../../../../../helpers/index.js"

class PotentiallyInappropriateMedicationsPageViewModel extends AbstractListPageViewModel {
  constructor(props) {
    super(props)

    this.defaultParameters = this.defaultParameters.bind(this)
    this.filterDescriptions = this.filterDescriptions.bind(this)
    this.filtersOptions = this.filtersOptions.bind(this)
    this.gotoPotentiallyInappropriateMedicationProfile = this.gotoPotentiallyInappropriateMedicationProfile.bind(this)
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
    return []
  }

  filtersOptions() {
    return {}
  }

  gotoPotentiallyInappropriateMedicationProfile(potentiallyInappropriateMedication) {
    const pathArray = pathHelper.buildPathArray(window.location, potentiallyInappropriateMedicationHelper.specificProductId(potentiallyInappropriateMedication), "profile")

    pathHelper.gotoPage(pathArray)
  }

  loadData() {
    this.clearData()
    this.defaultParameters()
    this.refreshData()
  }

  refreshData() {
    const userCredentials = userCredentialsHelper.get()
    this.removeField("potentiallyInappropriateMedicationHeaders")
    const { filters, sorting, page } = this.data

    potentiallyInappropriateMedicationApi.list(
      apiEnvironmentHelper.apiEnvironment(userCredentials, this.props.reconnectAndRetry),
      { ...filters, ...sorting, page },
      (potentiallyInappropriateMedications, potentiallyInappropriateMedicationHeaders) => {
        this.addData(
          {
            potentiallyInappropriateMedications,
            page: pageHelper.updatePageFromLastPage(potentiallyInappropriateMedicationHeaders)
          },
          this.redrawView
        )
      },
      this.onError
    )
  }

  title() {
    return "Potentially Inappropriate Medications"
  }
}

export { PotentiallyInappropriateMedicationsPageViewModel }
