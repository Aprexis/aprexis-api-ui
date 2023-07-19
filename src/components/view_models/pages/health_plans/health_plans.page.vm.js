import { AbstractListPageViewModel } from "../"
import { healthPlanApi, pageHelper } from "@aprexis/aprexis-api-utility"
import { apiEnvironmentHelper, filtersHelper, pathHelper, userCredentialsHelper } from "../../../../helpers"

class HealthPlansPageViewModel extends AbstractListPageViewModel {
  constructor(props) {
    super(props)

    this.defaultParameters = this.defaultParameters.bind(this)
    this.filterDescriptions = this.filterDescriptions.bind(this)
    this.filtersOptions = this.filtersOptions.bind(this)
    this.gotoHealthPlanProfile = this.gotoHealthPlanProfile.bind(this)
    this.loadData = this.loadData.bind(this)
    this.refreshData = this.refreshData.bind(this)
  }

  defaultParameters() {
    const filters = { for_active: true }
    const sorting = { sort: "name" }
    this.addData({ filters, sorting, page: this.defaultPage() })
  }

  filterDescriptions(_filters, _filtersOptions) {
    return [
      filtersHelper.booleanFilter("Status", "for_active", { falseLabel: "Inactive", trueLabel: "Active" }),
      filtersHelper.stringFilter("Name", "for_name"),
      filtersHelper.stringFilter("Code", "for_code")
    ]
  }

  filtersOptions() {
    return {}
  }

  gotoHealthPlanProfile(healthPlan) {
    const pathArray = pathHelper.buildPathArray(window.location, healthPlan, "profile")

    pathHelper.gotoPage(pathArray)
  }

  loadData() {
    this.clearData()
    this.defaultParameters()
    this.refreshData()
  }

  refreshData() {
    const userCredentials = userCredentialsHelper.get()
    this.removeField("healthPlanHeaders")
    const { filters, sorting, page } = this.data

    healthPlanApi.list(
      apiEnvironmentHelper.apiEnvironment(userCredentials, this.props.reconnectAndRetry),
      { ...filters, ...sorting, page },
      (healthPlans, healthPlanHeaders) => {
        this.addData(
          {
            healthPlans,
            page: pageHelper.updatePageFromLastPage(healthPlanHeaders)
          },
          this.redrawView
        )
      },
      this.onError
    )
  }

  title() {
    return "Health Plans"
  }
}

export { HealthPlansPageViewModel }
