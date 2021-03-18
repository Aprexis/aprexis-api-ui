import React, { Component } from 'react'
import { valueHelper } from '../../helpers'

class AprexisHeaderCell extends Component {
  render() {
    const { content, colSpan, onCellClick } = this.props

    return (
      <th className="aprexis-table-header-cell" colSpan={colSpan} onClick={onCellClick} scope="col">{content}</th>
    )
  }
}

class AprexisCell extends Component {
  render() {
    const { content, colSpan, onCellClick, group } = this.props
    const className = valueHelper.isSet(group) ? "aprexis-table-group-cell" : "aprexis-table-cell"

    return (
      <td className={className} colSpan={colSpan} onClick={onCellClick}>{content}</td>
    )
  }
}

class AprexisTableCell extends Component {
  constructor(props) {
    super(props)

    this.extractContent = this.extractContent.bind(this)
    this.renderCell = this.renderCell.bind(this)
    this.renderHeader = this.renderHeader.bind(this)
  }

  extractContent(cell) {
    let onClick
    let content = ''
    if (valueHelper.isValue(cell)) {
      if (typeof cell === 'string') {
        content = cell
      } else {
        onClick = cell.onClick
        content = cell.content
      }
    }

    return { onClick, content }
  }

  render() {
    const { cell, colSpan, group, header } = this.props
    if (React.isValidElement(cell)) {
      return cell
    }

    const { onClick, content } = this.extractContent(cell)
    let onCellClick
    if (valueHelper.isFunction(onClick)) {
      onCellClick = (event) => {
        event.persist()
        event.stopPropagation()
        onClick(event)
      }
    }

    if (valueHelper.isSet(header)) {
      return (<AprexisHeaderCell content={content} colSpan={colSpan} onCellClick={onCellClick} />)
    }

    return (<AprexisCell content={content} colSpan={colSpan} onCellClick={onCellClick} group={group} />)
  }
}

export { AprexisTableCell }
