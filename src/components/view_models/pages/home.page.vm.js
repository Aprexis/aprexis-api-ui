import { AbstractViewModel } from '../'

class HomePageViewModel extends AbstractViewModel {
  constructor(props) {
    super(props)

    this.loadData = this.loadData.bind(this)
  }

  loadData() {
    this.clearData(true)
  }
}

export { HomePageViewModel }
