import { AbstractSelectAutocompleteViewModel } from "./"
import { billingContractApi, valueHelper, billingContractHelper } from "@aprexis/aprexis-api-utility"
import { apiEnvironmentHelper, pathHelper } from "../../../helpers"

class SelectBillingContractViewModel extends AbstractSelectAutocompleteViewModel {
  constructor(props) {
    super(props)

    this.api = this.api.bind(this)
    this.determineSelectStyle = this.determineSelectStyle.bind(this)
    this.displayModel = this.displayModel.bind(this)
    this.doSearch = this.doSearch.bind(this)
    this.fetchModel = this.fetchModel.bind(this)
    this.helper = this.helper.bind(this)
    this.loadData = this.loadData.bind(this)
    this.loadBillingContracts = this.loadBillingContracts.bind(this)
    this.modelSearchText = this.modelSearchText.bind(this)
  }

  api() {
    return billingContractApi
  }

  determineSelectStyle(billingContracts, billingContractHeaders) {
    if (billingContractHeaders.lastPage.total > billingContractHeaders.lastPage.size) {
      this.startSearch()
      return
    }

    this.addData({ models: billingContracts, useSearch: false })

    const { id } = this.props
    if (!valueHelper.isValue(id)) {
      this.redrawView()
      return
    }

    this.fetchModel(
      id,
      (item) => { this.addData({ item }, this.redrawView) },
      this.onError
    )
  }

  displayModel(model) {
    return this.helper().label(model)
  }

  doSearch(searchText, baseFilters, sorting, onSuccess, onFailure) {
    const filters = {
      ...baseFilters,
      for_store: searchText
    }

    this.api().search(apiEnvironmentHelper.apiEnvironment(this.getUserCredentials()), { ...filters, ...sorting }, onSuccess, onFailure)
  }

  fetchModel(id, onSuccess, onFailure) {
    this.api().show(apiEnvironmentHelper.apiEnvironment(this.getUserCredentials()), id, onSuccess, onFailure)
  }

  helper() {
    return billingContractHelper
  }

  loadData() {
    const health_plan_id = pathHelper.id(this.pathEntries(), "health-plans")

    this.clearData()
    this.loadBillingContracts(health_plan_id, this.determineSelectStyle)
  }

  loadBillingContracts(health_plan_id, nextOperation) {
    const params = { page: { number: 1, size: 25 }, sort: 'health_plan.name,name' }
    if (!valueHelper.isValue(health_plan_id)) {
      billingContractApi.list(
        apiEnvironmentHelper.apiEnvironment(this.getUserCredentials()),
        params,
        nextOperation,
        this.onError
      )
      return
    }

    this.api().listForHealthPlan(
      apiEnvironmentHelper.apiEnvironment(this.getUserCredentials()),
      health_plan_id,
      params,
      nextOperation,
      this.onError
    )
  }

  modelSearchText(model) {
    return this.displayModel(model)
  }
}

export { SelectBillingContractViewModel }
