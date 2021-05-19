import { AbstractSelectAutocompleteViewModel } from "./"
import { physicianApi } from "../../../api"
import { physicianHelper, userCredentialsHelper } from "../../../helpers"

class SelectPhysicianViewModel extends AbstractSelectAutocompleteViewModel {
  constructor(props) {
    super(props)

    this.displayModel = this.displayModel.bind(this)
    this.doSearch = this.doSearch.bind(this)
    this.fetchModel = this.fetchModel.bind(this)
  }

  displayModel(model) {
    console.log(`Model: ${JSON.stringify(model)}`)
    return physicianHelper.name(model)
  }

  doSearch(searchText, baseFilters, sorting, onSuccess, onFailure) {
    const filters = {
      ...baseFilters,
      for_physician: searchText
    }

    physicianApi.search(userCredentialsHelper.get(), { ...filters, ...sorting }, onSuccess, onFailure)
  }

  fetchModel(id, onSuccess, onFailure) {
    physicianApi.show(userCredentialsHelper.get(), id, onSuccess, onFailure)
  }
}

export { SelectPhysicianViewModel }
