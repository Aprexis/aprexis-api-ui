import { AbstractSelectAutocompleteViewModel } from "./"
import { medicationApi, medicationHelper } from "@aprexis/aprexis-api-utility"
import { apiEnvironmentHelper } from "../../../helpers"

class SelectMedicationViewModel extends AbstractSelectAutocompleteViewModel {
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
    return medicationApi
  }

  displayModel(model) {
    return this.helper().label(model)
  }

  doSearch(searchText, baseFilters, sorting, onSuccess, onFailure) {
    const filters = {
      ...baseFilters,
      for_medication: searchText
    }

    this.api().search(apiEnvironmentHelper.apiEnvironment(this.getUserCredentials(), this.props.reconnectAndRetry), { ...filters, ...sorting }, onSuccess, onFailure)
  }

  fetchModel(id, onSuccess, onFailure) {
    this.api().show(apiEnvironmentHelper.apiEnvironment(this.getUserCredentials(), this.props.reconnectAndRetry), id, onSuccess, onFailure)
  }

  helper() {
    return medicationHelper
  }

  modelSearchText(model) {
    return this.displayModel(model)
  }
}

export { SelectMedicationViewModel }
