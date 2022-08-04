import { AbstractSelectAutocompleteViewModel } from "./"
import { labTestApi, labTestHelper } from "@aprexis/aprexis-api-utility"
import { apiEnvironmentHelper, userCredentialsHelper } from "../../../helpers"
class SelectLabTestViewModel extends AbstractSelectAutocompleteViewModel {
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

    this.api().search(apiEnvironmentHelper.apiEnvironment(userCredentialsHelper.get()), { ...filters, ...sorting }, onSuccess, onFailure)
  }

  fetchModel(id, onSuccess, onFailure) {
    this.api().show(apiEnvironmentHelper.apiEnvironment(userCredentialsHelper.get()), id, onSuccess, onFailure)
  }

  helper() {
    return labTestHelper
  }

  modelSearchText(model) {
    return this.helper().fullName(model)
  }
}

export { SelectLabTestViewModel }
