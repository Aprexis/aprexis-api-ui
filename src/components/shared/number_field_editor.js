import React, { Component } from "react"
import InputNumber from 'rc-input-number'
import { Col } from "reactstrap"
import { fieldHelper, valueHelper } from "../../helpers"

class NumberFieldEditor extends Component {
  render() {
    const { changeField, helper, max, min, model } = this.props
    const name = fieldHelper.name(this.props)
    const canModifyField = helper.canModifyField(model, name)
    const method = fieldHelper.method(this.props)

    return (
      <React.Fragment>
        <Col xs={fieldHelper.labelXs(this.props)}><label>{fieldHelper.label(this.props)}</label></Col>
        <Col xs={fieldHelper.fieldXs(this.props)}>
          <InputNumber
            disabled={!canModifyField}
            max={max}
            min={min}
            name={name}
            onChange={(newValue) => { changeField(name, newValue) }}
            readOnly={!canModifyField}
            value={valueHelper.makeString(helper[method](model))}
          />
        </Col>
      </React.Fragment>
    )
  }
}

export { NumberFieldEditor }
