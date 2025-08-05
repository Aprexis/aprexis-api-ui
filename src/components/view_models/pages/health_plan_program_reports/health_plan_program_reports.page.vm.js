import { AbstractListPageViewModel } from "../abstract_list.page.vm.js"
import { healthPlanProgramReportApi, healthPlanProgramReportHelper, pageHelper } from "@aprexis/aprexis-api-utility"
import { pathHelper } from "../../../../helpers/index.js"

const healthPlanProgramReportListMethods = [
  { pathKey: "health-plans", method: healthPlanProgramReportApi.listForHealthPlan }
]

class HealthPlanProgramReportsPageViewModel extends AbstractListPageViewModel {
  constructor(props) {
    super(props)

    this.api = this.api.bind(this)
    this.defaultParameters = this.defaultParameters.bind(this)
    this.filterDescriptions = this.filterDescriptions.bind(this)
    this.filtersOptions = this.filtersOptions.bind(this)
    this.gotoHealthPlanProgramReportProfile = this.gotoHealthPlanProgramReportProfile.bind(this)
    this.helper = this.helper.bind(this)
    this.loadData = this.loadData.bind(this)
    this.refreshData = this.refreshData.bind(this)
  }

  api() {
    return healthPlanProgramReportApi
  }

  defaultParameters() {
    const filters = {}
    const sorting = { sort: "program_type" }
    this.addData({ filters, sorting, page: this.defaultPage() })
  }

  filterDescriptions(_filters, _filtersOptions) {
    return [
    ]
  }

  filtersOptions() {
    return {}
  }

  gotoHealthPlanProgramReportProfile(healthPlanProgramReport) {
    const pathArray = pathHelper.buildPathArray(window.location, healthPlanProgramReport, "profile")

    pathHelper.gotoPage(pathArray)
  }

  helper() {
    return healthPlanProgramReportHelper
  }

  loadData() {
    this.clearData()
    this.defaultParameters()
    this.refreshData()
  }

  refreshData() {
    this.removeField("healthPlanProgramReportHeaders")

    this.fetchList(
      healthPlanProgramReportListMethods,
      (healthPlanProgramReports, healthPlanProgramReportHeaders) => {
        this.addData(
          { healthPlanProgramReports, "page": pageHelper.updatePageFromLastPage(healthPlanProgramReportHeaders) },
          this.redrawView
        )
      },
      this.onError
    )
  }

  title() {
    return "Health Plan Program Reports"
  }
}

export { HealthPlanProgramReportsPageViewModel }
