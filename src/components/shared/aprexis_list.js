import React, { Component } from 'react'
import { faFastBackward, faFastForward, faStepBackward, faStepForward } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AprexisTable, Spinner } from './'
import { pageHelper, valueHelper } from '../../helpers'

class Page extends Component {
  constructor(props) {
    super(props)

    this.back = this.back.bind(this)
    this.back10 = this.back10.bind(this)
    this.forward = this.forward.bind(this)
    this.forward10 = this.forward10.bind(this)
    this.numbers = this.numbers.bind(this)
  }

  back(number) {
    if (number === 1) {
      return
    }

    return (
      <button className="btn btn-sm btn-primary" onClick={() => { this.props.onChangePage(number - 1) }}>
        <FontAwesomeIcon icon={faStepBackward} />
      </button>
    )
  }

  back10(number) {
    if (number <= 10) {
      return
    }

    let newNumber
    if (number % 10 === 0) {
      newNumber = number - 10
    } else {
      newNumber = number - (number % 10)
    }

    return (
      <button className="btn btn-sm btn-primary" onClick={() => { this.props.onChangePage(newNumber) }}>
        <FontAwesomeIcon icon={faFastBackward} />
      </button>
    )
  }

  forward(number, lastNumber) {
    if (number === lastNumber) {
      return
    }

    return (
      <button className="btn btn-sm btn-primary" onClick={() => { this.props.onChangePage(number + 1) }}>
        <FontAwesomeIcon icon={faStepForward} />
      </button>
    )
  }

  forward10(number, lastNumber) {
    let newNumber
    if (number % 10 === 0) {
      newNumber = number + 1
    } else {
      newNumber = number - (number % 10) + 11
    }

    if (newNumber > lastNumber) {
      return
    }

    return (
      <button className="btn btn-sm btn-primary" onClick={() => { this.props.onChangePage(newNumber) }}>
        <FontAwesomeIcon icon={faFastForward} />
      </button>
    )
  }

  numbers(number, lastNumber) {
    const { listPluralLabel } = this.props

    let firstPage
    if (number % 10 === 0) {
      firstPage = number - 9
    } else {
      firstPage = 1 + (number - number % 10)
    }

    const lastPage = Math.min(firstPage + 9, lastNumber)
    const buttons = []
    for (let pageNumber = firstPage; pageNumber <= lastPage; ++pageNumber) {
      buttons.push(
        <button
          className={`btn btn-sm ${number === pageNumber ? 'btn-outline-primary' : 'btn-primary'}`}
          disabled={pageNumber === number}
          key={`${listPluralLabel.toLowerCase()}-page-${pageNumber}`}
          onClick={() => { this.props.onChangePage(pageNumber) }}>
          {pageNumber}
        </button>
      )
    }

    return buttons
  }

  render() {
    const { page } = this.props

    if (!valueHelper.isValue(page)) {
      return (<React.Fragment />)
    }

    const number = parseInt(page.number)
    const lastNumber = pageHelper.lastNumber(page)

    return (
      <span>
        {this.back10(number)}
        {this.back(number)}
        {this.numbers(number, lastNumber)}
        {this.forward(number, lastNumber)}
        {this.forward10(number, lastNumber)}
      </span>
    )
  }
}
class AprexisList extends Component {
  constructor(props) {
    super(props)

    this.generateEmptyListGroup = this.generateEmptyListGroup.bind(this)
    this.generateNoDataGroup = this.generateNoDataGroup.bind(this)
    this.generateTableData = this.generateTableData.bind(this)
    this.generateTableGroups = this.generateTableGroups.bind(this)
    this.generateTableHeader = this.generateTableHeader.bind(this)
  }

  generateEmptyListGroup() {
    return { content: (<label>No results found</label>) }
  }

  generateNoDataGroup() {
    return { content: (<Spinner />) }
  }

  generateTableData(list) {
    const { generateTableRow, onSelectRow } = this.props
    if (!valueHelper.isValue(list) || !Array.isArray(list) || !valueHelper.isFunction(generateTableRow)) {
      return
    }

    return list.map(
      (entry) => {
        const cells = generateTableRow(entry, this.props.onSelectRow)
        if (!valueHelper.isFunction(onSelectRow)) {
          return cells
        }

        return { cells, click: (event) => { onSelectRow(event, entry) } }
      }
    )
  }

  generateTableGroups(list) {
    if (!valueHelper.isValue(list) || !Array.isArray(list)) {
      return [this.generateNoDataGroup()]
    }

    if (list.length === 0) {
      return [this.generateEmptyListGroup()]
    }

    const { generateGroupRow } = this.props
    if (!valueHelper.isValue(generateGroupRow)) {
      return
    }

    return list.map(
      (entry, entryIdx) => {
        return generateGroupRow(entry, entryIdx)
      }
    ).filter((groupRow) => valueHelper.isValue(groupRow))
  }

  generateTableHeader(list) {
    const { generateTableHeadings } = this.props
    if (!valueHelper.isFunction(generateTableHeadings)) {
      return
    }

    return generateTableHeadings(list)
  }

  render() {
    const { list } = this.props
    const headings = this.generateTableHeader(list)
    const groups = this.generateTableGroups(list)
    const data = this.generateTableData(list)
    const tableName = `table=${this.props.listPluralLabel.toLowerCase().replaceAll(" ", "-")}`
    let { tableClassName, aprexisTableClassName } = this.props
    if (!valueHelper.isValue(tableClassName)) {
      tableClassName = tableName
    }
    if (!valueHelper.isValue(aprexisTableClassName)) {
      aprexisTableClassName = `aprexis-${tableName}`
    }

    return (
      <div>
        <AprexisTable
          data={data}
          groups={groups}
          headings={headings}
          tableClassName={tableClassName}
          aprexisTableClassName={aprexisTableClassName}
        />

        <Page listPluralLabel={this.props.listPluralLabel} onChangePage={this.props.onChangePage} page={this.props.page} />
      </div>
    )
  }
}

export { AprexisList }
