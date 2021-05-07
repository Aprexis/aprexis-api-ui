import React, { Component } from "react"
import { TimePickerViewModel } from "../view_models/shared"
import { valueHelper } from "../../helpers"

class TimePicker extends Component {
  constructor(props) {
    super(props)

    this.vm = new TimePickerViewModel(
      {
        ...props,
        format: "HH:mm",
        locale: navigator.languages[0],
        view: this
      }
    )
    this.state = {}
  }

  componentDidMount() {
    this.vm.loadData()
  }

  render() {
    const { allowEdit, className, field, readOnly } = this.props
    const { time } = this.state
    const disabled = readOnly || !valueHelper.isSet(allowEdit)

    return (
      <input
        className={className}
        defaultValue={time}
        disabled={disabled}
        readOnly={disabled}
        name={field}
        onChange={this.vm.timeChange}
        style={{ width: '100px' }}
        type="time"
      />
    )
  }

  shouldComponentUpdate(nextProps, nextState) {
    this.vm.props = { ...this.vm.props, ...nextProps }
    return true
  }
}

export { TimePicker }

