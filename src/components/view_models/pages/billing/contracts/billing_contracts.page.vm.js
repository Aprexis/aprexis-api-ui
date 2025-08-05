import { AbstractListPageViewModel } from "../../abstract_list.page.vm.js"
import { billingContractApi, pageHelper, billingContractHelper } from "@aprexis/aprexis-api-utility"
import { apiEnvironmentHelper, authorizationHelper, filtersHelper, pathHelper, userCredentialsHelper } from "../../../../../helpers/index.js"

const billingContractListMethods = [
  { pathKey: "health-plans", method: billingContractApi.listForHealthPlan }
]

class BillingContractsPageViewModel extends AbstractListPageViewModel {
  constructor(props) {
    super(props)

    this.canCreate = this.canCreate.bind(this)
    this.createModal = this.createModal.bind(this)
    this.defaultParameters = this.defaultParameters.bind(this)
    this.editModal = this.editModal.bind(this)
    this.filterDescriptions = this.filterDescriptions.bind(this)
    this.filtersOptions = this.filtersOptions.bind(this)
    this.gotoBillingContractProfile = this.gotoBillingContractProfile.bind(this)
    this.loadData = this.loadData.bind(this)
    this.refreshData = this.refreshData.bind(this)
    this.title = this.title.bind(this)
  }

  canCreate() {
    const { currentUser } = this.props
    const pathEntries = this.pathEntries()

    return canBeCreated(currentUser, pathEntries)

    function canBeCreated(user, pathEntries) {
      if (!authorizationHelper.canCreateBillingContract(user)) {
        return false
      }

      return pathHelper.isSingular(pathEntries, "health-plans")
    }
  }

  createModal() {
    const pathEntries = this.pathEntries()
    const healthPlanId = pathHelper.id(pathEntries, "health-plans")

    billingContractApi.buildNew(
      apiEnvironmentHelper.apiEnvironment(userCredentialsHelper.get()), this.props.reconnectAndRetry,
      healthPlanId,
      (billingContract) => {
        this.props.launchModal(
          "billing-contract",
          { operation: "create", onUpdateView: this.refreshData, billingContract }
        )
      },
      this.onError
    )
  }

  defaultParameters() {
    const filters = { for_active: true }
    const sorting = { sort: "name" }
    this.addData({ filters, sorting, page: this.defaultPage() })
  }

  editModal(billingContractToEdit) {
    billingContractApi.edit(
      apiEnvironmentHelper.apiEnvironment(userCredentialsHelper.get(), this.props.reconnectAndRetry),
      billingContractHelper.id(billingContractToEdit),
      (billingContract) => {
        this.props.launchModal(
          "billing-contract",
          { operation: "update", onUpdateView: this.refreshData, billingContract })
      },
      this.onError
    )
  }

  filterDescriptions(_filters, _filtersOptions) {
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

  title() {
    return "Billing Contracts"
  }
}

export { BillingContractsPageViewModel }
