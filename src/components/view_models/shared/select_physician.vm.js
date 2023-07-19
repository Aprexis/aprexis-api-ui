import { AbstractSelectAutocompleteViewModel } from "./"
import { physicianApi, physicianHelper } from "@aprexis/aprexis-api-utility"
import { apiEnvironmentHelper } from "../../../helpers"

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

    this.api().search(apiEnvironmentHelper.apiEnvironment(this.getUserCredentials(), this.props.reconnectAndRetry), { ...filters, ...sorting }, onSuccess, onFailure)
  }

  fetchModel(id, onSuccess, onFailure) {
    this.api().show(apiEnvironmentHelper.apiEnvironment(this.getUserCredentials(), this.props.reconnectAndRetry), id, onSuccess, onFailure)
  }

  helper() {
    return physicianHelper
  }

  modelSearchText(model) {
    return this.displayModel(model)
  }
}

export { SelectPhysicianViewModel }
