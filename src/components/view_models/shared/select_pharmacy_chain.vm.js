import { AbstractSelectAutocompleteViewModel } from "./"
import { pharmacyChainApi } from "../../../api"
import { pharmacyChainHelper, userCredentialsHelper, valueHelper } from "../../../helpers"

class SelectPharmacyChainViewModel extends AbstractSelectAutocompleteViewModel {
  constructor(props) {
    super(props)

    this.determineSelectStyle = this.determineSelectStyle.bind(this)
    this.displayModel = this.displayModel.bind(this)
    this.doSearch = this.doSearch.bind(this)
    this.fetchModel = this.fetchModel.bind(this)
    this.loadData = this.loadData.bind(this)
    this.loadPharmacyChains = this.loadPharmacyChains.bind(this)
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
    return pharmacyChainHelper.chain(model)
  }

  doSearch(searchText, baseFilters, sorting, onSuccess, onFailure) {
    const filters = {
      ...baseFilters,
      for_chain: searchText
    }

    pharmacyChainApi.search(userCredentialsHelper.get(), { ...filters, ...sorting }, onSuccess, onFailure)
  }

  fetchModel(id, onSuccess, onFailure) {
    pharmacyChainApi.show(userCredentialsHelper.get(), id, onSuccess, onFailure)
  }

  loadData() {
    this.clearData()
    this.loadPharmacyChains(this.determineSelectStyle)
  }

  loadPharmacyChains(nextOperation) {
    const params = { page: { number: 1, size: 25 }, sort: 'name' }
    pharmacyChainApi.list(
      userCredentialsHelper.get(),
      params,
      nextOperation,
      this.onError
    )
  }
}

export { SelectPharmacyChainViewModel }
