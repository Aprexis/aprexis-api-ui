import React, { Component } from "react"
import { Col, Input } from "reactstrap"
import { valueHelper, fieldHelper } from "../../helpers"

class TextFieldEditor extends Component {
  render() {
    const { area, changeField, cols, helper, maxLength, model, omitLabel, prefix, rows } = this.props
    const name = fieldHelper.name(this.props)
    const fieldName = fieldHelper.fieldName(name, prefix)
    const canModifyField = helper.canModifyField(model, fieldName)
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
            cols={cols}
            disabled={!canModifyField}
            maxLength={actualMaxLength}
            name={fieldName}
            onChange={changeField}
            readOnly={!canModifyField}
            rows={rows}
            type={inputType}
            value={valueHelper.makeString(helper[method](model, prefix))}
          />
        </Col>
      </React.Fragment>
    )
  }
}

export { TextFieldEditor }
