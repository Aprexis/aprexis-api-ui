import { AbstractSelectAutocompleteViewModel } from "./"
import { goldStandardAllergyApi } from "../../../api/gold_standard"
import { userCredentialsHelper } from "../../../helpers"
import { goldStandardAllergyHelper } from "../../../helpers/gold_standard"

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

    this.api().search(userCredentialsHelper.get(), { ...filters, ...sorting }, onSuccess, onFailure)
  }

  fetchModel(id, onSuccess, onFailure) {
    this.api().show(userCredentialsHelper.get(), id, onSuccess, onFailure)
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
