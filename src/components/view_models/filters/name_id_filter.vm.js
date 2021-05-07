import { AbstractViewModel } from ".."
import { alertHelper, filtersHelper, userCredentialsHelper, valueHelper } from "../../../helpers"

class NameIdFilterViewModel extends AbstractViewModel {
  constructor(props) {
    super(props)

    this.clearSearch = this.clearSearch.bind(this)
    this.loadData = this.loadData.bind(this)
    this.select = this.select.bind(this)
    this.search = this.search.bind(this)
  }

  clearSearch() {
    this.addField("searchResults", [])
    this.redrawView()
  }

  static fetchModel(filterDescription, filters, onSuccess, onFailure) {
    const value = filtersHelper.filterToValue(filters, filterDescription.queryParam)
    if (!valueHelper.isValue(value)) {
      onSuccess()
      return
    }

    const { findMethod } = filterDescription
    findMethod(userCredentialsHelper.get(), value, onSuccess, onFailure)
  }

  loadData() {
    this.clearData()
    const { filterDescription, filters } = this.props
    NameIdFilterViewModel.toLabel(
      filterDescription,
      filters,
      (labelHash) => {
        if (!valueHelper.isValue(labelHash)) {
          this.redrawView()
          return
        }

        this.addField("searchText", labelHash.label, this.redrawView)
      },
      this.onError
    )
  }

  search(searchText, filters, sorting, onSuccess, onFailure) {
    const { filterDescription } = this.props
    const { otherFilters, searchMethod, searchParam } = filterDescription
    const makeDataAvailable = (searchResults) => {
      this.addData({ item: undefined, searchResults })
      this.redrawView()
      if (valueHelper.isFunction(onSuccess)) {
        onSuccess(searchResults)
      }
    }
    const onAnError = (error) => {
      if (valueHelper.isFunction(onFailure)) {
        onFailure(error)
        return
      }

      alertHelper.error(error)
    }

    const allFilters = { ...filters, ...otherFilters }
    searchMethod(
      userCredentialsHelper.get(),
      {
        [searchParam]: searchText,
        ...allFilters,
        ...sorting
      },
      makeDataAvailable,
      onAnError
    )
  }

  select(item) {
    const { filterDescription } = this.props
    const { name } = filterDescription

    this.addData({ item })
    this.props.onChange(
      {
        persist: () => { },
        preventDefault: () => { },
        target: { name, value: item.id }
      }
    )
  }

  static toLabel(filterDescription, filters, nextOperation) {
    const { labelMethod, name, queryParam } = filterDescription
    const onSuccess = (model) => {
      if (!valueHelper.isValue(model)) {
        nextOperation()
        return
      }

      nextOperation(
        {
          canDelete: filterDescription.canDelete ?? true,
          label: labelMethod(model),
          name,
          queryParam
        }
      )
    }
    const onError = (message) => {
      alertHelper.error(message)
      nextOperation()
    }

    NameIdFilterViewModel.fetchModel(filterDescription, filters, onSuccess, onError)
  }
}

export { NameIdFilterViewModel }
