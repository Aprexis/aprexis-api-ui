import React, { Component } from "react"
import DayPickerInput from "react-day-picker/DayPickerInput"
import "react-day-picker/lib/style.css"
import { valueHelper } from "../../helpers"
import { DatePickerViewModel } from "../view_models/shared"

class DatePicker extends Component {
  constructor(props) {
    super(props)

    this.vm = new DatePickerViewModel(
      {
        ...props,
        format: "yyyy-MM-dd",
        locale: navigator.languages[0],
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
    const { field } = this.props

    return (
      <DayPickerInput
        dayPickerProps={this.vm.getDayPickerPropsFromProps(dateString)}
        format="yyyy-MM-dd"
        formatDate={this.vm.formatDate}
        inputProps={{ className: dayPickerClassName }}
        name={field}
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
    this.vm.props = { ...this.vm.props, ...nextProps }
    return true
  }
}

export { DatePicker }
