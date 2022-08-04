import { AbstractListPageViewModel } from "../"
import { pharmacyStoreApi, pageHelper, valueHelper } from "@aprexis/aprexis-api-utility"
import { apiEnvironmentHelper, filtersHelper, pathHelper, userCredentialsHelper } from "../../../../helpers"

class PharmacyStoresPageViewModel extends AbstractListPageViewModel {
  constructor(props) {
    super(props)

    this.defaultParameters = this.defaultParameters.bind(this)
    this.filterDescriptions = this.filterDescriptions.bind(this)
    this.filtersOptions = this.filtersOptions.bind(this)
    this.gotoPharmacyStoreProfile = this.gotoPharmacyStoreProfile.bind(this)
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

  gotoPharmacyStoreProfile(pharmacyStore) {
    const pathArray = pathHelper.buildPathArray(window.location, pharmacyStore, "profile")

    pathHelper.gotoPage(pathArray)
  }

  loadData() {
    this.clearData()
    this.defaultParameters()
    this.refreshData()
  }

  refreshData() {
    const userCredentials = userCredentialsHelper.get()
    this.removeField("pharmacyStoreHeaders")
    const { filters, sorting, page } = this.data
    const pathEntries = this.pathEntries()

    list(
      pathEntries,
      userCredentials,
      { ...filters, ...sorting, page },
      (pharmacyStores, pharmacyStoreHeaders) => {
        this.addData(
          {
            pharmacyStores,
            page: pageHelper.updatePageFromLastPage(pharmacyStoreHeaders)
          },
          this.redrawView
        )
      },
      this.onError
    )

    function list(pathEntries, userCredentials, params, onSuccess, onError) {
      const pharmacyChain = pathEntries['pharmacy-chains']

      if (valueHelper.isValue(pharmacyChain)) {
        pharmacyStoreApi.listForPharmacyChain(apiEnvironmentHelper.apiEnvironment(userCredentials), pharmacyChain.value, params, onSuccess, onError)
        return
      }

      pharmacyStoreApi.list(apiEnvironmentHelper.apiEnvironment(userCredentials), params, onSuccess, onError)
    }
  }

  title() {
    return "Pharmacy Stores"
  }
}

export { PharmacyStoresPageViewModel }
