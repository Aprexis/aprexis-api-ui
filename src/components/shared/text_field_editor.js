import React, { Component } from "react"
import { Col, Input } from "reactstrap"
import { fieldHelper, valueHelper } from "../../helpers"

class TextFieldEditor extends Component {
  render() {
    const { area, changeField, helper, maxLength, model, omitLabel } = this.props
    const name = fieldHelper.name(this.props)
    const canModifyField = helper.canModifyField(model, name)
    const method = fieldHelper.method(this.props)
    const inputType = valueHelper.isSet(area) ? "textarea" : "text"
    const actualMaxLength = valueHelper.isValue(maxLength) ? maxLength : 255

    return (
      <React.Fragment>
        {
          !valueHelper.isSet(omitLabel) &&
          <Col xs={fieldHelper.labelXs(this.props)}><label>{fieldHelper.label(this.props)}</label></Col>
        }
        <Col xs={fieldHelper.fieldXs(this.props)}>
          <Input
            className="form-control"
            disabled={!canModifyField}
            maxLength={actualMaxLength}
            name={name}
            onChange={changeField}
            readOnly={!canModifyField}
            type={inputType}
            value={valueHelper.makeString(helper[method](model))}
          />
        </Col>
      </React.Fragment>
    )
  }
}

export { TextFieldEditor }
