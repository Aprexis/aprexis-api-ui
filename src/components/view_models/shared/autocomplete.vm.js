import { AbstractViewModel } from "../"
import { jsEventHelper } from "../../../helpers"

class AutocompleteViewModel extends AbstractViewModel {
  constructor(props) {
    super(props)

    this.loadData = this.loadData.bind(this)
    this.search = this.search.bind(this)
  }

  loadData() {
    this.clearData()
    this.addData({ loading: false, searchText: this.props.searchText ?? "", timeout: 0 })
    this.redrawView()
  }

  search(event) {
    const { clearFunction, filters, searchFunction, searchMinLength, sorting } = this.props
    const searchInput = event.target
    const searchText = jsEventHelper.fromInputEvent(event).value
    const onSuccess = (results) => {
      this.addField("loading", false)
      this.redrawView()
    }
    const onFailure = () => this.addField("loading", false)

    this.addData({ loading: searchText.length >= searchMinLength, searchText })

    const that = this
    if (this.data.timeout) {
      clearTimeout(this.data.timeout)
    }
    this.addData(
      {
        timeout: setTimeout(
          () => {
            if (searchText.length >= searchMinLength) {
              that.addData({ loading: true, searchInput })
              searchFunction(searchText, { ...filters, page: { size: 10 } }, sorting, onSuccess, onFailure)
              return
            }

            clearFunction()
          },
          500
        )
      }
    )
  }
}

export { AutocompleteViewModel }
