import { AbstractListPageViewModel } from "../.."
import { billingContractPharmacyStoreApi } from "../../../../../api/billing"
import { filtersHelper, pageHelper, pathHelper } from "../../../../../helpers"

const billingContractPharmacyStoreListMethods = [
  { pathKey: "billing-contracts", method: billingContractPharmacyStoreApi.listForBillingContract }
]

class BillingContractPharmacyStoresPageViewModel extends AbstractListPageViewModel {
  constructor(props) {
    super(props)

    this.defaultParameters = this.defaultParameters.bind(this)
    this.filterDescriptions = this.filterDescriptions.bind(this)
    this.filtersOptions = this.filtersOptions.bind(this)
    this.gotoBillingContractPharmacyStoreProfile = this.gotoBillingContractPharmacyStoreProfile.bind(this)
    this.loadData = this.loadData.bind(this)
    this.refreshData = this.refreshData.bind(this)
    this.title = this.title.bind(this)
  }

  defaultParameters() {
    const filters = { for_active: true }
    const sorting = { sort: "pharmacy_store.name,pharmacy_store.store_number" }
    this.addData({ filters, sorting, page: this.defaultPage() })
  }

  filterDescriptions(filters, filtersOptions) {
    return [
      filtersHelper.stringFilter("Pharmacy Store", "for_pharmacy_store_name")
    ]
  }

  filtersOptions() {
    return {}
  }

  gotoBillingContractPharmacyStoreProfile(billingContractPharmacyStore) {
    const pathArray = pathHelper.buildPathArray(window.location, billingContractPharmacyStore, "profile")

    pathHelper.gotoPage(pathArray)
  }

  loadData() {
    this.clearData()
    this.defaultParameters()
    this.refreshData()
  }

  refreshData() {
    this.removeField("billingContractPharmacyStoreHeaders")
    this.fetchList(
      billingContractPharmacyStoreListMethods,
      (billingContractPharmacyStores, billingContractPharmacyStoreHeaders) => {
        this.addData(
          {
            billingContractPharmacyStores,
            page: pageHelper.updatePageFromLastPage(billingContractPharmacyStoreHeaders)
          },
          this.redrawView
        )
      },
      this.onError
    )
  }

  title() {
    return "Billing Contract Pharmacy Stores"
  }
}

export { BillingContractPharmacyStoresPageViewModel }
