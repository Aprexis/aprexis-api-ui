import { AbstractViewModel } from "../"
import { filterClasses } from "../../filters/filter_classes"
import { filtersHelper, valueHelper } from "../../../helpers"

class FiltersItemViewModel extends AbstractViewModel {
  constructor(props) {
    super(props)

    this.buildFilterLabel = this.buildFilterLabel.bind(this)
    this.loadData = this.loadData.bind(this)
  }

  buildFilterLabel(filterDescriptions, filters, filterIdx, existingFilterLabels, nextOperation) {
    if (!valueHelper.isValue(filterDescriptions) || filterDescriptions.length === 0) {
      if (valueHelper.isFunction(nextOperation)) {
        nextOperation()
      }
      return
    }

    const onSuccess = (label) => {
      const filterLabels = [...existingFilterLabels]
      if (valueHelper.isValue(label)) {
        filterLabels.push(label)
      }

      const nextFilterIdx = filterIdx + 1
      if (nextFilterIdx === filterDescriptions.length) {
        this.addField("filterLabels", filterLabels, nextOperation)
        return
      }

      this.buildFilterLabel(filterDescriptions, filters, nextFilterIdx, filterLabels, nextOperation)
    }

    filtersHelper.filterToLabel(filterDescriptions[filterIdx], filters, filterClasses, onSuccess)
  }

  loadData() {
    const { filterDescriptions, filters } = this.props
    this.clearData(false)
    this.addData(
      { filterDescriptions, filters },
      () => { this.buildFilterLabel(filterDescriptions, filters, 0, [], this.redrawView) }
    )
  }
}

export { FiltersItemViewModel }
