import React, { Component } from "react"
import { faEdit } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { valueHelper } from "@aprexis/aprexis-api-utility"

const EditButtonContent = ({ useText }) => {
  if (useText) {
    return ("(edit)")
  }

  return (<FontAwesomeIcon icon={faEdit} />)
}

class EditButton extends Component {
  constructor(props) {
    super(props)

    this.buildClassName = this.buildClassName.bind(this)
  }

  buildClassName() {
    const { useText } = this.props
    const basicClassName = "mt-0 mb-0 pt-0 pb-0 ml-1 btn"

    if (valueHelper.isSet(useText)) {
      return `text-muted ${basicClassName} btn-link`
    }

    return basicClassName
  }

  render() {
    return (
      <button
        className={this.buildClassName()}
        onClick={this.props.onEdit}>
        <EditButtonContent useText={this.props.useText} />
      </button>
    )
  }
}

export { EditButton }
