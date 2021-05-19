import { AbstractSelectAutocompleteViewModel } from "./"
import { pharmacyStoreApi } from "../../../api"
import { pharmacyStoreHelper, userCredentialsHelper } from "../../../helpers"

class SelectPharmacyStoreViewModel extends AbstractSelectAutocompleteViewModel {
  constructor(props) {
    super(props)

    this.displayModel = this.displayModel.bind(this)
    this.doSearch = this.doSearch.bind(this)
    this.fetchModel = this.fetchModel.bind(this)
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
}

export { SelectPharmacyStoreViewModel }
