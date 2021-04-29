import { AbstractListPageViewModel } from "../../"
import { labTestApi } from "../../../../../api/admin"
import { filtersHelper, pageHelper, pathHelper, userCredentialsHelper } from "../../../../../helpers"

class LabTestsPageViewModel extends AbstractListPageViewModel {
  constructor(props) {
    super(props)

    this.defaultParameters = this.defaultParameters.bind(this)
    this.filterDescriptions = this.filterDescriptions.bind(this)
    this.filtersOptions = this.filtersOptions.bind(this)
    this.gotoLabTestProfile = this.gotoLabTestProfile.bind(this)
    this.loadData = this.loadData.bind(this)
    this.refreshData = this.refreshData.bind(this)
  }

  defaultParameters() {
    const filters = {}
    const sorting = { sort: "key_code" }
    this.addData({ filters, sorting, page: this.defaultPage() })
  }

  filterDescriptions(filters, filtersOptions) {
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
      userCredentials,
      { ...filters, ...sorting, page },
      (labTests, labTestHeaders) => {
        this.addData({ labTests })
        this.addField("page", pageHelper.updatePageFromLastPage(labTestHeaders))
        this.redrawView()
      },
      this.onError
    )
  }
}

export { LabTestsPageViewModel }
