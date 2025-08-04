import React, { Component } from "react"
import { Col } from "reactstrap"
import { valueHelper, fieldHelper } from "@aprexis/aprexis-api-utility"
import { displayHelper } from "../../helpers/index.js"
import { DayTimePicker } from "./day_time_picker.js"

class DayTimeFieldEditor extends Component {
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
      prefix,
      required,
      timeStep,
      timeStyle
    } = this.props
    const name = fieldHelper.name(this.props)
    const fieldName = fieldHelper.fieldName(name, prefix)
    const canModifyField = helper.canModifyField(model, fieldName)
    const method = fieldHelper.method(this.props)

    return (
      <React.Fragment>
        {
          !valueHelper.isSet(omitLabel) &&
          <Col xs={displayHelper.labelXs(this.props)}><label>{displayHelper.label(this.props)}</label></Col>
        }
        <Col xs={displayHelper.fieldXs(this.props)}>
          <DayTimePicker
            allowBlank={allowBlank}
            allowEdit={canModifyField}
            changeDateTime={changeField}
            date={helper[method](model)}
            dateField={`${fieldName}_Date`}
            dateStyle={dateStyle}
            dateTime={helper[method](model, prefix)}
            earliestDate={earliestDate}
            latestDate={latestDate}
            required={required}
            timeField={`${fieldName}_Time`}
            timeStep={timeStep}
            timeStyle={timeStyle}
          />
        </Col>
      </React.Fragment>
    )
  }
}

export { DayTimeFieldEditor }
