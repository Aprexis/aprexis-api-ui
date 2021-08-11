import React, { Component } from "react"
import { valueHelper } from "../../helpers"

class AprexisHeaderCell extends Component {
  render() {
    const { colSpan, content, onCellClick } = this.props
    let className = "aprexis-table-header-cell"
    if (valueHelper.isValue(onCellClick)) {
      className = `${className} aprexis-link`
    }

    return (
      <th className={className} colSpan={colSpan} onClick={onCellClick} scope="col">{content}</th>
    )
  }
}

class AprexisCell extends Component {
  render() {
    const { content, colSpan, onCellClick, group } = this.props
    let className
    if (valueHelper.isSet(group)) {
      className = "aprexis-table-group-cell"
    } else {
      className = "aprexis-table-cell"
    }
    if (valueHelper.isValue(onCellClick)) {
      className = `${className} aprexis-link`
    }

    return (
      <td className={className} colSpan={colSpan} onClick={onCellClick}>{content}</td>
    )
  }
}

class AprexisTableCell extends Component {
  constructor(props) {
    super(props)

    this.extractContent = this.extractContent.bind(this)
  }

  extractContent(cell) {
    let onClick
    let content = ""
    if (valueHelper.isValue(cell)) {
      if (typeof cell === "string") {
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
