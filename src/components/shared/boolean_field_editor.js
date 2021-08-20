import React, { Component } from "react"
import { Col, Label, Input } from "reactstrap"
import { valueHelper, fieldHelper } from "../../helpers"

class BooleanFieldEditor extends Component {
  render() {
    const { changeField, helper, model, omitLabel } = this.props
    const name = fieldHelper.name(this.props)
    const canModifyField = helper.canModifyField(model, name)
    const method = fieldHelper.method(this.props)

    return (
      <Col className="text-xs-left pl-4">
        <Label className="form-check-label">
          <Input
            checked={valueHelper.isSet(helper[method](model))}
            className="form-control-small"
            disabled={!canModifyField}
            name={name}
            onChange={changeField}
            readOnly={!canModifyField}
            style={{ verticalAlign: 'middle' }}
            type="checkbox"
          />
          {!valueHelper.isSet(omitLabel) && fieldHelper.label(this.props)}
        </Label>
      </Col>
    )
  }
}

export { BooleanFieldEditor }
