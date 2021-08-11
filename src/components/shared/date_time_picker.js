import React, { Component } from "react"
import { Col, Row } from "reactstrap"
import { dateHelper } from "../../helpers"
import { DatePicker, TimePicker } from "./"
import { DateTimePickerViewModel } from "../view_models/shared"

/* TODO: needs to be updated to be similar to DatePicker. */

class DateTimePicker extends Component {
  constructor(props) {
    super(props)

    this.vm = new DateTimePickerViewModel(
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
      timeClassName,
      timeField,
      timeStep,
      timeStyle
    } = this.props
    const allowEditTime = allowEdit && dateHelper.isValidDate(dateTime)

    return (
      <Row>
        <Col xs={7}>
          <DatePicker
            allowBlank={allowBlank}
            allowEdit={allowEdit}
            className={dateClassName}
            dayChange={this.vm.dayChange}
            date={dateTime}
            disabledDays={disabledDays}
            earliestDate={earliestDate}
            field={dateField}
            latestDate={latestDate}
            style={dateStyle}
          />
        </Col>
        <Col xs={5}>
          <TimePicker
            allowBlank={allowBlank}
            allowEdit={allowEditTime}
            className={timeClassName}
            field={timeField}
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

export { DateTimePicker }
