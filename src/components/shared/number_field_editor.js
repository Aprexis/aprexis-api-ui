import React, { Component } from "react"
import InputNumber from 'rc-input-number'
import { Col } from "reactstrap"
import { valueHelper, fieldHelper } from "@aprexis/aprexis-api-utility"
import { displayHelper } from '../../helpers/index.js'

class NumberFieldEditor extends Component {
  render() {
    const { changeField, helper, max, min, model, omitLabel, precision, prefix, required, step } = this.props
    const name = fieldHelper.name(this.props)
    const fieldName = fieldHelper.fieldName(name, prefix)
    const canModifyField = helper.canModifyField(model, fieldName)
    const method = fieldHelper.method(this.props)
    const myPrecision = valueHelper.isNumberValue(precision) ? precision : 0
    const myStep = valueHelper.isNumberValue(step) || valueHelper.isStringValue(step) ? step : 1

    return (
      <React.Fragment>
        {
          !valueHelper.isSet(omitLabel) &&
          <Col xs={displayHelper.labelXs(this.props)}><label>{displayHelper.label(this.props)}</label></Col>
        }
        <Col xs={displayHelper.fieldXs(this.props)}>
          <InputNumber
            disabled={!canModifyField}
            max={max}
            min={min}
            name={fieldName}
            onChange={(newValue) => { changeField(name, newValue) }}
            precision={myPrecision}
            readOnly={!canModifyField}
            required={required}
            step={myStep}
            value={valueHelper.makeString(helper[method](model, prefix))}
          />
        </Col>
      </React.Fragment>
    )
  }
}

export { NumberFieldEditor }
