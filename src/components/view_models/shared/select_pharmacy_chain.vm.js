import { AbstractSelectAutocompleteViewModel } from "./abstract_select_autocomplete.vm.js"
import { pharmacyChainApi, pharmacyChainHelper, valueHelper } from "@aprexis/aprexis-api-utility"
import { apiEnvironmentHelper } from "../../../helpers/index.js"

class SelectPharmacyChainViewModel extends AbstractSelectAutocompleteViewModel {
  constructor(props) {
    super(props)

    this.api = this.api.bind(this)
    this.determineSelectStyle = this.determineSelectStyle.bind(this)
    this.displayModel = this.displayModel.bind(this)
    this.doSearch = this.doSearch.bind(this)
    this.fetchModel = this.fetchModel.bind(this)
    this.helper = this.helper.bind(this)
    this.loadData = this.loadData.bind(this)
    this.loadPharmacyChains = this.loadPharmacyChains.bind(this)
    this.modelSearchText = this.modelSearchText.bind(this)
  }

  api() {
    return pharmacyChainApi
  }

  determineSelectStyle(pharmacyChains, pharmacyChainHeaders) {
    if (pharmacyChainHeaders.lastPage.total > 0 /*pharmacyChainHeaders.lastPage.size*/) {
      this.startSearch()
      return
    }

    this.addData({ models: pharmacyChains, useSearch: false })

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
    return this.helper().chain(model)
  }

  doSearch(searchText, baseFilters, sorting, onSuccess, onFailure) {
    const filters = {
      ...baseFilters,
      for_chain: searchText
    }

    this.api().search(apiEnvironmentHelper.apiEnvironment(this.getUserCredentials(), this.props.reconnectAndRetry), { ...filters, ...sorting }, onSuccess, onFailure)
  }

  fetchModel(id, onSuccess, onFailure) {
    this.api().show(apiEnvironmentHelper.apiEnvironment(this.getUserCredentials(), this.props.reconnectAndRetry), id, onSuccess, onFailure)
  }

  helper() {
    return pharmacyChainHelper
  }

  loadData() {
    this.clearData()
    this.loadPharmacyChains(this.determineSelectStyle)
  }

  loadPharmacyChains(nextOperation) {
    const params = { page: { number: 1, size: 25 }, sort: 'name' }
    pharmacyChainApi.list(
      apiEnvironmentHelper.apiEnvironment(this.getUserCredentials(), this.props.reconnectAndRetry),
      params,
      nextOperation,
      this.onError
    )
  }

  modelSearchText(model) {
    return this.displayModel(model)
  }
}

export { SelectPharmacyChainViewModel }
