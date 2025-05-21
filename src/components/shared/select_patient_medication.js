import React, { Component } from "react"
import { SearchForItem } from "./search_for_item"
import { SelectPatientMedicationViewModel } from "../view_models/shared"

class SelectPatientMedication extends Component {
  constructor(props) {
    super(props)

    this.vm = new SelectPatientMedicationViewModel(
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
        sorting={{ sort: "medication.label" }}
        tableDisplayProps={["label"]}
        vm={this.vm}
      />
    )
  }

  shouldComponentUpdate(nextProps, _nextState) {
    this.vm.props = { ...this.vm.props, ...nextProps }
    return true
  }
}

export { SelectPatientMedication }
