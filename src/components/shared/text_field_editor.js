import React, { Component } from "react"
import { Col, Input } from "reactstrap"
import { valueHelper, fieldHelper } from "@aprexis/aprexis-api-utility"
import { displayHelper } from '../../helpers/index.js'

class TextFieldEditor extends Component {
  render() {
    const { area, changeField, cols, email, helper, maxLength, model, omitLabel, phone, prefix, required, rows } = this.props
    const name = fieldHelper.name(this.props)
    const fieldName = fieldHelper.fieldName(name, prefix)
    const canModifyField = helper.canModifyField(model, fieldName)
    const method = fieldHelper.method(this.props)
    const inputType = selectInputType(area, email, phone)
    const actualMaxLength = valueHelper.isValue(maxLength) ? maxLength : 255

    return (
      <React.Fragment>
        {
          !valueHelper.isSet(omitLabel) &&
          <Col xs={displayHelper.labelXs(this.props)}><label>{displayHelper.label(this.props)}</label></Col>
        }
        <Col xs={displayHelper.fieldXs(this.props)}>
          <Input
            className="form-control"
            cols={cols}
            disabled={!canModifyField}
            maxLength={actualMaxLength}
            name={fieldName}
            onChange={changeField}
            readOnly={!canModifyField}
            required={required}
            rows={rows}
            type={inputType}
            value={valueHelper.makeString(helper[method](model, prefix))}
          />
        </Col>
      </React.Fragment>
    )

    function selectInputType(area, email, phone) {
      if (valueHelper.isSet(area)) {
        return "textarea"
      }

      if (valueHelper.isSet(email)) {
        return "email"
      }

      if (valueHelper.isSet(phone)) {
        return "tel"
      }

      return "text"
    }
  }
}

export { TextFieldEditor }
