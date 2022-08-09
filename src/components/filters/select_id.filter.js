import React, { Component } from 'react'
import { Col, Input, Label } from 'reactstrap'
import { valueHelper } from '@aprexis/aprexis-api-utility'
import { jsEventHelper, filtersHelper } from '../../helpers'

class SelectIdFilter extends Component {
  constructor(props) {
    super(props)

    this.buildOptionValues = this.buildOptionValues.bind(this)
    this.selectChange = this.selectChange.bind(this)
  }

  buildOptionValues(filterDescription) {
    const { options, requireUnselected } = filterDescription
    if (!valueHelper.isValue(options) || options.length === 0) {
      if (valueHelper.isSet(requireUnselected)) {
        return [buildUnselectedOption(filterDescription)]
      }

      return []
    }

    if (!valueHelper.isSet(requireUnselected) && options.length === 1) {
      return (
        <Label class="col-form-label">{options[0].value}</Label>
      )
    }

    const optionValues = options.map(
      (option) => {
        return (
          <option key={`$filterDescription.queryParam}-${option.id}`} value={option.id}>
            {option.value}
          </option>
        )
      }
    )

    return [
      buildUnselectedOption(filterDescription),
      ...optionValues
    ]

    function buildUnselectedOption(filterDescription) {
      return (
        <option
          key={`${filterDescription.queryParam}-unselected`}
          value=''>
          {filterDescription.unselectedLabel}
        </option>
      )
    }
  }

  render() {
    const { filterDescription, filters, readOnly } = this.props
    const { multiple, name, queryParam } = filterDescription
    const optionValues = this.buildOptionValues(filterDescription)
    if (optionValues.length === 1) {
      return optionValues[0]
    }

    let value = `${filters[queryParam]}`
    if (valueHelper.isSet(multiple)) {
      value = value.split(",")
    }

    return (
      <div className="form-group row">
        <Label
          className="col-3 col-form-label text-nowrap pt-1"
          htmlFor={name}>
          {name}
        </Label>
        <Col>
          <Input
            bsSize="sm"
            disabled={valueHelper.isSet(readOnly) || valueHelper.isSet(filterDescription.disabled)}
            multiple={valueHelper.isSet(multiple)}
            name={name}
            onChange={(event) => { this.selectChange(event, filterDescription) }}
            type="select"
            value={value}>
            {optionValues}
          </Input>
        </Col>
      </div>
    )
  }

  selectChange(event, filterDescription) {
    const { onChange } = this.props
    const { name, value } = jsEventHelper.fromInputEvent(event)
    if (!valueHelper.isSet(filterDescription.multiple)) {
      onChange(name, value)
      return
    }

    const { options } = event.target
    const multipleValues = options.filter((option) => option.selected).map((option) => option.value)
    if (multipleValues.length === 1 && multipleValues[0] == '') {
      onChange(name)
    }

    onChange(name, multipleValues.join(','))
  }

  static toLabel(filterDescription, filters, nextOperation) {
    const { name, queryParam } = filterDescription
    const label = buildLabel(queryParam, filters)
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

    function buildLabel(queryParam, filters) {
      const value = filtersHelper.filterToValue(filters, queryParam)
      if (!valueHelper.isValue(value)) {
        return
      }

      if (!valueHelper.isSet(filterDescription.multiple)) {
        return findLabel(filterDescription, value)
      }

      return value.split(",").map((individual) => findLabel(filterDescription, individual)).join(",")

      function findLabel(filterDescription, value) {
        const { options } = filterDescription
        const option = options.find((option) => valueHelper.compareWithCast(option.id, value))
        if (!valueHelper.isValue(option)) {
          return filterDescription.unselectedLabel
        }

        return option.value
      }
    }
  }
}

export { SelectIdFilter }
