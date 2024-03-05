import { AbstractListPageViewModel } from "../../"
import { nadacApi, pageHelper } from "@aprexis/aprexis-api-utility"
import { apiEnvironmentHelper, filtersHelper, userCredentialsHelper } from "../../../../../helpers"

class NadacPricesPageViewModel extends AbstractListPageViewModel {
  constructor(props) {
    super(props)

    this.defaultParameters = this.defaultParameters.bind(this)
    this.filterDescriptions = this.filterDescriptions.bind(this)
    this.filtersOptions = this.filtersOptions.bind(this)
    this.loadData = this.loadData.bind(this)
    this.refreshData = this.refreshData.bind(this)
    this.title = this.title.bind(this)
  }

  defaultParameters() {
    const filters = {}
    const sorting = { sort: "ndc11" }
    this.addData({ filters, sorting, page: this.defaultPage() })
  }

  filterDescriptions(_filters, _filtersOptions) {
    return [
      filtersHelper.stringFilter("Label", "for_label"),
      filtersHelper.stringFilter("NDC", "for_ndc")
    ]
  }

  filtersOptions() {
    return {}
  }

  loadData() {
    this.clearData()
    this.defaultParameters()
    this.refreshData()
  }

  refreshData() {
    const userCredentials = userCredentialsHelper.get()
    this.removeField("nadacPriceHeaders")
    const { filters, sorting, page } = this.data

    nadacApi.list(
      apiEnvironmentHelper.apiEnvironment(userCredentials, this.props.reconnectAndRetry),
      { ...filters, ...sorting, page },
      (nadacPrices, nadacPriceHeaders) => {
        this.addData(
          {
            nadacPrices,
            page: pageHelper.updatePageFromLastPage(nadacPriceHeaders)
          },
          this.redrawView
        )
      },
      this.onError
    )
  }

  title() {
    return "NADAC Prices"
  }
}

export { NadacPricesPageViewModel }
