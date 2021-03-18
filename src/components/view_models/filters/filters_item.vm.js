import { AbstractViewModel } from '../'

class FiltersItemViewModel extends AbstractViewModel {
  constructor(props) {
    super(props)

    this.loadData = this.loadData.bind(this)
  }

  loadData(filterDescriptions, filters) {
    this.clearData(false)
    this.addData({ filterDescriptions, filters })
    this.redrawView()
  }
}

export { FiltersItemViewModel }
