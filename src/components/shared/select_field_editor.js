import React, { Component } from "react"
import { Col, Input } from "reactstrap"
import { valueHelper, fieldHelper } from "../../helpers"

class SelectFieldEditor extends Component {
  render() {
    const { changeField, helper, model, omitLabel, prefix, required } = this.props
    const name = fieldHelper.name(this.props)
    const fieldName = fieldHelper.fieldName(name, prefix)
    const canModifyField = helper.canModifyField(model, fieldName)
    const method = fieldHelper.method(this.props)
    const fieldValue = valueHelper.makeString(helper[method](model, prefix))
    const options = fieldHelper.options(this.props)

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
            name={fieldName}
            onChange={changeField}
            readOnly={!canModifyField}
            required={required}
            type="select"
            value={fieldValue}>
            {options}
          </Input>
        </Col>
      </React.Fragment>
    )
  }
}

export { SelectFieldEditor }
