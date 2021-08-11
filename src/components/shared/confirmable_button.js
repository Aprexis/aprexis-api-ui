import React, { Component } from "react"
import { ConfirmableButtonViewModal } from "../view_models/shared"

class ConfirmableButton extends Component {
  constructor(props) {
    super(props)

    this.vm = new ConfirmableButtonViewModal({ ...props, view: this })
  }

  render() {
    const { buttonLabel, buttonTitle, className } = this.props

    return (
      <button
        title={buttonTitle}
        type="button"
        className={className}
        onClick={this.vm.requestConfirmation}>
        {buttonLabel}
      </button>
    )
  }

  shouldComponentUpdate(nextProps, nextState) {
    this.vm.props = { ...this.vm.props, ...nextProps }
    return true
  }
}

export { ConfirmableButton }
