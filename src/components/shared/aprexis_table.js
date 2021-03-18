import React, { Component } from 'react'
import { AprexisTableCell } from './'
import { valueHelper } from '../../helpers'

class DataRow extends Component {
  render() {
    const { dataRow, rowIndex } = this.props
    if (!valueHelper.isValue(dataRow)) {
      return
    }

    let cells
    let onClick
    if (Array.isArray(dataRow)) {
      cells = dataRow
    } else {
      cells = dataRow.cells
      onClick = dataRow.click
    }

    const renderedCells = cells.map(
      (cell, cellIndex) => { return (<AprexisTableCell cell={cell} key={`aprexis-table-row-${rowIndex}-${cellIndex}`} />) }
    )

    return (
      <tr className="aprexis-table-row" key={`aprexis-table-row-${rowIndex}`} onClick={onClick}>
        {renderedCells}
      </tr>
    )
  }
}

class DataRows extends Component {
  render() {
    const { data, groups } = this.props
    const tableRows = []
    let groupIndex = 0

    for (let rowIndex = 0; rowIndex < data.length; ++rowIndex) {
      const dataRow = data[rowIndex]

      if (valueHelper.isValue(groups) && groupIndex < groups.length && groups[groupIndex].rowIndex === rowIndex) {
        tableRows.push(<Group group={groups[groupIndex]} groupIndex={groupIndex} />)
        ++groupIndex
      }

      tableRows.push(<DataRow dataRow={dataRow} rowIndex={rowIndex} />)
    }

    return (<React.Fragment>{tableRows}</React.Fragment>)
  }
}

class Group extends Component {
  render() {
    const { group, groupIndex } = this.props

    return (
      <tr className="aprexis-table-group" key={`aprexis-table-group-${groupIndex}`}>
        <AprexisTableCell cell={group} colSpan={30} group={true} />
      </tr>
    )
  }
}


class Groups extends Component {
  render() {
    const { groups } = this.props
    const renderedGroups = groups.map((group, groupIndex) => { return (<Group group={group} groupIndex={groupIndex} />) })

    return (<React.Fragment>{renderedGroups}</React.Fragment>)
  }
}

class Data extends Component {
  render() {
    const { data, groups } = this.props

    if (valueHelper.isValue(data)) {
      return (
        <DataRows data={data} groups={groups} />
      )
    }
    if (valueHelper.isValue(groups)) {
      return (
        <Groups groups={groups} />
      )
    }

    return (<React.Fragment />)
  }
}

class Header extends Component {
  render() {
    const { headings } = this.props
    const renderedHeadings = headings.map(
      (heading, headingIndex) => {
        return (
          <AprexisTableCell
            cell={heading}
            colSpan={1}
            header={true}
            key={`aprexis-header-row-${headingIndex}`}
          />
        )
      }
    )

    return (
      <tr className="aprexis-table-header">{renderedHeadings}</tr>
    )
  }
}

class Title extends Component {
  render() {
    const { title } = this.props
    if (!valueHelper.isStringValue(title)) {
      return (<React.Fragment />)
    }

    return (<caption>{title}</caption>)
  }
}

class AprexisTable extends Component {
  render() {
    const { data, groups, headings, tableClassName, title, aprexisTableClassName } = this.props

    return (
      <div className={`table-responsive-sm scrollable ${valueHelper.makeString(aprexisTableClassName)}`}>
        <table className={`table-sm table-striped table ${valueHelper.makeString(tableClassName)}`}>
          <Title title={title} />

          <thead className="aprexis-table-header">
            <Header headings={headings} />
          </thead>

          <tbody className="aprexis-table-body">
            <Data data={data} groups={groups} />
          </tbody>
        </table>
      </div>
    )
  }
}

export { AprexisTable }
