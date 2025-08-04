import { Component } from "react"
import { SearchForItem } from "./search_for_item.js"
import { SelectUserViewModel } from "../view_models/shared/index.js"

class SelectUser extends Component {
  constructor(props) {
    super(props)

    this.vm = new SelectUserViewModel(
      {
        ...props,
        view: this
      }
    )
    this.state = {}
  }

  componentDidMount() {
    this.vm.loadData()
  }

  componentDidUpdate() {
    this.vm.updateSearchFromId()
  }

  render() {
    const { baseFilters, fieldLabel, minLength, readOnly, required } = this.props
    const { enableSearch, item, searchText, searchResults } = this.state

    return (
      <SearchForItem
        baseFilters={baseFilters}
        enableSearch={enableSearch}
        fieldLabel={fieldLabel}
        helper={this.vm.helper}
        inForm={this.props.inForm}
        item={item}
        minLength={minLength}
        readOnly={readOnly}
        required={required}
        searchText={searchText}
        searchResults={searchResults}
        sorting={{ sort: "last_name,first_name,email" }}
        tableDisplayProps={this.vm.getTableDisplayProps()}
        vm={this.vm}
      />
    )
  }

  shouldComponentUpdate(nextProps, _nextState) {
    this.vm.props = { ...this.vm.props, ...nextProps }
    return true
  }
}

export { SelectUser }
