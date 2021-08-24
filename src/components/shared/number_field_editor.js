import React, { Component } from "react"
import InputNumber from 'rc-input-number'
import { Col } from "reactstrap"
import { valueHelper, fieldHelper } from "../../helpers"

class NumberFieldEditor extends Component {
  render() {
    const { changeField, helper, max, min, model, omitLabel, precision, step } = this.props
    const name = fieldHelper.name(this.props)
    const canModifyField = helper.canModifyField(model, name)
    const method = fieldHelper.method(this.props)
    const myPrecision = valueHelper.isNumberValue(precision) ? precision : 0
    const myStep = valueHelper.isNumberValue(step) || valueHelper.isStringValue(step) ? step : 1

    return (
      <React.Fragment>
        {
          !valueHelper.isSet(omitLabel) &&
          <Col xs={fieldHelper.labelXs(this.props)}><label>{fieldHelper.label(this.props)}</label></Col>
        }
        <Col xs={fieldHelper.fieldXs(this.props)}>
          <InputNumber
            disabled={!canModifyField}
            max={max}
            min={min}
            name={name}
            onChange={(newValue) => { changeField(name, newValue) }}
            precision={myPrecision}
            readOnly={!canModifyField}
            step={myStep}
            value={valueHelper.makeString(helper[method](model))}
          />
        </Col>
      </React.Fragment>
    )
  }
}

export { NumberFieldEditor }
