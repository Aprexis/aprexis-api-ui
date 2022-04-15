import { AbstractSelectAutocompleteViewModel } from "./"
import { physicianApi } from "../../../api/admin"
import { userCredentialsHelper } from "../../../helpers"
import { physicianHelper } from "../../../helpers/admin"

class SelectPhysicianViewModel extends AbstractSelectAutocompleteViewModel {
  constructor(props) {
    super(props)

    this.displayModel = this.displayModel.bind(this)
    this.doSearch = this.doSearch.bind(this)
    this.fetchModel = this.fetchModel.bind(this)
  }

  displayModel(model) {
    return physicianHelper.name(model)
  }

  doSearch(searchText, baseFilters, sorting, onSuccess, onFailure) {
    const filters = {
      ...baseFilters,
      for_physician: searchText
    }

    physicianApi.search(userCredentialsHelper.get(), { ...filters, ...sorting }, onSuccess, onFailure)
  }

  fetchModel(id, onSuccess, onFailure) {
    physicianApi.show(userCredentialsHelper.get(), id, onSuccess, onFailure)
  }
}

export { SelectPhysicianViewModel }
