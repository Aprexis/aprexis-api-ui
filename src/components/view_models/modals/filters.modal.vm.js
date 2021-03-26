import { AbstractModalViewModel } from './'
import { jsEventHelper, valueHelper } from '../../../helpers'

class FiltersModalViewModel extends AbstractModalViewModel {
  constructor(props) {
    super(props)

    this.change = this.change.bind(this)
    this.changeId = this.changeId.bind(this)
    this.loadData = this.loadData.bind(this)
    this.submitFilters = this.submitFilters.bind(this)
  }

  change(event) {
    const { name, value } = jsEventHelper.fromInputEvent(event)
    const { filterDescriptions } = this.data
    const filterDescription = filterDescriptions.find((fd) => fd.name == name)
    const { queryParam } = filterDescription
    const filters = { ...this.data.filters }
    if (valueHelper.isStringValue(value)) {
      filters[queryParam] = value
    } else {
      delete filters[queryParam]
    }

    this.addData({ filters })
  }

  changeId(name, id) {
    const { filterDescriptions } = this.data
    const filterDescription = filterDescriptions.find((fd) => fd.name == name)
    const { queryParam } = filterDescription
    const filters = { ...this.data.filters }
    if (valueHelper.isStringValue(id)) {
      filters[queryParam] = id
    } else {
      delete filters[queryParam]
    }

    this.addData({ filters })
  }

  loadData() {
    const { filterDescriptions, filters } = this.props
    this.addData({ filterDescriptions, filters })
    this.redrawView()
  }

  submitFilters() {
    const { filters } = this.data

    this.props.onClearModal(() => { this.props.onUpdateFilters(filters, this.props.onRefreshData) })
  }
}

export { FiltersModalViewModel }
