import React, { Component } from "react"
import { pharmacyStoreHelper, valueHelper } from "../../helpers"
import { SearchForItem } from "./search_for_item"
import { SelectItemFromList } from "./select_item_from_list"
import { SelectPharmacyStoreViewModel } from "../view_models/shared"

class SelectPharmacyStore extends Component {
  constructor(props) {
    super(props)

    this.vm = new SelectPharmacyStoreViewModel(
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
    const { fieldLabel, readOnly, required } = this.props
    const { enableSearch, item, models, searchText, searchResults } = this.state

    if (valueHelper.isSet(this.props.useSearch)) {
      return (
        <SearchForItem
          baseFilters={this.props.baseFilters}
          enableSearch={enableSearch}
          fieldLabel={fieldLabel}
          helper={this.vm.helper}
          inForm={this.props.inForm}
          item={item}
          minLength={this.props.minLength}
          readOnly={readOnly}
          required={required}
          searchText={searchText}
          searchResults={searchResults}
          sorting={{ sort: "name,store_number" }}
          tableDisplayProps={["store"]}
          vm={this.vm}
        />
      )
    }

    return (
      <SelectItemFromList
        fieldLabel={fieldLabel}
        helper={pharmacyStoreHelper}
        item={item}
        models={models}
        modelType='pharmacy-store'
        readOnly={readOnly}
        required={required}
        targetName={this.props.targetName}
        vm={this.vm}
      />
    )
  }

  shouldComponentUpdate(nextProps, _nextState) {
    this.vm.props = { ...this.vm.props, ...nextProps }
    return true
  }
}

export { SelectPharmacyStore }
