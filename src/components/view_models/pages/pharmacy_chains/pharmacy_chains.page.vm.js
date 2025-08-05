import { AbstractListPageViewModel } from "../abstract_list.page.vm.js"
import { pharmacyChainApi, pageHelper } from "@aprexis/aprexis-api-utility"
import { apiEnvironmentHelper, filtersHelper, pathHelper, userCredentialsHelper } from "../../../../helpers/index.js"

class PharmacyChainsPageViewModel extends AbstractListPageViewModel {
  constructor(props) {
    super(props)

    this.defaultParameters = this.defaultParameters.bind(this)
    this.filterDescriptions = this.filterDescriptions.bind(this)
    this.filtersOptions = this.filtersOptions.bind(this)
    this.gotoPharmacyChainProfile = this.gotoPharmacyChainProfile.bind(this)
    this.loadData = this.loadData.bind(this)
    this.refreshData = this.refreshData.bind(this)
    this.title = this.title.bind(this)
  }

  defaultParameters() {
    const filters = {}
    const sorting = { sort: "name" }
    this.addData({ filters, sorting, page: this.defaultPage() })
  }

  filterDescriptions(_filters, _filtersOptions) {
    return [
      filtersHelper.stringFilter("Name", "for_name")
    ]
  }

  filtersOptions() {
    return {}
  }

  gotoPharmacyChainProfile(pharmacyChain) {
    const pathArray = pathHelper.buildPathArray(window.location, pharmacyChain, "profile")

    pathHelper.gotoPage(pathArray)
  }

  loadData() {
    this.clearData()
    this.defaultParameters()
    this.refreshData()
  }

  refreshData() {
    const userCredentials = userCredentialsHelper.get()
    this.removeField("pharmacyChainHeaders")
    const { filters, sorting, page } = this.data

    pharmacyChainApi.list(
      apiEnvironmentHelper.apiEnvironment(userCredentials, this.props.reconnectAndRetry),
      { ...filters, ...sorting, page },
      (pharmacyChains, pharmacyChainHeaders) => {
        this.addData(
          {
            pharmacyChains,
            page: pageHelper.updatePageFromLastPage(pharmacyChainHeaders)
          },
          this.redrawView
        )
      },
      this.onError
    )
  }

  title() {
    return "Pharmacy Chains"
  }
}

export { PharmacyChainsPageViewModel }
