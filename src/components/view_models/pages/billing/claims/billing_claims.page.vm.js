import { AbstractListPageViewModel } from "../../"
import { billingClaimApi, pageHelper } from "@aprexis/aprexis-api-utility"
import { filtersHelper, pathHelper } from "../../../../../helpers"

const billingClaimListMethods = [
  { pathKey: "health-plans", method: billingClaimApi.listForHealthPlan },
  { pathKey: "pharmacy-stores", method: billingClaimApi.listForPharmacyStore }
]

class BillingClaimsPageViewModel extends AbstractListPageViewModel {
  constructor(props) {
    super(props)

    this.defaultParameters = this.defaultParameters.bind(this)
    this.filterDescriptions = this.filterDescriptions.bind(this)
    this.filtersOptions = this.filtersOptions.bind(this)
    this.gotoBillingClaimProfile = this.gotoBillingClaimProfile.bind(this)
    this.loadData = this.loadData.bind(this)
    this.refreshData = this.refreshData.bind(this)
    this.title = this.title.bind(this)
  }

  defaultParameters() {
    const filters = {}
    const sorting = { sort: "submitted_at-" }
    this.addData({ filters, sorting, page: this.defaultPage() })
  }

  filterDescriptions(_filters, _filtersOptions) {
    return [
      filtersHelper.stringFilter("Patient Name", "for_patient_name")
    ]
  }

  filtersOptions() {
    return {}
  }

  gotoBillingClaimProfile(billingClaim) {
    const pathArray = pathHelper.buildPathArray(window.location, billingClaim, "profile")

    pathHelper.gotoPage(pathArray)
  }

  loadData() {
    this.clearData()
    this.defaultParameters()
    this.refreshData()
  }

  refreshData() {
    this.removeField("billingClaimHeaders")
    this.fetchList(
      billingClaimListMethods,
      (billingClaims, billingClaimHeaders) => {
        this.addData(
          { billingClaims, page: pageHelper.updatePageFromLastPage(billingClaimHeaders) },
          this.redrawView
        )
      },
      this.onError
    )
  }

  title() {
    return "Billing Claims"
  }
}

export { BillingClaimsPageViewModel }
