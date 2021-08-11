import React, { Component } from "react"
import { faCalendarMinus, faTrashAlt } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ConfirmableButton } from "./"
import { valueHelper } from "../../helpers"

class DeleteButton extends Component {
  constructor(props) {
    super(props)

    this.buildClassName = this.buildClassName.bind(this)
    this.buttonLabel = this.buttonLabel.bind(this)
    this.buttonText = this.buttonText.bind(this)
  }

  buildClassName() {
    const { useText } = this.props
    const basicClassName = "mt-0 mb-0 pt-0 pb-0 ml-1 btn"

    if (valueHelper.isSet(useText)) {
      return `text-muted ${basicClassName} btn-link`
    }

    return basicClassName
  }

  buttonLabel() {
    const { forCalendar, useText } = this.props

    if (valueHelper.isSet(useText)) {
      return ("(delete)")
    }

    const icon = valueHelper.isSet(forCalendar) ? faCalendarMinus : faTrashAlt
    return (<FontAwesomeIcon icon={icon} />)
  }

  buttonText() {
    const { useText } = this.props

    if (valueHelper.isSet(useText)) {
      return
    }

    return "(delete)"
  }

  render() {
    const { modelName } = this.props

    return (
      <ConfirmableButton
        buttonLabel={this.buttonLabel()}
        buttonText={this.buttonText()}
        confirmText={`Are you sure you want to delete this ${modelName}?`}
        confirmTitle="Delete"
        launchModal={this.props.launchModal}
        noLabel="Retain"
        onConfirm={this.props.onDelete}
        onDeny={this.props.onKeep}
        yesLabel="Delete"
      />
    )
  }
}

export { DeleteButton }
