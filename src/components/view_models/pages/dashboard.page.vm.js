import { AbstractPageViewModel } from './'

class DashboardPageViewModel extends AbstractPageViewModel {
  constructor(props) {
    super(props)

    this.loadData = this.loadData.bind(this)
  }

  loadData() {
    this.clearData(true)
  }
}

export { DashboardPageViewModel }
