import React, { Component } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { valueHelper } from "../../helpers"
import { DayPickerViewModel } from "../view_models/shared"

const DAY_PICKER_KEYS = [
  "date",
  "dateField",
  "dateFormat",
  "dayPickerClassName",
  "dayPickerStyle",
  "disabledDays",
  "earliestDate",
  "format",
  "latestDate",
  "locale"
]

class DayPicker extends Component {
  constructor(props) {
    super(props)

    this.vm = new DayPickerViewModel(
      {
        ...props,
        dateFormat: "yyyy-MM-dd",
        view: this
      }
    )
    this.state = {}

    this.renderDayEditor = this.renderDayEditor.bind(this)
    this.renderDayValue = this.renderDayValue.bind(this)
  }

  componentDidMount() {
    this.vm.loadData()
  }

  render() {
    const { required } = this.props
    const dayPickerClassName = this.vm.getDayPickerClassNameFromProps()
    const dayPickerStyle = this.vm.getDayPickerStyleFromProps()
    const { dateString } = this.state

    if (!valueHelper.isSet(this.props.allowEdit)) {
      return this.renderDayValue(dayPickerClassName, dayPickerStyle, dateString)
    }

    return this.renderDayEditor(dayPickerClassName, dayPickerStyle, dateString, required)
  }

  renderDayEditor(dayPickerClassName, dayPickerStyle, dateString, required) {
    const dayPickerProps = this.vm.getDayPickerPropsFromProps(dateString)

    return (
      <DatePicker
        {...dayPickerProps}
        className={dayPickerClassName}
        dropdownMode="select"
        onChange={this.vm.dayChange}
        onChangeRaw={this.vm.dayEntry}
        peakNextMonth
        placeholderText={dayPickerProps.dateFormat.toUpperCase()}
        required={required}
        scrollableYearDropdown
        selected={this.vm.parseDate(dateString, this.vm.props.dateFormat, this.vm.props.locale)}
        showMonthDropdown
        showYearDropdown
        style={dayPickerStyle}
      />
    )
  }

  renderDayValue(dayPickerClassName, dayPickerStyle, dateString) {
    let value = dateString
    if (!valueHelper.isStringValue(value)) {
      value = "Not Specified"
    }

    return (
      <span
        className={`${dayPickerClassName}`}
        style={dayPickerStyle}>
        {value}
      </span>
    )
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (!this.vm.propertiesChanged(nextProps, DAY_PICKER_KEYS)) {
      return true
    }

    this.vm.props = { ...this.vm.props, ...nextProps }
    this.vm.loadData()

    return true
  }
}

export { DayPicker }
