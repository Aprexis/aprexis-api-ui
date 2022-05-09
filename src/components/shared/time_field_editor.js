import React, { Component } from "react"
import { Col } from "reactstrap"
import { valueHelper, fieldHelper } from "../../helpers"
import { TimePicker } from "./time_picker"

class TimeFieldEditor extends Component {
  render() {
    const {
      allowBlank,
      changeField,
      helper,
      model,
      omitLabel,
      prefix,
      step,
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
          <Col xs={fieldHelper.labelXs(this.props)}><label>{fieldHelper.label(this.props)}</label></Col>
        }
        <Col xs={fieldHelper.fieldXs(this.props)}>
          <TimePicker
            allowBlank={allowBlank}
            allowEdit={canModifyField}
            timeChange={changeField}
            step={step}
            style={style}
            time={helper[method](model)}
            timeField={fieldName}
          />
        </Col>
      </React.Fragment>
    )
  }
}

export { TimeFieldEditor }