import { AbstractSelectAutocompleteViewModel } from "./"
import { medicationApi } from "../../../api"
import { medicationHelper, userCredentialsHelper } from "../../../helpers"

class SelectMedicationViewModel extends AbstractSelectAutocompleteViewModel {
  constructor(props) {
    super(props)

    this.displayModel = this.displayModel.bind(this)
    this.doSearch = this.doSearch.bind(this)
    this.fetchModel = this.fetchModel.bind(this)
  }

  displayModel(model) {
    return medicationHelper.label(model)
  }

  doSearch(searchText, baseFilters, sorting, onSuccess, onFailure) {
    const filters = {
      ...baseFilters,
      for_medication: searchText
    }

    medicationApi.search(userCredentialsHelper.get(), { ...filters, ...sorting }, onSuccess, onFailure)
  }

  fetchModel(id, onSuccess, onFailure) {
    medicationApi.show(userCredentialsHelper.get(), id, onSuccess, onFailure)
  }
}

export { SelectMedicationViewModel }
