import React, { Component } from "react"
import { Col } from "reactstrap"
import { valueHelper, fieldHelper } from "../../helpers"
import { DayTimePicker } from "./"

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
      timeStep,
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
          <DayTimePicker
            allowBlank={allowBlank}
            allowEdit={canModifyField}
            date={helper[method](model)}
            dateTimeChange={changeField}
            dateField={`${name}_Date`}
            dateStyle={dateStyle}
            dateTime={helper[method](model)}
            earliestDate={earliestDate}
            latestDate={latestDate}
            timeField={`${name}_Time`}
            timeStep={timeStep}
            timeStyle={timeStyle}
          />
        </Col>
      </React.Fragment>
    )
  }
}

export { DayTimeFieldEditor }
