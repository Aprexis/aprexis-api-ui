import { AbstractListPageViewModel } from "../../"
import { billingContractApi } from "../../../../../api/billing"
import { filtersHelper, pageHelper, pathHelper } from "../../../../../helpers"

const billingContractListMethods = [
  { pathKey: "health-plans", method: billingContractApi.listForHealthPlan }
]

class BillingContractsPageViewModel extends AbstractListPageViewModel {
  constructor(props) {
    super(props)

    this.defaultParameters = this.defaultParameters.bind(this)
    this.filterDescriptions = this.filterDescriptions.bind(this)
    this.filtersOptions = this.filtersOptions.bind(this)
    this.gotoBillingContractProfile = this.gotoBillingContractProfile.bind(this)
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
      filtersHelper.booleanFilter("Status", "for_active", { falseLabel: "Inactive", trueLabel: "Active" }),
      filtersHelper.stringFilter("Name", "for_name")
    ]
  }

  filtersOptions() {
    return {}
  }

  gotoBillingContractProfile(billingContract) {
    const pathArray = pathHelper.buildPathArray(window.location, billingContract, "profile")

    pathHelper.gotoPage(pathArray)
  }

  loadData() {
    this.clearData()
    this.defaultParameters()
    this.refreshData()
  }

  refreshData() {
    this.removeField("billingContractHeaders")
    this.fetchList(
      billingContractListMethods,
      (billingContracts, billingContractHeaders) => {
        this.addData(
          { billingContracts, page: pageHelper.updatePageFromLastPage(billingContractHeaders) },
          this.redrawView
        )
      },
      this.onError
    )
  }
}

export { BillingContractsPageViewModel }