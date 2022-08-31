import React, { Component } from "react"
import { SearchForItem } from "./search_for_item"
import { SelectDiagnosisCodeViewModel } from "../view_models/shared"

class SelectDiagnosisCode extends Component {
  constructor(props) {
    super(props)

    this.vm = new SelectDiagnosisCodeViewModel(
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
        sorting={{ sort: "short_description" }}
        tableDisplayProps={["short_description", "code"]}
        vm={this.vm}
      />
    )
  }

  shouldComponentUpdate(nextProps, _nextState) {
    this.vm.props = { ...this.vm.props, ...nextProps }
    return true
  }
}

export { SelectDiagnosisCode }
