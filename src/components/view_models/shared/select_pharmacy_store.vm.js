import { AbstractSelectAutocompleteViewModel } from "./"
import { pharmacyStoreApi } from "../../../api"
import { pharmacyStoreHelper, userCredentialsHelper, pathHelper, valueHelper } from "../../../helpers"

class SelectPharmacyStoreViewModel extends AbstractSelectAutocompleteViewModel {
  constructor(props) {
    super(props)

    this.determineSelectStyle = this.determineSelectStyle.bind(this)
    this.displayModel = this.displayModel.bind(this)
    this.doSearch = this.doSearch.bind(this)
    this.fetchModel = this.fetchModel.bind(this)
    this.loadData = this.loadData.bind(this)
    this.loadPharmacyStores = this.loadPharmacyStores.bind(this)
  }

  determineSelectStyle(pharmacyStores, pharmacyStoreHeaders) {
    if (pharmacyStoreHeaders.lastPage.total > pharmacyStoreHeaders.lastPage.size) {
      this.startSearch()
      return
    }

    this.addData({ models: pharmacyStores, useSearch: false })

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
    return pharmacyStoreHelper.store(model)
  }

  doSearch(searchText, baseFilters, sorting, onSuccess, onFailure) {
    const filters = {
      ...baseFilters,
      for_store: searchText
    }

    pharmacyStoreApi.search(userCredentialsHelper.get(), { ...filters, ...sorting }, onSuccess, onFailure)
  }

  fetchModel(id, onSuccess, onFailure) {
    pharmacyStoreApi.show(userCredentialsHelper.get(), id, onSuccess, onFailure)
  }

  loadData() {
    const user_id = pathHelper.id(this.pathEntries(), "users")

    this.clearData()
    this.loadPharmacyStores(user_id, this.determineSelectStyle)
  }

  loadPharmacyStores(user_id, nextOperation) {
    const params = { page: { number: 1, size: 25 }, sort: 'name' }
    if (!valueHelper.isValue(user_id)) {
      pharmacyStoreApi.list(
        userCredentialsHelper.get(),
        params,
        nextOperation,
        this.onError
      )
      return
    }

    pharmacyStoreApi.listForUser(
      userCredentialsHelper.get(),
      user_id,
      params,
      nextOperation,
      this.onError
    )
  }
}

export { SelectPharmacyStoreViewModel }
