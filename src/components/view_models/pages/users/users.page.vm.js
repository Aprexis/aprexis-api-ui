import { AbstractListPageViewModel } from '../'
import { userApi } from '../../../../api'
import { pageHelper, userCredentialsHelper } from '../../../../helpers'

class UsersPageViewModel extends AbstractListPageViewModel {
  constructor(props) {
    super(props)

    this.defaultParameters = this.defaultParameters.bind(this)
    this.filterDescriptions = this.filterDescriptions.bind(this)
    this.filtersOptions = this.filtersOptions.bind(this)
    this.loadData = this.loadData.bind(this)
    this.refreshData = this.refreshData.bind(this)
  }

  defaultParameters() {
    const filters = {}
    const sorting = { sort: 'username' }
    this.addData({ filters, sorting, page: this.defaultPage() })
  }

  filterDescriptions(filters, filtersOptions) {
    return []
  }

  filtersOptions() {
    return {}
  }

  loadData() {
    this.clearData(false)
    this.defaultParameters()
    this.refreshData()
  }

  refreshData() {
    const userCredentials = userCredentialsHelper.get()
    const { filters, sorting, page } = this.data

    userApi.index(
      userCredentials,
      { ...filters, ...sorting, page },
      (users, usersHeaders) => {
        this.addData({ users, usersHeaders })
        this.addField('page', pageHelper.updatePageFromLastPage(usersHeaders))
        this.redrawView()
      },
      this.onError
    )
  }
}

export { UsersPageViewModel }
