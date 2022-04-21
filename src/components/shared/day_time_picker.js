import React, { Component } from "react"
import { Col, Row } from "reactstrap"
import { dateHelper } from "../../helpers"
import { DayPicker, TimePicker } from "./"
import { DayTimePickerViewModel } from "../view_models/shared"

class DayTimePicker extends Component {
  constructor(props) {
    super(props)

    this.vm = new DayTimePickerViewModel(
      {
        ...props,
        dateFormat: "yyyy-MM-dd",
        locale: navigator.languages[0],
        timeFormat: "HH:mm",
        view: this
      }
    )
    this.state = {}
  }

  render() {
    const {
      allowBlank,
      allowEdit,
      dateClassName,
      dateField,
      dateStyle,
      dateTime,
      disabledDays,
      earliestDate,
      latestDate,
      required,
      timeClassName,
      timeField,
      timeStep,
      timeStyle
    } = this.props
    const allowEditTime = allowEdit && dateHelper.isValidDate(dateTime)

    return (
      <Row>
        <Col xs={7}>
          <DayPicker
            allowBlank={allowBlank}
            allowEdit={allowEdit}
            className={dateClassName}
            dayChange={this.vm.dayChange}
            date={dateTime}
            disabledDays={disabledDays}
            earliestDate={earliestDate}
            field={dateField}
            latestDate={latestDate}
            required={required}
            style={dateStyle}
          />
        </Col>
        <Col xs={5}>
          <TimePicker
            allowBlank={allowBlank}
            allowEdit={allowEditTime}
            className={timeClassName}
            field={timeField}
            required={required}
            time={dateTime}
            timeChange={this.vm.timeChange}
            timeStep={timeStep}
            style={timeStyle}
          />
        </Col>
      </Row>
    )
  }

  shouldComponentUpdate(nextProps, nextState) {
    this.vm.props = { ...this.vm.props, ...nextProps }
    return true
  }
}

export { DayTimePicker }
