import { AbstractSelectAutocompleteViewModel } from "./abstract_select_autocomplete.vm.js"
import { goldStandardAllergyApi, goldStandardAllergyHelper } from "@aprexis/aprexis-api-utility"
import { apiEnvironmentHelper } from "../../../helpers/index.js"

class SelectAllergyViewModel extends AbstractSelectAutocompleteViewModel {
  constructor(props) {
    super(props)

    this.api = this.api.bind(this)
    this.displayModel = this.displayModel.bind(this)
    this.doSearch = this.doSearch.bind(this)
    this.fetchModel = this.fetchModel.bind(this)
    this.helper = this.helper.bind(this)
    this.itemId = this.itemId.bind(this)
    this.modelSearchText = this.modelSearchText.bind(this)
  }

  api() {
    return goldStandardAllergyApi
  }

  displayModel(model) {
    return this.helper().label(model)
  }

  doSearch(searchText, baseFilters, sorting, onSuccess, onFailure) {
    const filters = {
      ...baseFilters,
      for_allergy: searchText
    }

    this.api().search(apiEnvironmentHelper.apiEnvironment(this.getUserCredentials(), this.props.reconnectAndRetry), { ...filters, ...sorting }, onSuccess, onFailure)
  }

  fetchModel(id, onSuccess, onFailure) {
    this.api().show(apiEnvironmentHelper.apiEnvironment(this.getUserCredentials(), this.props.reconnectAndRetry), id, onSuccess, onFailure)
  }

  helper() {
    return goldStandardAllergyHelper
  }

  itemId(item) {
    return goldStandardAllergyHelper.allergyId(item)
  }

  modelSearchText(model) {
    return this.displayModel(model)
  }
}

export { SelectAllergyViewModel }
