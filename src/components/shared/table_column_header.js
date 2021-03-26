import React, { Component } from 'react'
import { faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { valueHelper } from '../../helpers'

class TableColumnHeader extends Component {
  constructor(props) {
    super(props)

    this.getSortField = this.getSortField.bind(this)
    this.isAscending = this.isAscending.bind(this)
    this.isSortingColumn = this.isSortingColumn.bind(this)
  }

  getSortField() {
    const { sortFieldName } = this.props
    if (!this.isSortingColumn() || this.isAscending()) {
      return sortFieldName
    }

    return `${sortFieldName}-`
  }

  isAscending() {
    if (!valueHelper.isValue(this.props.sorting)) {
      return false
    }

    const { sort } = this.props.sorting
    return valueHelper.isStringValue(sort) && sort.endsWith('-')
  }

  isSortingColumn() {
    const { sortFieldName } = this.props
    if (!valueHelper.isValue(this.props.sorting) || !valueHelper.isValue(sortFieldName) || !valueHelper.isFunction(this.props.onUpdateSorting)) {
      return false
    }

    const { sort } = this.props.sorting
    if (!valueHelper.isValue(sort)) {
      return false
    }

    const comparisonFieldName = sort.endsWith('-') ? sort.slice(0, -1) : sort
    return comparisonFieldName == sortFieldName
  }

  render() {
    const { className, label } = this.props
    let color = 'white'
    let icon = faSortDown
    if (this.isSortingColumn()) {
      color = 'black'
      icon = this.isAscending() ? faSortUp : faSortDown
    }

    let updateSorting
    if (valueHelper.isFunction(this.props.onUpdateSorting)) {
      updateSorting = (event) => {
        this.props.onUpdateSorting(this.getSortField(), this.props.onRefresh)
      }
    }

    return (
      <th
        className={className}
        onClick={updateSorting}
        scope="col"
        style={{ cursor: "pointer" }}>
        <div className="d-flex flex-row">
          <label>
            {label}&nbsp;
            {
              this.isSortingColumn() &&
              <FontAwesomeIcon icon={icon} style={{ color, marginLeft: '.5rem' }} />
            }
          </label>
        </div>
      </th>
    )
  }
}

export { TableColumnHeader }
