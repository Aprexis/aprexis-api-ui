import { AbstractModalViewModel } from "./abstract.modal.vm"
import { Filter } from "../../filters/filter.js"
import { valueHelper } from "@aprexis/aprexis-api-utility"
import { alertHelper, jsEventHelper } from "../../../helpers/index.js"

class FiltersModalViewModel extends AbstractModalViewModel {
  constructor(props) {
    super(props)

    this.change = this.change.bind(this)
    this.changeDateTime = this.changeDateTime.bind(this)
    this.changeId = this.changeId.bind(this)
    this.filterDescriptionForName = this.filterDescriptionForName.bind(this)
    this.filterFieldsAreValid = this.filterFieldsAreValid.bind(this)
    this.filterIsValid = this.filterIsValid.bind(this)
    this.filtersAreValid = this.filtersAreValid.bind(this)
    this.filterValueIsValid = this.filterValueIsValid.bind(this)
    this.loadData = this.loadData.bind(this)
    this.submitFilters = this.submitFilters.bind(this)
  }

  change(event) {
    const { name, value } = jsEventHelper.fromInputEvent(event)
    const filterDescription = this.filterDescriptionForName(name)
    const { queryParam } = filterDescription
    const filters = { ...this.data.filters }
    if (valueHelper.isValue(value)) {
      filters[queryParam] = value
    } else {
      delete filters[queryParam]
    }

    this.addData({ filters }, this.redrawView)
  }

  changeDateTime(field, dateTimeString, fieldValid) {
    const { queryField, queryParam } = parseField(field)
    const filters = { ...this.data.filters }
    filters[queryParam] = { ...filters[queryParam], [queryField]: dateTimeString }

    const filterValidations = { ...this.data.filterValidations }
    const queryParamValidations = { ...filterValidations[queryParam] }
    filterValidations[queryParam] = {
      ...queryParamValidations,
      [queryField]: { ...queryParamValidations[queryField], ...fieldValid }
    }

    this.addData({ filters, filterValidations }, this.redrawView)

    function parseField(field) {
      const lastUnderscore = field.lastIndexOf("_")
      const queryParam = field.substring(0, lastUnderscore)
      const queryFieldType = field.substring(lastUnderscore + 1)
      let queryField

      switch (queryFieldType) {
        case "StartDate":
        case "StartTime":
          queryField = "start"
          break

        case "StopDate":
        case "StopTime":
          queryField = "stop"
          break

        default:
          throw new Error(`Unrecognized query field type ${queryFieldType}`)
      }

      return { queryField, queryParam }
    }
  }

  changeId(name, id) {
    const filterDescription = this.filterDescriptionForName(name)
    const { queryParam } = filterDescription
    const filters = { ...this.data.filters }
    if (valueHelper.isStringValue(id)) {
      filters[queryParam] = id
    } else {
      delete filters[queryParam]
    }

    this.addData({ filters }, this.redrawView)
  }

  filterDescriptionForName(name) {
    const { filterDescriptions } = this.data

    return filterDescriptions.find((fd) => fd.name == name)
  }

  filterFieldsAreValid(filterDescription, filterFieldValidations) {
    return !valueHelper.isValue(
      Object.keys(filterFieldValidations).find(
        (filterField) => {
          return !this.filterValueIsValid(filterDescription, filterFieldValidations[filterField])
        }
      )
    )
  }

  filterIsValid(filterDescription, filterValidation) {
    switch (typeof filterValidation) {
      case "object":
        return this.filterFieldsAreValid(filterDescription, filterValidation)

      default:
        return this.filterValueIsValid(filterDescription, filterValidation)
    }
  }

  filtersAreValid() {
    const { filterDescriptions, filterValidations } = this.data
    if (!valueHelper.isValue(filterValidations)) {
      return true
    }

    return !valueHelper.isValue(
      Object.keys(filterValidations).find(
        (queryParam) => {
          const filterDescription = filterDescriptions.find((fd) => fd.queryParam == queryParam)
          return !this.filterIsValid(filterDescription, filterValidations[queryParam])
        }
      )
    )
  }

  filterValueIsValid(filterDescription, filterValue) {
    if (!valueHelper.isValue(filterValue)) {
      return true
    }

    if (valueHelper.isSet(filterValue)) {
      return true
    }

    alertHelper.error(`${filterDescription.name} is not valid`)
    return false
  }

  loadData() {
    const { filterDescriptions, filters } = this.props
    const filterValidations = Filter.initializeValidations(filterDescriptions, filters)
    this.addData({ filterDescriptions, filters, filterValidations }, this.redrawView)
  }

  submitFilters() {
    const { filters } = this.data
    if (!this.filtersAreValid()) {
      return
    }

    this.props.clearModal(() => { this.props.onUpdateFilters(filters, this.props.onRefreshData) })
  }
}

export { FiltersModalViewModel }
