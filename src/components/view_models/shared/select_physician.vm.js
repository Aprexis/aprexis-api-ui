import { AbstractSelectAutocompleteViewModel } from "./"
import { physicianApi } from "../../../api/admin"
import { userCredentialsHelper } from "../../../helpers"
import { physicianHelper } from "../../../helpers/admin"

class SelectPhysicianViewModel extends AbstractSelectAutocompleteViewModel {
  constructor(props) {
    super(props)

    this.api = this.api.bind(this)
    this.displayModel = this.displayModel.bind(this)
    this.doSearch = this.doSearch.bind(this)
    this.fetchModel = this.fetchModel.bind(this)
    this.helper = this.helper.bind(this)
    this.modelSearchText = this.modelSearchText.bind(this)
  }

  api() {
    return physicianApi
  }

  displayModel(model) {
    return this.helper().label(model)
  }

  doSearch(searchText, baseFilters, sorting, onSuccess, onFailure) {
    const filters = {
      ...baseFilters,
      for_physician: searchText
    }

    this.api().search(userCredentialsHelper.get(), { ...filters, ...sorting }, onSuccess, onFailure)
  }

  fetchModel(id, onSuccess, onFailure) {
    this.api().show(userCredentialsHelper.get(), id, onSuccess, onFailure)
  }

  helper() {
    return physicianHelper
  }

  modelSearchText(model) {
    return this.displayModel(model)
  }
}

export { SelectPhysicianViewModel }
