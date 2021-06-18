import { AbstractListPageViewModel } from "../../"
import { billingContractPharmacyChainApi } from "../../../../../api/billing"
import { filtersHelper, pageHelper, pathHelper } from "../../../../../helpers"

const billingContractPharmacyChainListMethods = [
  { pathKey: "billing-contracts", method: billingContractPharmacyChainApi.listForBillingContract }
]

class BillingContractPharmacyChainsPageViewModel extends AbstractListPageViewModel {
  constructor(props) {
    super(props)

    this.defaultParameters = this.defaultParameters.bind(this)
    this.filterDescriptions = this.filterDescriptions.bind(this)
    this.filtersOptions = this.filtersOptions.bind(this)
    this.gotoBillingContractPharmacyChainProfile = this.gotoBillingContractPharmacyChainProfile.bind(this)
    this.loadData = this.loadData.bind(this)
    this.refreshData = this.refreshData.bind(this)
  }

  defaultParameters() {
    const filters = { for_active: true }
    const sorting = { sort: "name" }
    this.addData({ filters, sorting, page: this.defaultPage() })
  }

  filterDescriptions(filters, filtersOptions) {
    return [
      filtersHelper.stringFilter("Pharmacy Chain", "for_pharmacy_name")
    ]
  }

  filtersOptions() {
    return {}
  }

  gotoBillingContractPharmacyChainProfile(billingContractPharmacyChain) {
    const pathArray = pathHelper.buildPathArray(window.location, billingContractPharmacyChain, "profile")

    pathHelper.gotoPage(pathArray)
  }

  loadData() {
    this.clearData()
    this.defaultParameters()
    this.refreshData()
  }

  refreshData() {
    this.removeField("billingContractPharmacyChainHeaders")
    this.fetchList(
      billingContractPharmacyChainListMethods,
      (billingContractPharmacyChains, billingContractPharmacyChainHeaders) => {
        this.addData(
          { billingContractPharmacyChains, page: pageHelper.updatePageFromLastPage(billingContractPharmacyChainHeaders) },
          this.redrawView
        )
      },
      this.onError
    )
  }
}

export { BillingContractPharmacyChainsPageViewModel }
