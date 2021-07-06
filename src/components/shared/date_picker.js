import React, { Component } from "react"
import DayPickerInput from "react-day-picker/DayPickerInput"
import "react-day-picker/lib/style.css"
import { valueHelper } from "../../helpers"
import { DatePickerViewModel } from "../view_models/shared"

const DATE_PICKER_KEYS = [
  "date",
  "dateField",
  "dayPickerClassName",
  "dayPickerStyle",
  "disabledDays",
  "earliestDate",
  "format",
  "latestDate",
  "locale"
]

class DatePicker extends Component {
  constructor(props) {
    super(props)

    this.vm = new DatePickerViewModel(
      {
        ...props,
        format: "yyyy-MM-dd",
        /*locale: navigator.languages[0],*/
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
    const dayPickerClassName = this.vm.getDayPickerClassNameFromProps()
    const dayPickerStyle = this.vm.getDayPickerStyleFromProps()
    const { dateString } = this.state

    if (!valueHelper.isSet(this.props.allowEdit)) {
      return this.renderDayValue(dayPickerClassName, dayPickerStyle, dateString)
    }

    return this.renderDayEditor(dayPickerClassName, dayPickerStyle, dateString)
  }

  renderDayEditor(dayPickerClassName, dayPickerStyle, dateString) {
    const { dateField } = this.props

    return (
      <DayPickerInput
        dayPickerProps={this.vm.getDayPickerPropsFromProps(dateString)}
        format="yyyy-MM-dd"
        formatDate={this.vm.formatDate}
        inputProps={{ className: dayPickerClassName }}
        name={dateField}
        onDayChange={this.vm.dayChange}
        parseDate={this.vm.parseDate}
        placeholder="YYYY-MM-DD"
        style={dayPickerStyle}
        value={this.vm.parseDate(dateString, this.vm.props.format, this.vm.props.locale)}
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
    if (!this.vm.propertiesChanged(nextProps, DATE_PICKER_KEYS)) {
      return true
    }

    this.vm.props = { ...this.vm.props, ...nextProps }
    this.vm.loadData()

    return true
  }
}

export { DatePicker }
