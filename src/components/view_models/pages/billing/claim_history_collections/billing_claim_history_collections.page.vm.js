import { AbstractListPageViewModel } from "../../"
import { billingClaimHistoryCollectionApi } from "../../../../../api/billing"
import { pageHelper } from "../../../../../helpers"
import { billingClaimHistoryCollectionHelper } from "../../../../../helpers/billing"


class BillingClaimHistoryCollectionsPageViewModel extends AbstractListPageViewModel {
  constructor(props) {
    super(props)

    this.api = this.api.bind(this)
    this.canCreate = this.canCreate.bind(this)
    this.defaultParameters = this.defaultParameters.bind(this)
    this.filterDescriptions = this.filterDescriptions.bind(this)
    this.filtersOptions = this.filtersOptions.bind(this)
    //this.gotoBillingClaimHistoryCollectionProfile = this.gotoBillingClaimHistoryCollectionProfile.bind(this)
    this.helper = this.helper.bind(this)
    this.loadData = this.loadData.bind(this)
    this.refreshData = this.refreshData.bind(this)
    this.title = this.title.bind(this)
  }

  api() {
    return billingClaimHistoryCollectionApi
  }

  canCreate() {
    return false
  }

  defaultParameters() {
    const filters = []
    const sorting = { sort: "created_at" }

    this.addData({ filters, sorting, page: this.defaultPage() })
  }

  filterDescriptions(_filters, _filtersOptions) {
    return []
  }

  filtersOptions() {
    return {}
  }

  /*
  gotoBillingClaimHistoryCollectionProfile(billingClaimHistoryCollection) {
    const pathArray = pathHelper.buildPathArray(window.location, billingClaimHistoryCollection, "profile")

    pathHelper.gotoPage(pathArray)
  }
  */

  helper() {
    return billingClaimHistoryCollectionHelper
  }

  loadData() {
    this.clearData()
    this.defaultParameters()
    this.refreshData()
  }

  refreshData() {
    this.removeField("billingClaimHistoryCollectionHeaders")
    this.fetchList(
      this.api().index,
      (billingClaimHistoryCollections, billingClaimHistoryCollectionHeaders) => {
        this.addData(
          { billingClaimHistoryCollections, page: pageHelper.updatePageFromLastPage(billingClaimHistoryCollectionHeaders) },
          this.redrawView
        )
      },
      this.onError
    )
  }

  title() {
    return "Billing Claim History Collections"
  }
}

export { BillingClaimHistoryCollectionsPageViewModel }
