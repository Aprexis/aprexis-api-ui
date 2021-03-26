import React, { Component } from 'react'
import { filtersHelper, valueHelper } from '../../helpers'

class Filter extends Component {
  render() {
    const { filterDescription } = this.props
    const FilterClass = filtersHelper.filterToClass(filterDescription)
    if (!valueHelper.isValue(FilterClass)) {
      return (
        <span>Filter not recognized: ${JSON.stringify(filterDescription, valueHelper.getCircularReplacer(), 2)}</span>
      )
    }

    const onChange = filtersHelper.filterToOnChange(filterDescription)
    return (
      <FilterClass
        filterDescription={filterDescription}
        filters={this.props.filters}
        onChange={this.props[onChange]}
        readOnly={this.props.readOnly}
      />
    )
  }
}

export { Filter }
