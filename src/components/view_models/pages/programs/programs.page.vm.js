import { AbstractListPageViewModel } from "../"
import { programApi } from "../../../../api"
import { filtersHelper, pageHelper, pathHelper, userCredentialsHelper, valueHelper } from "../../../../helpers"

class ProgramsPageViewModel extends AbstractListPageViewModel {
  constructor(props) {
    super(props)

    this.defaultParameters = this.defaultParameters.bind(this)
    this.filterDescriptions = this.filterDescriptions.bind(this)
    this.filtersOptions = this.filtersOptions.bind(this)
    this.gotoProgramProfile = this.gotoProgramProfile.bind(this)
    this.loadData = this.loadData.bind(this)
    this.refreshData = this.refreshData.bind(this)
  }

  defaultParameters() {
    const filters = { for_active: true }
    const sorting = { sort: "name" }
    this.addData({ filters, sorting, page: this.defaultPage() })
  }

  filterDescriptions(filters, filtersOptions) {
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

    list(
      userCredentials,
      { ...filters, ...sorting, page },
      (programs, programHeaders) => {
        this.addData({ programs })
        this.addField("page", pageHelper.updatePageFromLastPage(programHeaders))
        this.redrawView()
      },
      this.onError
    )

    function list(userCredentials, params, onSuccess, onError) {
      const pathEntries = pathHelper.parsePathEntries(window.location)
      const healthPlan = pathEntries["health-plans"]

      if (valueHelper.isValue(healthPlan)) {
        programApi.listForHealthPlan(userCredentials, healthPlan.value, params, onSuccess, onError)
        return
      }

      programApi.list(userCredentials, params, onSuccess, onError)
    }
  }
}

export { ProgramsPageViewModel }
