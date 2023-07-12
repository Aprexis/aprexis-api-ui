import { AbstractListPageViewModel } from "../"
import { programApi, pageHelper, valueHelper } from "@aprexis/aprexis-api-utility"
import { apiEnvironmentHelper, filtersHelper, pathHelper, userCredentialsHelper } from "../../../../helpers"

class ProgramsPageViewModel extends AbstractListPageViewModel {
  constructor(props) {
    super(props)

    this.defaultParameters = this.defaultParameters.bind(this)
    this.filterDescriptions = this.filterDescriptions.bind(this)
    this.filtersOptions = this.filtersOptions.bind(this)
    this.gotoProgramProfile = this.gotoProgramProfile.bind(this)
    this.loadData = this.loadData.bind(this)
    this.refreshData = this.refreshData.bind(this)
    this.title = this.title.bind(this)
  }

  defaultParameters() {
    const filters = { for_active: true }
    const sorting = { sort: "name" }
    this.addData({ filters, sorting, page: this.defaultPage() })
  }

  filterDescriptions(_filters, _filtersOptions) {
    return [
      filtersHelper.stringFilter("Name", "for_name"),
      filtersHelper.stringFilter("Type", "for_type"),
      filtersHelper.booleanFilter("Active", "for_active", { unselectedLabel: 'All' })
    ]
  }

  filtersOptions() {
    return {}
  }

  gotoProgramProfile(program) {
    const pathArray = pathHelper.buildPathArray(window.location, program, "profile")

    pathHelper.gotoPage(pathArray)
  }

  loadData() {
    this.clearData()
    this.defaultParameters()
    this.refreshData()
  }

  refreshData() {
    const userCredentials = userCredentialsHelper.get()
    this.removeField("programHeaders")
    const { filters, sorting, page } = this.data
    const pathEntries = this.pathEntries()

    list(
      pathEntries,
      apiEnvironmentHelper.apiEnvironment(userCredentials),
      { ...filters, ...sorting, page },
      (programs, programHeaders) => {
        this.addData(
          {
            programs,
            page: pageHelper.updatePageFromLastPage(programHeaders)
          },
          this.redrawView
        )
      },
      this.onError
    )

    function list(pathEntries, credentials, params, onSuccess, onError) {
      const healthPlan = pathEntries["health-plans"]

      if (valueHelper.isValue(healthPlan)) {
        programApi.listForHealthPlan(credentials, healthPlan.value, params, onSuccess, onError)
        return
      }

      programApi.list(credentials, params, onSuccess, onError)
    }
  }

  title() {
    return "Programs"
  }
}

export { ProgramsPageViewModel }
