import { AbstractListPageViewModel } from "../../"
import { physicianApi, pageHelper } from "@aprexis/aprexis-api-utility"
import { apiEnvironmentHelper, filtersHelper, pathHelper, userCredentialsHelper } from "../../../../../helpers"

class PhysiciansPageViewModel extends AbstractListPageViewModel {
  constructor(props) {
    super(props)

    this.defaultParameters = this.defaultParameters.bind(this)
    this.filterDescriptions = this.filterDescriptions.bind(this)
    this.filtersOptions = this.filtersOptions.bind(this)
    this.gotoPhysicianProfile = this.gotoPhysicianProfile.bind(this)
    this.loadData = this.loadData.bind(this)
    this.refreshData = this.refreshData.bind(this)
    this.title = this.title.bind(this)
  }

  defaultParameters() {
    const filters = {}
    const sorting = { sort: "last_name,first_name,middle_name" }
    this.addData({ filters, sorting, page: this.defaultPage() })
  }

  filterDescriptions(_filters, _filtersOptions) {
    return [
      filtersHelper.stringFilter("Name", "for_name"),
      filtersHelper.stringFilter("NPI", "for_npi")
    ]
  }

  filtersOptions() {
    return {}
  }

  gotoPhysicianProfile(physician) {
    const pathArray = pathHelper.buildPathArray(window.location, physician, "profile")

    pathHelper.gotoPage(pathArray)
  }

  loadData() {
    this.clearData()
    this.defaultParameters()
    this.refreshData()
  }

  refreshData() {
    const userCredentials = userCredentialsHelper.get()
    this.removeField("physicianHeaders")
    const { filters, sorting, page } = this.data

    physicianApi.list(
      apiEnvironmentHelper.apiEnvironment(userCredentials),
      { ...filters, ...sorting, page },
      (physicians, physicianHeaders) => {
        this.addData(
          {
            physicians,
            page: pageHelper.updatePageFromLastPage(physicianHeaders)
          },
          this.redrawView
        )
      },
      this.onError
    )
  }

  title() {
    return "Physicians"
  }
}

export { PhysiciansPageViewModel }
