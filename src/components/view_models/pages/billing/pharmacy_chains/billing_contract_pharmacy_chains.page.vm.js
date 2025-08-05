import { AbstractListPageViewModel } from "../../abstract_list.page.vm.js"
import { billingContractApi, billingContractPharmacyChainApi, pageHelper, valueHelper, billingContractHelper } from "@aprexis/aprexis-api-utility"
import { apiEnvironmentHelper, authorizationHelper, filtersHelper, pathHelper, userCredentialsHelper } from "../../../../../helpers/index.js"

const billingContractPharmacyChainListMethods = [
  { pathKey: "billing-contracts", method: billingContractPharmacyChainApi.listForBillingContract }
]

class BillingContractPharmacyChainsPageViewModel extends AbstractListPageViewModel {
  constructor(props) {
    super(props)

    this.canCreate = this.canCreate.bind(this)
    this.createModal = this.createModal.bind(this)
    this.defaultParameters = this.defaultParameters.bind(this)
    this.editModal = this.editModal.bind(this)
    this.fetchBillingContract = this.fetchBillingContract.bind(this)
    this.filterDescriptions = this.filterDescriptions.bind(this)
    this.filtersOptions = this.filtersOptions.bind(this)
    this.gotoBillingContractPharmacyChainProfile = this.gotoBillingContractPharmacyChainProfile.bind(this)
    this.loadData = this.loadData.bind(this)
    this.refreshData = this.refreshData.bind(this)
    this.title = this.title.bind(this)
  }

  canCreate() {
    const { billingContract } = this.data
    const { currentUser } = this.props

    return canBeCreated(currentUser, billingContract)

    function canBeCreated(user, billingContract) {
      if (!billingContractHelper.allowPharmacyChains(billingContract)) {
        return false
      }

      return authorizationHelper.canCreateBillingContractPharmacyChain(user)
    }
  }

  createModal() {
    const pathEntries = this.pathEntries()
    const contractId = pathHelper.id(pathEntries, "billing-contracts")

    billingContractPharmacyChainApi.buildNewForBillingContract(
      apiEnvironmentHelper.apiEnvironment(userCredentialsHelper.get(), this.props.reconnectAndRetry),
      contractId,
      (billingContractPharmacyChain) => {
        this.props.launchModal(
          "billing-contract-pharmacy-chain",
          { operation: "create", onUpdateView: this.refreshData, billingContractPharmacyChain }
        )
      },
      this.onError
    )
  }

  defaultParameters() {
    const filters = { for_active: true }
    const sorting = { sort: "pharmacy.name" }
    this.addData({ filters, sorting, page: this.defaultPage() })
  }

  editModal(billingContractPharmacyChainToEdit) {
    billingContractPharmacyChainApi.edit(
      apiEnvironmentHelper.apiEnvironment(userCredentialsHelper.get(), this.props.reconnectAndRetry),
      billingContractPharmacyChainToEdit.id,
      (billingContractPharmacyChain) => {
        this.props.launchModal(
          "billing-contract-pharmacy-chain",
          { operation: "update", onUpdateView: this.refreshData, billingContractPharmacyChain })
      },
      this.onError
    )
  }

  filterDescriptions(_filters, _filtersOptions) {
    return [
      filtersHelper.stringFilter("Pharmacy Chain", "for_pharmacy_name")
    ]
  }

  fetchBillingContract(nextOperation) {
    const billing_contract_id = pathHelper.id(this.pathEntries(), "billing-contracts")
    if (!valueHelper.isValue(billing_contract_id)) {
      this.addField("billingContract", undefined, nextOperation)
    }

    billingContractApi.profile(
      apiEnvironmentHelper.apiEnvironment(userCredentialsHelper.get(), this.props.reconnectAndRetry),
      billing_contract_id,
      (billingContract) => {
        this.addData({ billingContract }, nextOperation)
      },
      this.onError
    )
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
    this.fetchBillingContract(
      () => {
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
    )
  }

  title() {
    return "Billing Contract Pharmacy Chains"
  }
}

export { BillingContractPharmacyChainsPageViewModel }
