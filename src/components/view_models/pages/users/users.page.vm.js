import { AbstractListPageViewModel } from '../'
import { userApi } from '../../../../api'
import { history, filtersHelper, pageHelper, userCredentialsHelper } from '../../../../helpers'

const USER_STATES = [
  {
    id: 'active',
    value: 'Active'
  },
  {
    id: 'expired',
    value: 'Expired'
  },
  {
    id: 'access_locked',
    value: 'Access Locked'
  },
  {
    id: 'login_disabled',
    value: 'Login Disabled'
  }
]

class UsersPageViewModel extends AbstractListPageViewModel {
  constructor(props) {
    super(props)

    this.defaultParameters = this.defaultParameters.bind(this)
    this.filterDescriptions = this.filterDescriptions.bind(this)
    this.filtersOptions = this.filtersOptions.bind(this)
    this.gotoUser = this.gotoUser.bind(this)
    this.loadData = this.loadData.bind(this)
    this.refreshData = this.refreshData.bind(this)
  }

  defaultParameters() {
    const filters = { for_state: 'active' }
    const sorting = { sort: 'username' }
    this.addData({ filters, sorting, page: this.defaultPage() })
  }

  filterDescriptions(filters, filtersOptions) {
    return [
      filtersHelper.stringFilter('Name', 'for_name'),
      filtersHelper.stringFilter('Username', 'for_username'),
      filtersHelper.stringFilter('Email', 'for_email'),
      filtersHelper.selectIdFilter(
        'State',
        'for_state',
        { options: USER_STATES, unselectedLabel: 'All' }
      )
    ]
  }

  filtersOptions() {
    return {}
  }

  gotoUser(user) {
    history.push(`/users/${user.id}`)
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
