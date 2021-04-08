import { AbstractListPageViewModel } from "../"
import { pharmacyStoreApi } from "../../../../api"
import { filtersHelper, pageHelper, pathHelper, userCredentialsHelper, valueHelper } from "../../../../helpers"

class PharmacyStoresPageViewModel extends AbstractListPageViewModel {
  constructor(props) {
    super(props)

    this.defaultParameters = this.defaultParameters.bind(this)
    this.filterDescriptions = this.filterDescriptions.bind(this)
    this.filtersOptions = this.filtersOptions.bind(this)
    this.gotoPharmacyStoreProfile = this.gotoPharmacyStoreProfile.bind(this)
    this.loadData = this.loadData.bind(this)
    this.refreshData = this.refreshData.bind(this)
  }

  defaultParameters() {
    const filters = {}
    const sorting = { sort: "name" }
    this.addData({ filters, sorting, page: this.defaultPage() })
  }

  filterDescriptions(filters, filtersOptions) {
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

    list(
      userCredentials,
      { ...filters, ...sorting, page },
      (pharmacyStores, pharmacyStoreHeaders) => {
        this.addData({ pharmacyStores })
        this.addField("page", pageHelper.updatePageFromLastPage(pharmacyStoreHeaders))
        this.redrawView()
      },
      this.onError
    )

    function list(userCredentials, params, onSuccess, onError) {
      const pathEntries = pathHelper.parsePathEntries(window.location)
      const pharmacyChain = pathEntries['pharmacy-chains']

      if (valueHelper.isValue(pharmacyChain)) {
        pharmacyStoreApi.listForPharmacyChain(userCredentials, pharmacyChain.value, params, onSuccess, onError)
        return
      }

      pharmacyStoreApi.list(userCredentials, params, onSuccess, onError)
    }
  }
}

export { PharmacyStoresPageViewModel }
