import React, { Component } from "react"
import { Col } from "reactstrap"
import { valueHelper, fieldHelper } from "@aprexis/aprexis-api-utility"
import { displayHelper } from "../../helpers/index.js"
import { DayPicker } from "./day_picker.js"

class DayFieldEditor extends Component {
  render() {
    const {
      allowBlank,
      changeField,
      earliestDate,
      helper,
      latestDate,
      model,
      omitLabel,
      prefix,
      required,
      style
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
          <DayPicker
            allowBlank={allowBlank}
            allowEdit={canModifyField}
            date={helper[method](model, prefix)}
            dayChange={changeField}
            dateField={fieldName}
            earliestDate={earliestDate}
            latestDate={latestDate}
            required={required}
            style={style}
          />
        </Col>
      </React.Fragment>
    )
  }
}

export { DayFieldEditor }
