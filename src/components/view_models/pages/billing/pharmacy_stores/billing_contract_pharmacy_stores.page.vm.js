import { AbstractListPageViewModel } from "../.."
import { billingContractApi, billingContractPharmacyStoreApi, pageHelper, valueHelper, billingContractHelper } from "@aprexis/aprexis-api-utility"
import { apiEnvironmentHelper, authorizationHelper, filtersHelper, pathHelper, userCredentialsHelper } from "../../../../../helpers"

const billingContractPharmacyStoreListMethods = [
  { pathKey: "billing-contracts", method: billingContractPharmacyStoreApi.listForBillingContract }
]

class BillingContractPharmacyStoresPageViewModel extends AbstractListPageViewModel {
  constructor(props) {
    super(props)

    this.canCreate = this.canCreate.bind(this)
    this.createModal = this.createModal.bind(this)
    this.defaultParameters = this.defaultParameters.bind(this)
    this.editModal = this.editModal.bind(this)
    this.fetchBillingContract = this.fetchBillingContract.bind(this)
    this.filterDescriptions = this.filterDescriptions.bind(this)
    this.filtersOptions = this.filtersOptions.bind(this)
    this.gotoBillingContractPharmacyStoreProfile = this.gotoBillingContractPharmacyStoreProfile.bind(this)
    this.loadData = this.loadData.bind(this)
    this.refreshData = this.refreshData.bind(this)
    this.title = this.title.bind(this)
  }

  canCreate() {
    const { billingContract } = this.data
    const { currentUser } = this.props

    return canBeCreated(currentUser, billingContract)

    function canBeCreated(user, billingContract) {
      if (!billingContractHelper.allowPharmacyStores(billingContract)) {
        return false
      }

      return authorizationHelper.canCreateBillingContractPharmacyStore(user)
    }
  }

  createModal() {
    const pathEntries = this.pathEntries()
    const contractId = pathHelper.id(pathEntries, "billing-contracts")

    billingContractPharmacyStoreApi.buildNewForBillingContract(
      apiEnvironmentHelper.apiEnvironment(userCredentialsHelper.get(), this.props.reconnectAndRetry),
      contractId,
      (billingContractPharmacyStore) => {
        this.props.launchModal(
          "billing-contract-pharmacy-store",
          { operation: "create", onUpdateView: this.refreshData, billingContractPharmacyStore }
        )
      },
      this.onError
    )
  }

  defaultParameters() {
    const filters = { for_active: true }
    const sorting = { sort: "pharmacy_store.name,pharmacy_store.store_number" }
    this.addData({ filters, sorting, page: this.defaultPage() })
  }

  editModal(billingContractPharmacyStoreToEdit) {
    billingContractPharmacyStoreApi.edit(
      apiEnvironmentHelper.apiEnvironment(userCredentialsHelper.get(), this.props.reconnectAndRetry),
      billingContractPharmacyStoreToEdit.id,
      (billingContractPharmacyStore) => {
        this.props.launchModal(
          "billing-contract-pharmacy-store",
          { operation: "update", onUpdateView: this.refreshData, billingContractPharmacyStore })
      },
      this.onError
    )
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

  filterDescriptions(_filters, _filtersOptions) {
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
    this.fetchBillingContract(
      () => {
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
      },
      this.onError
    )
  }

  title() {
    return "Billing Contract Pharmacy Stores"
  }
}

export { BillingContractPharmacyStoresPageViewModel }
