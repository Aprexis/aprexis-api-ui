import { AbstractSelectAutocompleteViewModel } from "./"
import { labTestApi } from "../../../api/admin"
import { userCredentialsHelper } from "../../../helpers"
import { labTestHelper } from "../../../helpers/admin"

class SelectLabTestViewModel extends AbstractSelectAutocompleteViewModel {
  constructor(props) {
    super(props)

    this.api = this.api.bind(this)
    this.displayModel = this.displayModel.bind(this)
    this.doSearch = this.doSearch.bind(this)
    this.fetchModel = this.fetchModel.bind(this)
    this.helper = this.helper.bind(this)
  }

  api() {
    return labTestApi
  }

  displayModel(model) {
    return this.helper().label(model)
  }

  doSearch(searchText, baseFilters, sorting, onSuccess, onFailure) {
    const filters = {
      ...baseFilters,
      for_lab_test: searchText
    }

    this.api().search(userCredentialsHelper.get(), { ...filters, ...sorting }, onSuccess, onFailure)
  }

  fetchModel(id, onSuccess, onFailure) {
    this.api().show(userCredentialsHelper.get(), id, onSuccess, onFailure)
  }

  helper() {
    return labTestHelper
  }
}

export { SelectLabTestViewModel }
