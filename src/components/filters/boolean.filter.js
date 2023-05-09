import React, { Component } from 'react'
import { Col, Input, Label } from 'reactstrap'
import { valueHelper } from '@aprexis/aprexis-api-utility'
import { filtersHelper } from '../../helpers'

class BooleanFilter extends Component {
  render() {
    const { filterDescription, filters } = this.props
    const { name, unselectedLabel } = filterDescription
    const options = [
      (<option key={`filter-${name}-true`} value="true">{filterDescription.trueLabel}</option>),
      (<option key={`filter-${name}-false`} value="false">{filterDescription.falseLabel}</option>)
    ]

    let value = filtersHelper.filterToValue(filters, filterDescription.queryParam)
    if (valueHelper.isValue(unselectedLabel)) {
      options.push(<option key={`filter-${name}-unselected`} value="">{unselectedLabel}</option>)
      if (!valueHelper.isValue(value)) {
        value = ''
      }
    } else {
      value = valueHelper.isSet(value)
    }

    return (
      <div className="form-group row">
        <Label className="col-3 col-form-label pt-1" htmlFor={name}>{name}</Label>
        <Col xs={9}>
          <Input
            bsSize="sm"
            disabled={valueHelper.isSet(filterDescription.disabled) || valueHelper.isSet(this.props.readOnly)}
            mutliple="false"
            name={name}
            onChange={(event) => { this.props.onChange(event) }}
            type="select"
            value={value}>
            {options}
          </Input>
        </Col>
      </div>
    )
  }

  static toLabel(filterDescription, filters, nextOperation) {
    const { name, queryParam } = filterDescription
    const label = buildLabel(filterDescription, filters)
    if (!valueHelper.isValue(label)) {
      nextOperation()
      return
    }

    nextOperation(
      {
        canDelete: filterDescription.canDelete ?? true,
        label,
        name,
        queryParam
      }
    )
    return

    function buildLabel(filterDescription, filters) {
      const { queryParam } = filterDescription
      const value = filtersHelper.filterToValue(filters, queryParam)
      if (!valueHelper.isValue(value)) {
        return
      }

      if (!valueHelper.isSet(value)) {
        return pickLabel(filterDescription.falseLabel, 'False')
      }

      return pickLabel(filterDescription.trueLabel, 'True')

      function pickLabel(override, base) {
        if (valueHelper.isStringValue(override)) {
          return override
        }

        return base
      }
    }
  }
}

export { BooleanFilter }
