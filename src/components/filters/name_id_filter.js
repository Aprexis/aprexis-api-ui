import React, { Component } from "react"
import { Col, Row } from "reactstrap"
import { Autocomplete } from "../shared"
import { valueHelper } from "@aprexis/aprexis-api-utility"
import { NameIdFilterViewModel } from "../view_models/filters"

class NameIdFilter extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new NameIdFilterViewModel(
      {
        ...props,
        view: this
      }
    )

    this.retrieveItem = this.retrieveItem.bind(this)
    this.retrieveValue = this.retrieveValue.bind(this)
  }

  componentDidMount() {
    this.vm.loadData()
  }

  render() {
    const { filterDescription, readOnly } = this.props
    const { fields, name } = filterDescription
    const value = this.retrieveValue(filterDescription, fields)
    const { searchResults, searchText } = this.state

    return (
      <div>
        <Row>
          <Col>
            {name}: {value}
          </Col>
        </Row>

        <Autocomplete
          clearFunction={this.vm.clearSearch}
          disabled={filterDescription.disabled}
          filters={{}}
          inForm={false}
          inputName={name}
          inputPlaceholder={name.toLowerCase()}
          onOptionSelect={this.vm.select}
          options={searchResults}
          readOnly={readOnly}
          searchFunction={this.vm.search}
          searchMinLength={filterDescription.minLength ?? 3}
          searchText={value ?? searchText}
          sorting={filterDescription.sorting ?? "name"}
          tableDisplayProps={fields}
        />
      </div>
    )
  }

  retrieveItem(filterDescription) {
    const { item, searchResults } = this.state
    if (valueHelper.isValue(item)) {
      return item
    }

    if (valueHelper.isValue(searchResults)) {
      return
    }

    return filterDescription.item
  }

  retrieveValue(filterDescription, fields) {
    const item = this.retrieveItem(filterDescription)
    if (!valueHelper.isValue(item)) {
      return
    }

    return item[fields[0]]
  }

  shouldComponentUpdate(nextProps, nextState) {
    this.vm.props = { ...this.vm.props, ...nextProps }
    return true
  }

  static toLabel(filterDescription, filters, nextOperation) {
    NameIdFilterViewModel.toLabel(filterDescription, filters, nextOperation)
  }
}

export { NameIdFilter }
