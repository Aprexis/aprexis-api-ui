import { Component } from 'react'
import { valueHelper } from '../../helpers'
import { AprexisTable, Spinner } from './'

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
    const { generateTableRow } = this.props
    if (!valueHelper.isValue(list) || !Array.isArray(list) || !valueHelper.isFunction(generateTableRow)) {
      return
    }

    return list.map((entry) => { return generateTableRow(entry) })
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

    return list.map((entry, entryIdx) => { return generateGroupRow(entry, entryIdx) }).filter((groupRow) => valueHelper.isValue(groupRow))
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
      <AprexisTable
        data={data}
        groups={groups}
        headings={headings}
        onMultipleRows={this.props.onMultipleRowsSelection}
        tableClassName={tableClassName}
        aprexisTableClassName={aprexisTableClassName}
      />
    )
  }
}

export { AprexisList }
