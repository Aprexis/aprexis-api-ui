import { AbstractListPageViewModel } from "../../"
import { diseaseApi } from "../../../../../api/admin"
import { filtersHelper, pageHelper, pathHelper, userCredentialsHelper } from "../../../../../helpers"

class DiseasesPageViewModel extends AbstractListPageViewModel {
  constructor(props) {
    super(props)

    this.defaultParameters = this.defaultParameters.bind(this)
    this.filterDescriptions = this.filterDescriptions.bind(this)
    this.filtersOptions = this.filtersOptions.bind(this)
    this.gotoDiseaseProfile = this.gotoDiseaseProfile.bind(this)
    this.loadData = this.loadData.bind(this)
    this.refreshData = this.refreshData.bind(this)
  }

  defaultParameters() {
    const filters = {}
    const sorting = { sort: "question_key" }
    this.addData({ filters, sorting, page: this.defaultPage() })
  }

  filterDescriptions(filters, filtersOptions) {
    return [
      filtersHelper.stringFilter("Question Key", "for_question_key")
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
      userCredentials,
      { ...filters, ...sorting, page },
      (diseases, diseaseHeaders) => {
        this.addData({ diseases })
        this.addField("page", pageHelper.updatePageFromLastPage(diseaseHeaders))
        this.redrawView()
      },
      this.onError
    )
  }
}

export { DiseasesPageViewModel }
