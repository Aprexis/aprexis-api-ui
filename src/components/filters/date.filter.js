import React, { Component } from 'react'
import { Col, Label } from 'reactstrap'
import { DatePicker } from '../shared'
import { dateHelper, filtersHelper, valueHelper } from '../../helpers'

// TODO: rewrite to properly use DatePicker.

class DateFilter extends Component {
  constructor(props) {
    super(props)

    this.chooseDate = this.chooseDate.bind(this)
    this.initialDate = this.initialDate.bind(this)
  }

  chooseDate(currentValue, alternateValue) {
    if (!dateHelper.isDateValue(currentValue)) {
      return alternateValue
    }

    return currentValue
  }

  initialDate(from, value, to) {
    const workingValue = this.chooseDate(value, from)

    return this.chooseDate(workingValue, to)
  }

  render() {
    const { filterDescription, filters } = this.props
    const { allowBlank, from, name, to } = filterDescription
    const value = filtersHelper.filterToValue(filters, filterDescription.queryParam)
    const date = allowBlank ? valueHelper.makeDate(value) : this.initialDate(from, value, to)

    return (
      <div className="form-group row">
        <Label className="col-3 col-form-label text-nowrap mr-2 pt-1" htmlFor={name}>{name}</Label>
        <Col className="pt-0 pl-2">
          <DatePicker
            allowBlank={allowBlank}
            allowEdit={!valueHelper.isSet(filterDescription.disabled) && !valueHelper.isSet(this.props.readOnly)}
            className=""
            dayChange={this.props.dayChange}
            date={date}
            disabledDays={filterDescription.disabledDays}
            earliestDate={from}
            latestDate={to}
          />
        </Col>
      </div>
    )
  }

  static toLabel(filterDescription, filters, nextOperation) {
    const { name, queryParam } = filterDescription
    const value = filtersHelper.filterToValue(filters, queryParam)
    if (!valueHelper.isValue(value)) {
      nextOperation()
      return
    }

    const label = filtersHelper.dateLabel(value)
    nextOperation(
      {
        canDelete: filterDescription.canDelete ?? true,
        label,
        name,
        queryParam
      }
    )
  }
}

export { DateFilter }
