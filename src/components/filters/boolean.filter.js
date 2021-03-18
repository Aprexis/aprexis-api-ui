import React, { Component } from 'react'
import { Col, Input, Label } from 'reactstrap'
import { filtersHelper, valueHelper } from '../../helpers'

class BooleanFilter extends Component {
  render() {
    const { filterDescription, filters } = this.props
    const options = [
      (<option value="true">{filterDescription.trueLabel}</option>),
      (<option value="false">{filterDescription.falseLabel}</option>)
    ]

    let value = filtersHelper.filterValue(filters, filterDescription.queryParam)
    const { name, unselectedLabel } = filterDescription
    if (valueHelper.isValue(unselectedLabel)) {
      options.push(<option value="">{unselectedLabel}</option>)
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
            mutliple={false}
            name={name}
            onChange={this.props.onChange}
            type="select"
            value={value}>
            {options}
          </Input>
        </Col>
      </div>
    )
  }

  static toLabel(filterDescription, filters) {
    const { name, queryParam } = filterDescription
    const label = buildLabel(filterDescription, filters)
    if (!valueHelper.isValue(label)) {
      return
    }

    return {
      canDelete: true,
      label,
      name,
      queryParam
    }

    function buildLabel(filterDescription, filters) {
      const { queryParam } = filterDescription
      const value = filtersHelper.filterValue(filters, queryParam)
      if (!valueHelper.isValue(value)) {
        return filterDescription.unsetLabel
      }

      return valueHelper.isSet(value) ? filterDescription.trueLabel : filterDescription.falseLabel
    }
  }
}

export { BooleanFilter }
