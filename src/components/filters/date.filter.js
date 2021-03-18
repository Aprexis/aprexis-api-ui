import React, { Component } from 'react'
import { Col, Label } from 'reactstrap'
import { DateEditor } from '../shared'
import { dateHelper, filtersHelper, valueHelper } from '../../helpers'

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
    const value = filtersHelper.filterValue(filters, filterDescription.queryParam)
    const date = allowBlank ? valueHelper.makeDate(value) : this.initialDate(from, value, to)

    return (
      <div className="form-group row">
        <Label className="col-3 col-form-label text-nowrap mr-2 pt-1" htmlFor={name}>{name}</Label>
        <Col className="pt-0 pl-2">
          <DateEditor
            allowBlank={allowBlank}
            allowEdit={!valueHelper.isSet(filterDescription.disabled) && !valueHelper.isSet(this.props.readOnly)}
            className=""
            date={date}
            disabledDays={filterDescription.disabledDays}
            earliestDate={from}
            latestDate={to}
            setValidDate={this.props.setValidDate}
          />
        </Col>
      </div>
    )
  }

  static toLabel(filterDescription, filters) {
    const { field, name, queryParam } = filterDescription
    const value = filtersHelper.filterValue(filters, queryParam)
    if (!valueHelper.isValue(value)) {
      return
    }

    const label = filtersHelper.dateLabel(value)
    return {
      canDelete: true,
      field,
      label,
      name,
      queryParam
    }
  }
}

export { DateFilter }
