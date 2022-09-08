import { valueHelper } from "@aprexis/aprexis-api-utility"
import { jsEventHelper } from "../../../helpers"
import { AbstractViewModel } from "../abstract.vm"

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
    this.selectEvent = this.selectEvent.bind(this)
    this.search = this.search.bind(this)
    this.startSearch = this.startSearch.bind(this)
    this.toggleSearch = this.toggleSearch.bind(this)
    this.updateSearchFromId = this.updateSearchFromId.bind(this)
  }

  clearSearch() {
    this.addField("searchResults", [], this.redrawView)
  }

  loadData() {
    this.clearData()
    this.startSearch()
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
    let itemId
    if (valueHelper.isFunction(this.itemId)) {
      itemId = this.itemId(item)
    } else {
      itemId = item.id
    }

    this.addData({ enableSearch: false, item })
    this.props.onChange(
      {
        persist: () => { },
        preventDefault: () => { },
        target: { name: targetName, value: itemId }
      }
    )
  }

  selectEvent(event) {
    const { value } = jsEventHelper.fromInputEvent(event)
    const { models } = this.data
    const item = models.find((model) => model.id == value)

    this.addData({ enableSearch: false, item })
    this.props.onChange(event)
  }

  startSearch() {
    const { id } = this.props
    const setSearchText = (searchText, useSearch) => {
      const enableSearch = !valueHelper.isValue(searchText)
      this.addData({ enableSearch, searchText, useSearch, wasId: id }, this.redrawView)
    }
    if (!valueHelper.isValue(id)) {
      setSearchText()
      return
    }

    const { useSearch } = this.data
    const newUseSearch = valueHelper.isValue(useSearch) ? useSearch : true
    this.fetchModel(
      id,
      (item) => {
        this.addData(
          { item, searchResults: [item] },
          () => {
            const searchText = this.modelSearchText(item)
            setSearchText(searchText, newUseSearch)
          }
        )
      },
      this.onError
    )
  }

  toggleSearch() {
    const { enableSearch } = this.data
    this.addField("enableSearch", !valueHelper.isSet(enableSearch), this.redrawView)
  }

  updateSearchFromId() {
    const { id } = this.props
    const { wasId } = this.data

    if (valueHelper.isValue(id) && !valueHelper.isValue(wasId)) {
      this.startSearch()
    }
  }
}

export { AbstractSelectAutocompleteViewModel }
