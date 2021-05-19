import { AbstractViewModel } from "../"
import { valueHelper } from "../../../helpers"

class AbstractSelectAutocompleteViewModel extends AbstractViewModel {
  constructor(props) {
    if (new.target === AbstractSelectAutocompleteViewModel) {
      throw new TypeError(
        "Cannot directly instantiate AbstractSelectAutocompleteViewModel instance; create a subclass instead"
      )
    }

    super(props)

    this.clearSearch = this.clearSearch.bind(this)
    this.loadData = this.loadData.bind(this)
    this.select = this.select.bind(this)
    this.search = this.search.bind(this)
    this.toggleSearch = this.toggleSearch.bind(this)
  }

  clearSearch() {
    this.addField("searchResults", [])
    this.redrawView()
  }

  loadData() {
    const { id } = this.props
    const setSearchText = (searchText) => {
      const enableSearch = !valueHelper.isValue(searchText)
      this.addData({ enableSearch, searchText }, this.redrawView)
    }

    this.clearData()
    if (!valueHelper.isValue(id)) {
      setSearchText()
      return
    }

    this.fetchModel(
      id,
      (model) => {
        this.addField(
          "item",
          model,
          () => {
            const searchText = this.displayModel(model)
            setSearchText(searchText)
          }
        )
      },
      this.onError
    )
  }

  search(searchText, baseFilters, sorting, onSuccess, onFailure) {
    const makeDataAvailable = (searchResults) => {
      this.addData({ item: undefined, searchResults })
      this.redrawView(
        () => {
          if (valueHelper.isFunction(onSuccess)) {
            onSuccess(searchResults)
          }
        }
      )
    }

    this.doSearch(searchText, baseFilters, sorting, makeDataAvailable, onFailure)
  }

  select(item) {
    const { targetName } = this.props

    this.addData({ enableSearch: false, item })
    this.props.onChange(
      {
        persist: () => { },
        preventDefault: () => { },
        target: { name: targetName, value: item.id }
      }
    )
  }

  toggleSearch() {
    const { enableSearch } = this.data
    this.addField("enableSearch", !valueHelper.isSet(enableSearch), this.redrawView)
  }
}

export { AbstractSelectAutocompleteViewModel }
