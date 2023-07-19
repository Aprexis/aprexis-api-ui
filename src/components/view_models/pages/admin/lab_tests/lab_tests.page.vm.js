import { AbstractListPageViewModel } from "../../"
import { labTestApi, pageHelper } from "@aprexis/aprexis-api-utility"
import { apiEnvironmentHelper, filtersHelper, pathHelper, userCredentialsHelper } from "../../../../../helpers"

class LabTestsPageViewModel extends AbstractListPageViewModel {
  constructor(props) {
    super(props)

    this.defaultParameters = this.defaultParameters.bind(this)
    this.filterDescriptions = this.filterDescriptions.bind(this)
    this.filtersOptions = this.filtersOptions.bind(this)
    this.gotoLabTestProfile = this.gotoLabTestProfile.bind(this)
    this.loadData = this.loadData.bind(this)
    this.refreshData = this.refreshData.bind(this)
    this.title = this.title.bind(this)
  }

  defaultParameters() {
    const filters = {}
    const sorting = { sort: "key_code" }
    this.addData({ filters, sorting, page: this.defaultPage() })
  }

  filterDescriptions(_filters, _filtersOptions) {
    return [
      filtersHelper.stringFilter("Key Code", "for_key_code"),
      filtersHelper.stringFilter("Name", "for_name")
    ]
  }

  filtersOptions() {
    return {}
  }

  gotoLabTestProfile(labTest) {
    const pathArray = pathHelper.buildPathArray(window.location, labTest, "profile")

    pathHelper.gotoPage(pathArray)
  }

  loadData() {
    this.clearData()
    this.defaultParameters()
    this.refreshData()
  }

  refreshData() {
    const userCredentials = userCredentialsHelper.get()
    this.removeField("labTestHeaders")
    const { filters, sorting, page } = this.data

    labTestApi.index(
      apiEnvironmentHelper.apiEnvironment(userCredentials, this.props.reconnectAndRetry),
      { ...filters, ...sorting, page },
      (labTests, labTestHeaders) => {
        this.addData(
          {
            labTests,
            page: pageHelper.updatePageFromLastPage(labTestHeaders)
          },
          this.redrawView
        )
      },
      this.onError
    )
  }

  title() {
    return "Lab Tests"
  }
}

export { LabTestsPageViewModel }
