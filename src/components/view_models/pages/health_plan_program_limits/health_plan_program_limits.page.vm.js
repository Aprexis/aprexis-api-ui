import { AbstractListPageViewModel } from "../abstract_list.page.vm.js"
import { healthPlanProgramLimitApi, healthPlanProgramLimitHelper, pageHelper } from "@aprexis/aprexis-api-utility"

const healthPlanProgramLimitListMethods = [
  { pathKey: "health-plans", method: healthPlanProgramLimitApi.listForHealthPlan }
]

class HealthPlanProgramLimitsPageViewModel extends AbstractListPageViewModel {
  constructor(props) {
    super(props)

    this.api = this.api.bind(this)
    this.defaultParameters = this.defaultParameters.bind(this)
    this.filterDescriptions = this.filterDescriptions.bind(this)
    this.filtersOptions = this.filtersOptions.bind(this)
    //this.gotoHealthPlanProgramLimitProfile = this.gotoHealthPlanProgramLimitProfile.bind(this)
    this.helper = this.helper.bind(this)
    this.loadData = this.loadData.bind(this)
    this.refreshData = this.refreshData.bind(this)
  }

  api() {
    return healthPlanProgramLimitApi
  }

  defaultParameters() {
    const filters = { for_active: true }
    const sorting = { sort: "name" }
    this.addData({ filters, sorting, page: this.defaultPage() })
  }

  filterDescriptions(_filters, _filtersOptions) {
    return [
    ]
  }

  filtersOptions() {
    return {}
  }

  /*
  gotoHealthPlanProgramLimitProfile(healthPlanProgramLimit) {
    const pathArray = pathHelper.buildPathArray(window.location, healthPlanProgramLimit, "profile")

    pathHelper.gotoPage(pathArray)
  }
  */

  helper() {
    return healthPlanProgramLimitHelper
  }

  loadData() {
    this.clearData()
    this.defaultParameters()
    this.refreshData()
  }

  refreshData() {
    this.removeField("healthPlanProgramLimitHeaders")

    this.fetchList(
      healthPlanProgramLimitListMethods,
      (healthPlanProgramLimits, healthPlanProgramLimitHeaders) => {
        this.addData(
          { healthPlanProgramLimits, "page": pageHelper.updatePageFromLastPage(healthPlanProgramLimitHeaders) },
          this.redrawView
        )
      },
      this.onError
    )
  }

  title() {
    return "Health Plan Program Limits"
  }
}

export { HealthPlanProgramLimitsPageViewModel }
