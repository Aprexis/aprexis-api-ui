import { AbstractSelectAutocompleteViewModel } from "./"
import { billingContractApi } from "../../../api/billing"
import { userCredentialsHelper, pathHelper, valueHelper } from "../../../helpers"
import { billingContractHelper } from "../../../helpers/billing"

class SelectBillingContractViewModel extends AbstractSelectAutocompleteViewModel {
  constructor(props) {
    super(props)

    this.determineSelectStyle = this.determineSelectStyle.bind(this)
    this.displayModel = this.displayModel.bind(this)
    this.doSearch = this.doSearch.bind(this)
    this.fetchModel = this.fetchModel.bind(this)
    this.loadData = this.loadData.bind(this)
    this.loadBillingContracts = this.loadBillingContracts.bind(this)
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
    return billingContractHelper.store(model)
  }

  doSearch(searchText, baseFilters, sorting, onSuccess, onFailure) {
    const filters = {
      ...baseFilters,
      for_store: searchText
    }

    billingContractApi.search(userCredentialsHelper.get(), { ...filters, ...sorting }, onSuccess, onFailure)
  }

  fetchModel(id, onSuccess, onFailure) {
    billingContractApi.show(userCredentialsHelper.get(), id, onSuccess, onFailure)
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
        userCredentialsHelper.get(),
        params,
        nextOperation,
        this.onError
      )
      return
    }

    billingContractApi.listForHealthPlan(
      userCredentialsHelper.get(),
      health_plan_id,
      params,
      nextOperation,
      this.onError
    )
  }
}

export { SelectBillingContractViewModel }
