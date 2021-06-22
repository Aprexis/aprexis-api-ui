import { AbstractSelectAutocompleteViewModel } from "./"
import { goldStandardAllergyApi } from "../../../api/gold_standard"
import { userCredentialsHelper } from "../../../helpers"
import { goldStandardAllergyHelper } from "../../../helpers/gold_standard"

class SelectAllergyViewModel extends AbstractSelectAutocompleteViewModel {
  constructor(props) {
    super(props)

    this.displayModel = this.displayModel.bind(this)
    this.doSearch = this.doSearch.bind(this)
    this.fetchModel = this.fetchModel.bind(this)
    this.itemId = this.itemId.bind(this)
  }

  displayModel(model) {
    return goldStandardAllergyHelper.label(model)
  }

  doSearch(searchText, baseFilters, sorting, onSuccess, onFailure) {
    const filters = {
      ...baseFilters,
      for_allergy: searchText
    }

    goldStandardAllergyApi.search(userCredentialsHelper.get(), { ...filters, ...sorting }, onSuccess, onFailure)
  }

  fetchModel(id, onSuccess, onFailure) {
    goldStandardAllergyApi.show(userCredentialsHelper.get(), id, onSuccess, onFailure)
  }

  itemId(item) {
    return goldStandardAllergyHelper.allergyId(item)
  }
}

export { SelectAllergyViewModel }
