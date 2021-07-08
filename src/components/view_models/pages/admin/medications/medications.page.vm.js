import { AbstractListPageViewModel } from "../../"
import { medicationApi } from "../../../../../api/admin"
import { filtersHelper, pageHelper, pathHelper, userCredentialsHelper } from "../../../../../helpers"

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

  filterDescriptions(filters, filtersOptions) {
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
      userCredentials,
      { ...filters, ...sorting, page },
      (medications, medicationHeaders) => {
        this.addData({ medications })
        this.addField("page", pageHelper.updatePageFromLastPage(medicationHeaders))
        this.redrawView()
      },
      this.onError
    )
  }

  title() {
    return "Medications"
  }
}

export { MedicationsPageViewModel }
