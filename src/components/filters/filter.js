import { Component } from "react"
import { filterClasses } from "./filter_classes"
import { valueHelper } from "@aprexis/aprexis-api-utility"
import { filtersHelper } from "../../helpers"
class Filter extends Component {
  static initializeValidations(filterDescriptions, filters) {
    const filterValidations = {}

    filterDescriptions.filter(
      (filterDescription) => {
        const FilterClass = filtersHelper.filterToClass(filterDescription, filterClasses)
        return valueHelper.isFunction(FilterClass.initializeValidation)
      }
    ).forEach(
      (filterDescription) => {
        const FilterClass = filtersHelper.filterToClass(filterDescription, filterClasses)
        const { queryParam } = filterDescription
        const filterValidation = FilterClass.initializeValidation(filterDescription, filters[queryParam])

        filterValidations[queryParam] = filterValidation
      }
    )

    return filterValidations
  }

  render() {
    const { filterDescription } = this.props
    const FilterClass = filtersHelper.filterToClass(filterDescription, filterClasses)
    if (!valueHelper.isValue(FilterClass)) {
      return (
        <span>Filter not recognized: ${JSON.stringify(filterDescription, valueHelper.getCircularReplacer(), 2)}</span>
      )
    }

    const onChange = filtersHelper.filterToOnChange(filterDescription)
    return (
      <div>
        <FilterClass
          {...this.props}
          filterDescription={filterDescription}
          filters={this.props.filters}
          filterValidations={this.props.filterValidations}
          onChange={this.props[onChange]}
          readOnly={this.props.readOnly}
          reconnectAndRetry={this.props.reconnectAndRetry}
        />
      </div>
    )
  }
}

export { Filter }
