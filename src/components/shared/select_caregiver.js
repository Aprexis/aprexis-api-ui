import React, { Component } from "react"
import { Col, FormGroup } from 'reactstrap'
import { valueHelper } from '@aprexis/aprexis-api-utility'
import { SearchForItem } from "./search_for_item"
import { ShowRequired } from "./show_required"
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

    this.renderSearch = this.renderSearch.bind(this)
    this.renderSelect = this.renderSelect.bind(this)
  }

  componentDidMount() {
    this.lastId = this.props.id
    this.vm.loadData()
  }

  componentDidUpdate() {
    this.vm.updateSearchFromId()
  }

  render() {
    const { fieldLabel, readOnly, required } = this.props
    const { item, useSearch } = this.state

    if (valueHelper.isSet(useSearch)) {
      return this.renderSearch(fieldLabel, item, readOnly, required)
    }

    return this.renderSelect(fieldLabel, item, readOnly, required)
  }

  renderSearch(fieldLabel, item, readOnly, required) {
    const { enableSearch, searchText, searchResults } = this.state

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
        sorting={{ sort: "relationship,first_name,last_name" }}
        tableDisplayProps={["relationship", "first_name", "last_name"]}
        vm={this.vm}
      />
    )
  }

  renderSelect(fieldLabel, item, readOnly, required) {
    if (valueHelper.isSet(readOnly)) {
      return renderItem(fieldLabel, item, required, this.vm)
    }

    const { models } = this.state
    return renderSelection(fieldLabel, item, required, this.vm, models)

    function renderItem(fieldLabel, item, required, vm) {
      const label = valueHelper.isValue(item) ? vm.displayModel(item) : ""

      return (
        <FormGroup row style={{ width: "100%" }}>
          <Col xs={2}><label>{fieldLabel}<ShowRequired required={required} /></label></Col>
          <Col xs={9}>
            <label>{label}</label>
          </Col>
        </FormGroup>
      )
    }

    function renderSelection(fieldLabel, item, required, vm, caregivers) {
      let caregiverOptions = []
      if (valueHelper.isValue(caregivers)) {
        caregiverOptions = caregivers.map(
          (caregiver) => {
            const id = vm.helper().id(caregiver)

            return (<option key={`caregiver-option-${id}`} value={id}>{vm.displayModel(caregiver)}</option>)
          }
        )
      }

      return (
        <FormGroup row style={{ width: "100%" }}>
          <Col xs={2}><label>{fieldLabel}<ShowRequired required={required} /></label></Col>
          <Col xs={9}>
            <select value={vm.helper().id(item)} onChange={vm.selection}>
              <option value=''>No caregiver selected</option>
              {caregiverOptions}
            </select>
          </Col>
        </FormGroup>
      )
    }
  }

  shouldComponentUpdate(nextProps, _nextState) {
    this.vm.props = { ...this.vm.props, ...nextProps }
    return true
  }
}

export { SelectCaregiver }
