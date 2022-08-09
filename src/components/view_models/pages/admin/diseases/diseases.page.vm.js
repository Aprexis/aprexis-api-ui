import { AbstractListPageViewModel } from "../../"
import { diseaseApi, pageHelper } from "@aprexis/aprexis-api-utility"
import { apiEnvironmentHelper, filtersHelper, pathHelper, userCredentialsHelper } from "../../../../../helpers"

class DiseasesPageViewModel extends AbstractListPageViewModel {
  constructor(props) {
    super(props)

    this.defaultParameters = this.defaultParameters.bind(this)
    this.filterDescriptions = this.filterDescriptions.bind(this)
    this.filtersOptions = this.filtersOptions.bind(this)
    this.gotoDiseaseProfile = this.gotoDiseaseProfile.bind(this)
    this.loadData = this.loadData.bind(this)
    this.refreshData = this.refreshData.bind(this)
    this.title = this.title.bind(this)
  }

  defaultParameters() {
    const filters = {}
    const sorting = { sort: "question_key" }
    this.addData({ filters, sorting, page: this.defaultPage() })
  }

  filterDescriptions(_filters, _filtersOptions) {
    return [
      filtersHelper.stringFilter("Description", "for_description")
    ]
  }

  filtersOptions() {
    return {}
  }

  gotoDiseaseProfile(disease) {
    const pathArray = pathHelper.buildPathArray(window.location, disease, "profile")

    pathHelper.gotoPage(pathArray)
  }

  loadData() {
    this.clearData()
    this.defaultParameters()
    this.refreshData()
  }

  refreshData() {
    const userCredentials = userCredentialsHelper.get()
    this.removeField("diseaseHeaders")
    const { filters, sorting, page } = this.data

    diseaseApi.index(
      apiEnvironmentHelper.apiEnvironment(userCredentials),
      { ...filters, ...sorting, page },
      (diseases, diseaseHeaders) => {
        this.addData(
          {
            diseases,
            page: pageHelper.updatePageFromLastPage(diseaseHeaders)
          },
          this.redrawView
        )
      },
      this.onError
    )
  }

  title() {
    return "Diseases"
  }
}

export { DiseasesPageViewModel }
