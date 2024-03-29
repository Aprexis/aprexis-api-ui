import React, { Component } from "react"
import { Col, Label } from "reactstrap"
import { DayPicker } from "../shared"
import { dateHelper, valueHelper } from "@aprexis/aprexis-api-utility"
import { filtersHelper } from "../../helpers"

/* TODO: needs to be checked against DayPicker. */

class DateRangeFilter extends Component {
  constructor(props) {
    super(props)

    this.changeDate = this.changeDate.bind(this)
    this.determineDateFromValue = this.determineDateFromValue.bind(this)
    this.determineEarliestStartDate = this.determineEarliestStartDate.bind(this)
    this.determineEarliestStopDate = this.determineEarliestStopDate.bind(this)
    this.determineFilterClassName = this.determineFilterClassName.bind(this)
    this.determineFilterFieldValues = this.determineFilterFieldValues.bind(this)
    this.determineLatestStartDate = this.determineLatestStartDate.bind(this)
    this.determineLatestStopDate = this.determineLatestStopDate.bind(this)
    this.determineQueryField = this.determineQueryField.bind(this)
    this.determineQueryValue = this.determineQueryValue.bind(this)
  }

  changeDate(field, fieldValue, fieldValid) {
    const { filterDescription, filters, filterValidations } = this.props
    const { name, queryParam } = filterDescription
    const queryField = this.determineQueryField(field)
    const value = this.determineQueryValue(queryParam, queryField, filters, fieldValue)
    const newFilterValidations = { ...filterValidations }
    newFilterValidations[queryParam] = { ...newFilterValidations[queryParam], [queryField]: fieldValid }

    this.props.onChange(name, value, newFilterValidations)
  }

  determineDateFromValue(value) {
    if (!valueHelper.isValue(value) || value == "") {
      return
    }

    return dateHelper.makeDate(value)
  }

  determineEarliestStartDate(filterDescription) {
    const { from } = filterDescription

    return this.determineDateFromValue(from)
  }

  determineEarliestStopDate(filterDescription, start) {
    let value = start
    if (!dateHelper.isValidDate(value)) {
      value = filterDescription.from
    }

    return this.determineDateFromValue(value)
  }

  determineFilterClassName(filterDescription) {
    const { filterClassName } = filterDescription
    if (valueHelper.isValue(filterClassName)) {
      return filterClassName
    }

    return "form-group row"
  }

  determineFilterFieldValues(queryParam) {
    const { filters } = this.props
    const value = filtersHelper.filterToValue(filters, queryParam)
    let start
    let stop

    if (valueHelper.isValue(value)) {
      start = value.start
      stop = value.stop
    }

    return { start, stop }
  }

  determineLatestStartDate(filterDescription, stop) {
    let value = stop
    if (!dateHelper.isValidDate(value)) {
      value = filterDescription.to
    }

    return this.determineDateFromValue(value)
  }

  determineLatestStopDate(filterDescription) {
    const { to } = filterDescription

    return this.determineDateFromValue(to)
  }

  determineQueryField(field) {
    if (field.endsWith("StartDate")) {
      return "start"
    }
    if (field.endsWith("StopDate")) {
      return "stop"
    }

    throw new Error("Unrecognized query field")
  }

  determineQueryValue(queryParam, queryField, filters, fieldValue) {
    const value = filters[queryParam]

    return { ...value, [queryField]: fieldValue }
  }

  static initializeValidation(filterDescription, filter) {
    if (!valueHelper.isValue(filter)) {
      return {}
    }

    const { start, stop } = filter
    return { start: validateDate(start), stop: validateDate(stop) }

    function validateDate(date) {
      if (!valueHelper.isValue(date)) {
        return { validDate: true }
      }

      if (!dateHelper.isValidDate(date)) {
        return { validDate: false }
      }

      return { validDate: true }
    }
  }

  render() {
    const { filterDescription, readOnly } = this.props
    const allowEdit = !filterDescription.disabled && !valueHelper.isSet(readOnly)
    const {
      disabledDays,
      label,
      startFieldLabel,
      stopFieldLabel,
    } = filterDescription
    const { queryParam } = filterDescription
    const { start, stop } = this.determineFilterFieldValues(queryParam)

    return (
      <div className={this.determineFilterClassName(filterDescription)}>
        <Col xs={2} className="col-2 col-form-label test-nowrap pt-1">{label}</Col>
        <Col className="p-0">
          <Label className="ml-3 mr-2">{startFieldLabel}</Label>
          <DayPicker
            allowBlank={true}
            allowEdit={allowEdit}
            date={start}
            dayChange={this.props.onChange}
            dateField={`${queryParam}_StartDate`}
            disabledDays={disabledDays}
            earliestDate={this.determineEarliestStartDate(filterDescription)}
            latestDate={this.determineLatestStartDate(filterDescription, stop)}
            style={{ width: 110 }}
          />
        </Col>
        <Col className="p-0">
          <Label className="ml-3 mr-2">{stopFieldLabel}</Label>
          <DayPicker
            allowBlank={true}
            allowEdit={allowEdit}
            date={stop}
            dayChange={this.props.onChange}
            dateField={`${queryParam}_StopDate`}
            disabledDays={disabledDays}
            earliestDate={this.determineEarliestStartDate(filterDescription, start)}
            latestDate={this.determineLatestStopDate(filterDescription)}
            style={{ width: 110 }}
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

    const { start, stop } = value
    let label = ""
    if (valueHelper.isValue(start)) {
      label = filtersHelper.dateLabel(start)
    }
    if (valueHelper.isValue(stop)) {
      label = `${label}-${filtersHelper.dateLabel(stop)}`
    }

    nextOperation(
      {
        canDelete: false,
        label,
        name,
        queryParam
      }
    )
  }
}

export { DateRangeFilter }
