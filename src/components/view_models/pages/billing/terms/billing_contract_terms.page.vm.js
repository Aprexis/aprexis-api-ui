import { AbstractListPageViewModel } from "../.."
import { billingContractTermApi } from "../../../../../api/billing"
import { pageHelper, pathHelper, userCredentialsHelper } from "../../../../../helpers"

const billingContractTermListMethods = [
  { pathKey: "billing-contracts", method: billingContractTermApi.listForBillingContract }
]

class BillingContractTermsPageViewModel extends AbstractListPageViewModel {
  constructor(props) {
    super(props)

    this.defaultParameters = this.defaultParameters.bind(this)
    this.editProfileModal = this.editProfileModal.bind(this)
    this.filterDescriptions = this.filterDescriptions.bind(this)
    this.filtersOptions = this.filtersOptions.bind(this)
    this.gotoBillingContractTermProfile = this.gotoBillingContractTermProfile.bind(this)
    this.loadData = this.loadData.bind(this)
    this.refreshData = this.refreshData.bind(this)
    this.title = this.title.bind(this)
  }

  defaultParameters() {
    const filters = {}
    const sorting = {}
    this.addData({ filters, sorting, page: this.defaultPage() })
  }

  editProfileModal(billingContractTermToEdit) {
    billingContractTermApi.edit(
      userCredentialsHelper.get(),
      billingContractTermToEdit.id,
      (billingContractTerm) => {
        this.props.launchModal(
          "billing-contract-term-profile",
          { operation: "update", onUpdateView: this.refreshData, billingContractTerm })
      },
      this.onError
    )
  }

  filterDescriptions(filters, filtersOptions) {
    return []
  }

  filtersOptions() {
    return {}
  }

  gotoBillingContractTermProfile(billingContractTerm) {
    const pathArray = pathHelper.buildPathArray(window.location, billingContractTerm, "profile")

    pathHelper.gotoPage(pathArray)
  }

  loadData() {
    this.clearData()
    this.defaultParameters()
    this.refreshData()
  }

  refreshData() {
    this.removeField("billingContractTermHeaders")
    this.fetchList(
      billingContractTermListMethods,
      (billingContractTerms, billingContractTermHeaders) => {
        this.addData(
          { billingContractTerms, page: pageHelper.updatePageFromLastPage(billingContractTermHeaders) },
          this.redrawView
        )
      },
      this.onError
    )
  }

  title() {
    return "Billing Contract Terms"
  }
}

export { BillingContractTermsPageViewModel }
