import React, { Component } from "react"
import { SearchForItem } from "./search_for_item"
import { SelectUserViewModel } from "../view_models/shared"
import { valueHelper } from '@aprexis/aprexis-api-utility'

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
    const { readOnly, required } = this.props
    const { enableSearch, item, searchText, searchResults, tableDisplayProps } = this.state
    const myTableDisplayProps = valueHelper.isValue(tableDisplayProps) ? tableDisplayProps : ["first_name", "last_name"]

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
        sorting={{ sort: "last_name,first_name,email" }}
        tableDisplayProps={myTableDisplayProps}
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
