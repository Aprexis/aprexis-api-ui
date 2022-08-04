import React, { Component } from "react"
import { Col, Label, Input } from "reactstrap"
import { valueHelper, fieldHelper, } from "@aprexis/aprexis-api-utility"
import { displayHelper, jsEventHelper } from "../../helpers"

class BooleanFieldEditor extends Component {
  render() {
    const { changeField, helper, model, omitLabel, prefix, required } = this.props
    const name = fieldHelper.name(this.props)
    const fieldName = fieldHelper.fieldName(name, prefix)
    const canModifyField = helper.canModifyField(model, fieldName)
    const method = fieldHelper.method(this.props)

    return (
      <Col className="text-xs-left pl-4">
        <Label className="form-check-label">
          <Input
            checked={valueHelper.isSet(helper[method](model, prefix))}
            className="form-control-small"
            disabled={!canModifyField}
            name={fieldName}
            onChange={
              (event) => {
                if (!valueHelper.isSet(this.props.textField)) {
                  changeField(event)
                }

                let { value } = jsEventHelper.fromInputEvent(event)
                value = valueHelper.yesNo(value).substring(0, 1)
                changeField({ event: { target: { name, value } } })
              }
            }
            readOnly={!canModifyField}
            required={required}
            style={{ verticalAlign: 'middle' }}
            type="checkbox"
          />
          {!valueHelper.isSet(omitLabel) && displayHelper.label(this.props)}
        </Label>
      </Col>
    )
  }
}

export { BooleanFieldEditor }
