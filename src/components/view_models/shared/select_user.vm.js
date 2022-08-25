import { AbstractSelectAutocompleteViewModel } from "./"
import { userApi, userHelper } from "@aprexis/aprexis-api-utility"
import { apiEnvironmentHelper, userCredentialsHelper } from "../../../helpers"

class SelectUserViewModel extends AbstractSelectAutocompleteViewModel {
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
    return userApi
  }

  displayModel(model) {
    return this.helper().label(model)
  }

  doSearch(searchText, baseFilters, sorting, onSuccess, onFailure) {
    const filters = {
      ...baseFilters,
      for_user: searchText
    }

    this.api().search(apiEnvironmentHelper.apiEnvironment(userCredentialsHelper.get()), { ...filters, ...sorting }, onSuccess, onFailure)
  }

  fetchModel(id, onSuccess, onFailure) {
    this.api().show(apiEnvironmentHelper.apiEnvironment(userCredentialsHelper.get()), id, onSuccess, onFailure)
  }

  helper() {
    return userHelper
  }

  modelSearchText(model) {
    return this.displayModel(model)
  }
}

export { SelectUserViewModel }
