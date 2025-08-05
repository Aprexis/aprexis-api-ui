import { AbstractListPageViewModel } from "../../abstract_list.page.vm.js"
import { loadProviderApi, pageHelper } from "@aprexis/aprexis-api-utility"
import { apiEnvironmentHelper, filtersHelper, pathHelper, userCredentialsHelper } from "../../../../../helpers/index.js"

class LoadProvidersPageViewModel extends AbstractListPageViewModel {
  constructor(props) {
    super(props)

    this.defaultParameters = this.defaultParameters.bind(this)
    this.filterDescriptions = this.filterDescriptions.bind(this)
    this.filtersOptions = this.filtersOptions.bind(this)
    this.gotoLoadProviderProfile = this.gotoLoadProviderProfile.bind(this)
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

  gotoLoadProviderProfile(loadProvider) {
    const pathArray = pathHelper.buildPathArray(window.location, loadProvider, "profile")

    pathHelper.gotoPage(pathArray)
  }

  loadData() {
    this.clearData()
    this.defaultParameters()
    this.refreshData()
  }

  refreshData() {
    const userCredentials = userCredentialsHelper.get()
    this.removeField("loadProviderHeaders")
    const { filters, sorting, page } = this.data

    loadProviderApi.index(
      apiEnvironmentHelper.apiEnvironment(userCredentials, this.props.reconnectAndRetry),
      { ...filters, ...sorting, page },
      (loadProviders, loadProviderHeaders) => {
        this.addData(
          {
            loadProviders,
            page: pageHelper.updatePageFromLastPage(loadProviderHeaders)
          },
          this.redrawView
        )
      },
      this.onError
    )
  }

  title() {
    return "Load Providers"
  }
}

export { LoadProvidersPageViewModel }
