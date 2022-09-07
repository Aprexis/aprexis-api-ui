import React, { Component } from "react"
import { SearchForItem } from "./search_for_item"
import { SelectCaregiverViewModel } from "../view_models/shared"

class SelectCaregiver extends Component {
  constructor(props) {
    super(props)

    this.vm = new SelectCaregiverViewModel(
      {
        ...props,
        view: this
      }
    )
    this.state = {}
  }

  componentDidMount() {
    this.lastId = this.props.id
    this.vm.loadData()
  }

  componentDidUpdate() {
    this.vm.updateSearchFromId()
  }

  render() {
    const { readOnly, required } = this.props
    const { enableSearch, item, searchText, searchResults } = this.state

    return (
      <SearchForItem
        baseFilters={this.props.baseFilters}
        enableSearch={enableSearch}
        fieldLabel={this.props.fieldLabel}
        helper={this.vm.helper}
        inForm={this.props.inForm}
        item={item}
        minLength={this.props.minLength}
        readOnly={readOnly}
        required={required}
        searchText={searchText}
        searchResults={searchResults}
        sorting={{ sort: "relationship,first_name,last_name" }}
        tableDisplayProps={["relationship", "first_name", "last_name"]}
        vm={this.vm}
      />
    )
  }

  shouldComponentUpdate(nextProps, _nextState) {
    this.vm.props = { ...this.vm.props, ...nextProps }
    return true
  }
}

export { SelectCaregiver }
