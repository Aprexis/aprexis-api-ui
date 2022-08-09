import React, { Component } from "react"
import { Col, Input } from "reactstrap"
import { valueHelper, fieldHelper } from "@aprexis/aprexis-api-utility"
import { displayHelper } from '../../helpers'

class SelectFieldEditor extends Component {
  render() {
    const { changeField, helper, model, omitLabel, prefix, required } = this.props
    const name = fieldHelper.name(this.props)
    const fieldName = fieldHelper.fieldName(name, prefix)
    const canModifyField = helper.canModifyField(model, fieldName)
    const method = fieldHelper.method(this.props)
    const fieldValue = valueHelper.makeString(helper[method](model, prefix))
    const options = displayHelper.options(this.props)

    return (
      <React.Fragment>
        {
          !valueHelper.isSet(omitLabel) &&
          <Col xs={displayHelper.labelXs(this.props)}><label>{displayHelper.label(this.props)}</label></Col>
        }
        <Col xs={displayHelper.fieldXs(this.props)}>
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
