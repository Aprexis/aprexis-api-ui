import { Component } from "react"
import { SearchForItem } from "./search_for_item.js"
import { SelectItemFromList } from "./select_item_from_list.js"
import { SelectPharmacyChainViewModel } from "../view_models/shared/index.js"
import { pharmacyChainHelper, valueHelper } from "@aprexis/aprexis-api-utility"

class SelectPharmacyChain extends Component {
  constructor(props) {
    super(props)

    this.vm = new SelectPharmacyChainViewModel(
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
          sorting={{ sort: "name,state,city" }}
          tableDisplayProps={["chain"]}
          vm={this.vm}
        />
      )
    }

    return (
      <SelectItemFromList
        fieldLabel={fieldLabel}
        helper={pharmacyChainHelper}
        item={item}
        models={models}
        modelType='pharmacy-chain'
        readOnly={readOnly}
        required={required}
        targetName={this.props.targetName}
        vm={this.vm}
      />
    )
  }

  shouldComponentUpdate(nextProps, nextState) {
    this.vm.props = { ...this.vm.props, ...nextProps }
    return true
  }
}

export { SelectPharmacyChain }
