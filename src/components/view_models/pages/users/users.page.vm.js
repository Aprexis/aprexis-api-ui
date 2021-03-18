import { AbstractViewModel } from '../../'

class UsersPageViewModel extends AbstractViewModel {
  constructor(props) {
    super(props)

    this.filterDescriptions = this.filterDescriptions.bind(this)
    this.filtersOptions = this.filtersOptions.bind(this)
    this.loadData = this.loadData.bind(this)
  }

  filterDescriptions(filters, filtersOptions) {
    return []
  }

  filtersOptions() {
    return {}
  }

  loadData() {
    this.clearData(true)
  }
}

export { UsersPageViewModel }
