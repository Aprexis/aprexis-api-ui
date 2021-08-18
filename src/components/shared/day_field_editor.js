import React, { Component } from "react"
import { Col } from "reactstrap"
import { valueHelper, fieldHelper } from "../../helpers"
import { DayPicker } from "./"

class DayFieldEditor extends Component {
  render() {
    const { allowBlank, changeField, earliestDate, helper, latestDate, model, omitLabel, style } = this.props
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
          <DayPicker
            allowBlank={allowBlank}
            allowEdit={canModifyField}
            date={helper[method](model)}
            dayChange={changeField}
            dateField={name}
            earliestDate={earliestDate}
            latestDate={latestDate}
            style={style}
          />
        </Col>
      </React.Fragment>
    )
  }
}

export { DayFieldEditor }
