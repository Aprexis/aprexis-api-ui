import React, { Component } from 'react'
import { Col, Input, Label } from 'reactstrap'
import { filtersHelper, valueHelper } from '../../helpers'

class StringFilter extends Component {
  render() {
    const { filters, filterDescription, readOnly } = this.props
    const { disabled, name } = filterDescription
    const value = valueHelper.makeString(filtersHelper.filterToValue(filters, filterDescription.queryParam))

    return (
      <div className="form-group row">
        <Label
          className="col-3 col-form-label pt-1"
          htmlFor={name}>
          {name}
        </Label>

        <Col className="pl-2">
          <Input
            bsSize="sm"
            defaultValue={value}
            disabled={valueHelper.isSet(disabled) || valueHelper.isSet(readOnly)}
            name={name}
            placeholder={name}
            onChange={this.props.onChange}
          />
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

      return filtersHelper.filterToValue(filters, queryParam)
    }
  }
}

export { StringFilter }
