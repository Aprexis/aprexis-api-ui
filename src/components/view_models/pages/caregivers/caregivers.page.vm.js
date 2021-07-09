import { AbstractListPageViewModel } from "../"
import { caregiverApi } from "../../../../api"
import { filtersHelper, pageHelper, pathHelper } from "../../../../helpers"

const caregiverListMethods = [
  { pathKey: "patients", method: caregiverApi.listForPatient }
]

class CaregiversPageViewModel extends AbstractListPageViewModel {
  constructor(props) {
    super(props)

    this.defaultParameters = this.defaultParameters.bind(this)
    this.filterDescriptions = this.filterDescriptions.bind(this)
    this.filtersOptions = this.filtersOptions.bind(this)
    this.gotoCaregiverProfile = this.gotoCaregiverProfile.bind(this)
    this.loadData = this.loadData.bind(this)
    this.refreshData = this.refreshData.bind(this)
    this.title = this.title.bind(this)
  }

  defaultParameters() {
    const filters = {}
    const sorting = { sort: "last_name,first_name" }
    this.addData({ filters, sorting, page: this.defaultPage() })
  }

  filterDescriptions(filters, filtersOptions) {
    return [
      filtersHelper.stringFilter("Name", "for_name")
    ]
  }

  filtersOptions() {
    return {}
  }

  gotoCaregiverProfile(caregiver) {
    const pathArray = pathHelper.buildPathArray(window.location, caregiver, "profile")

    pathHelper.gotoPage(pathArray)
  }

  loadData() {
    this.clearData()
    this.defaultParameters()
    this.refreshData()
  }

  refreshData() {
    this.removeField("caregiverHeaders")

    this.fetchList(
      caregiverListMethods,
      (caregivers, caregiverHeaders) => {
        this.addData(
          { caregivers, "page": pageHelper.updatePageFromLastPage(caregiverHeaders) },
          this.redrawView
        )
      },
      this.onError
    )
  }

  title() {
    return "Caregivers"
  }
}

export { CaregiversPageViewModel }
