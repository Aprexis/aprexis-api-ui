import React, { Component } from 'react'
import { Button, Col, Row } from 'reactstrap'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FiltersItemViewModel } from '../view_models/filters'
import { filtersHelper, valueHelper } from '../../helpers'

class FiltersItem extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new FiltersItemViewModel({ view: this })

    this.addColumnToTableStructure = this.addColumnToTableStructure.bind(this)
    this.addFilterLabelsToTableStructure = this.addFilterLabelsToTableStructure.bind(this)
    this.buildFilterLabels = this.buildFilterLabels.bind(this)
    this.buildFiltersTable = this.buildFiltersTable.bind(this)
    this.buildMultipleFilterEntry = this.buildMultipleFilterEntry.bind(this)
    this.buildRemoveFilter = this.buildRemoveFilter.bind(this)
    this.buildSingleFilterEntry = this.buildSingleFilterEntry.bind(this)
    this.getRowsFromTableStructure = this.getRowsFromTableStructure.bind(this)
  }

  addColumnToTableStructure(col, colLength, tableStructure) {
    const { rows } = tableStructure
    let { cols, numberOfColumns } = tableStructure
    const colSpan = Math.ceil(colLength / 32.0)

    if (numberOfColumns + colSpan > 6) {
      rows.push(<tr key={`filter-row-${rows.length + 1}`}>{cols}</tr>)
      cols = []
      numberOfColumns = 0
    }

    cols.push(
      <td key={`filter-column-${rows.length}-${cols.length + 1}`} colSpan={colSpan}>{col}</td>
    )

    return (rows, cols, numberOfColumns)
  }

  addFilterLabelsToTableStructure(filterLabels, onRemoveFilter, tableStructure) {
    const labelClassName = 'rounded-pill text-small py-1 px-2 mb-1 mt-n1'
    let myTableStructure = tableStructure

    filterLabels.forEach(
      (filterLabel) => {
        if (Array.isArray(filterLabel)) {
          myTableStructure = this.buildMultipleFilterEntry(filterLabel, labelClassName, onRemoveFilter, tableStructure)
        } else {
          myTableStructure = this.buildSingleFilterEntry(filterLabel, labelClassName, onRemoveFilter, tableStructure)
        }
      }
    )

    return myTableStructure
  }

  buildFilterLabels(filterDescriptions, filters) {
    return filterDescriptions.map((filterDescription) => { return filtersHelper.filterToLabel(filterDescription, filters) })
      .filter((filterLabel) => valueHelper.isValue(filterLabel))
  }

  buildFiltersTable(filterDescriptions, filters, onRemoveFilter) {
    if (!valueHelper.isValue(filterDescriptions)) {
      return buildEmptyTable()
    }

    const filterLabels = this.buildFilterLabels(filterDescriptions, filters)
    if (filterLabels.length === 0) {
      return buildEmptyTable()
    }

    const tableStructure = this.addFilterLabelsToTableStructure(
      filterLabels,
      onRemoveFilter,
      { rows: [], cols: [], numberOfColumns: 0 }
    )
    const rows = this.getRowsFromTableStructure(tableStructure)
    if (rows.length === 0) {
      return buildEmptyTable()
    }

    return (
      <table className='filters-table'>
        <tbody className='filters-table-body'>
          {rows}
        </tbody>
      </table>
    )

    function buildEmptyTable() {
      return (
        <small>
          <label>
            <strong>Not filtered</strong>
          </label>
        </small>
      )
    }
  }

  buildMultipleFilterEntry(mutlipleFilterLabels, labelClassName, onRemoveFilter, tableStructure) {
    const colParts = []
    let colLength = 0
    mutlipleFilterLabels.forEach(
      (filterLabel, filterLabelIdx) => {
        const { canDelete, label, queryParam } = filterLabel
        const { prefix, prefixLength } = buildPrefix(filterLabelIdx)

        colLength += prefixLength + label.length
        colParts.push(buildLabelPart(canDelete, onRemoveFilter, prefix, label, queryParam, filterLabelIdx))
        colLength += 4
      }
    )

    const col = (<label className={labelClassName}>{colParts}</label>)
    return this.addColumnToTableStructure(col, colLength, tableStructure)

    function buildPrefix(filterLabelIdx) {
      if (filterLabelIdx === 0) {
        return { prefix: '', prefixLength: 0 }
      }

      return { prefix: (<React.Fragment>&nbsp;</React.Fragment>), prefixLength: 1 }
    }

    function buildLabelPart(canDelete, onRemoveFilter, prefix, label, queryParam, fiterLabelIdx) {
      const key = `multiple-field-label-${queryParam}-${fiterLabelIdx}`

      if (!valueHelper.isSet(canDelete) || !valueHelper.isFunction(onRemoveFilter)) {
        return (<React.Fragment key={key}>{prefix}{label}</React.Fragment>)
      }

      return (
        <label
          className='mt-0 pt-0 mb-0 pb-0'
          key={key}
          onClick={(event) => onRemoveFilter(queryParam)}>
          {prefix}{label} <FontAwesomeIcon icon={faTimesCircle} style={{ verticalAlign: 'middle' }} />
        </label>
      )
    }
  }

  buildRemoveFilter() {
    if (!valueHelper.isFunction(this.props.onUpdateFilters)) {
      return
    }

    return (queryParam) => {
      if (valueHelper.isValue(queryParam)) {
        const filters = { ...this.state.filters }
        delete filters[queryParam]
        this.props.onUpdateFilters(filters)
        this.props.onRefresh()
      }
    }
  }

  buildSingleFilterEntry(filterLabel, labelClassName, onRemoveFilter, tableStructure) {
    const { canDelete, label, name, queryParam } = filterLabel
    const displayLabel = valueHelper.isValue(name) ? `${name} = ${label}` : `${label}`
    const { col, colLength } = buildLabel(canDelete, onRemoveFilter, queryParam, labelClassName, displayLabel)

    return this.addColumnToTableStructure(col, colLength, tableStructure)

    function buildLabel(canDelete, onRemoveFilter, queryParam, labelClassName, displayLabel) {
      const key = `filter-label-${queryParam}`

      if (!valueHelper.isSet(canDelete) || !valueHelper.isFunction(onRemoveFilter)) {
        return {
          colLength: displayLabel.length,
          col: (<label key={key} className={labelClassName}>{displayLabel}</label>)
        }
      }

      return {
        colLength: displayLabel.length + 8,
        col: (
          <label
            className={labelClassName}
            key={key}
            onClick={(event) => onRemoveFilter(queryParam)}>
            {displayLabel} <FontAwesomeIcon icon={faTimesCircle} style={{ verticalAlign: 'middle' }} />
          </label>
        )
      }
    }
  }

  componentDidMount() {
    const { filterDescriptions, filters } = this.props
    this.vm.loadData({ filterDescriptions, filters })
  }

  static getDerivedStateFromProps(props, state) {
    const { filterDescriptions, filters } = props

    return { filterDescriptions, filters }
  }

  getRowsFromTableStructure(tableStructure) {
    const { rows, cols } = tableStructure
    if (cols.length > 0) {
      rows.push(<tr key={`filter-row-${rows.length + 1}`}>{cols}</tr>)
    }

    return rows
  }

  render() {
    const { filterDescriptions, filters } = this.state
    const onRemoveFilter = this.buildRemoveFilter()
    const filtersTable = this.buildFiltersTable(filterDescriptions, filters, onRemoveFilter)

    return (
      <React.Fragment>
        <Row>
          <Col sm="auto" className="pt-0">
            <Button
              className="btn btn-xs btn-secondary"
              onClick={(event) => { this.props.onSelectFilters(filterDescriptions, filters) }}>
              Filters
            </Button>
          </Col>
        </Row>

        <Row>
          <Col sm="auto" className="pt-1">
            {filtersTable}
          </Col>
        </Row>
      </React.Fragment>
    )
  }
}

export { FiltersItem }
