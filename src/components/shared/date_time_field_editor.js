import React, { Component } from "react"
import { Col } from "reactstrap"
import { DateTimePicker } from "./"
import { fieldHelper, valueHelper } from "../../helpers"

class DateTimeFieldEditor extends Component {
  render() {
    const {
      allowBlank,
      changeField,
      dateStyle,
      earliestDate,
      helper,
      latestDate,
      model,
      omitLabel,
      timeStyle
    } = this.props
    const name = fieldHelper.name(this.props)
    const canModifyField = helper.canModifyField(model, name)
    const method = fieldHelper.method(this.props)

    return (
      <React.Fragment>
        {
          !valueHelper.isSet(omitLabel) &&
          <Col xs={fieldHelper.labelXs(this.props)}><label>{fieldHelper.label(this.props)}</label></Col>
        }
        <Col xs={fieldHelper.fieldXs(this.props)}>
          <DateTimePicker
            allowBlank={allowBlank}
            allowEdit={canModifyField}
            date={helper[method](model)}
            dayChange={changeField}
            dateField={`${name}_Date`}
            dateStyle={dateStyle}
            dateTime={helper[method](model)}
            earliestDate={earliestDate}
            latestDate={latestDate}
            timeField={`${name}_Time`}
            timeStyle={timeStyle}
          />
        </Col>
      </React.Fragment>
    )
  }
}

export { DateTimeFieldEditor }
