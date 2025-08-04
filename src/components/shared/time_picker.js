import { Component } from "react"
import { valueHelper } from "@aprexis/aprexis-api-utility"
import { TimePickerViewModel } from "../view_models/shared/index.js"

const TIME_PICKER_KEYS = [
  "timeField",
  "className",
  "format",
  "locale",
  "time"
]

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
    const { allowEdit, className, readOnly, required, timeField, timeStep } = this.props
    const disabled = readOnly || !valueHelper.isSet(allowEdit)
    const step = valueHelper.isNumberValue(timeStep) ? timeStep * 60 : 60

    return (
      <input
        className={className}
        disabled={disabled}
        readOnly={disabled}
        name={timeField}
        onChange={this.vm.timeChange}
        required={required}
        step={step}
        style={{ width: '110px' }}
        type="time"
        value={this.vm.getTimeStringFromState()}
      />
    )
  }

  shouldComponentUpdate(nextProps, _nextState) {
    if (!this.vm.propertiesChanged(nextProps, TIME_PICKER_KEYS)) {
      return true
    }

    this.vm.props = { ...this.vm.props, ...nextProps }
    this.vm.loadData()

    return true
  }
}

export { TimePicker }

