import { AbstractListPageViewModel } from "../"
import { userApi } from "../../../../api"
import { filtersHelper, pageHelper, userCredentialsHelper, userHelper, pathHelper, valueHelper } from "../../../../helpers"

const USER_STATES = [
  {
    id: "active",
    value: "Active"
  },
  {
    id: "expired",
    value: "Expired"
  },
  {
    id: "access_locked",
    value: "Access Locked"
  },
  {
    id: "login_disabled",
    value: "Login Disabled"
  }
]

class UsersPageViewModel extends AbstractListPageViewModel {
  constructor(props) {
    super(props)

    this.defaultParameters = this.defaultParameters.bind(this)
    this.filterDescriptions = this.filterDescriptions.bind(this)
    this.filtersOptions = this.filtersOptions.bind(this)
    this.gotoUserProfile = this.gotoUserProfile.bind(this)
    this.loadData = this.loadData.bind(this)
    this.refreshData = this.refreshData.bind(this)
    this.title = this.title.bind(this)
  }

  defaultParameters() {
    const filters = { for_state: "active" }
    const sorting = { sort: "username" }
    this.addData({ filters, sorting, page: this.defaultPage() })
  }

  filterDescriptions(filters, filtersOptions) {
    return [
      filtersHelper.stringFilter("Name", "for_name"),
      filtersHelper.selectIdFilter(
        "State",
        "for_state",
        { options: USER_STATES, unselectedLabel: "All" }
      ),
      filtersHelper.selectIdFilter(
        "Role",
        "for_role",
        { options: userHelper.rolesToOptions(), unselectedLabel: "All" }
      ),
      filtersHelper.stringFilter("Username", "for_username"),
      filtersHelper.stringFilter("Email", "for_email")
    ]
  }

  filtersOptions() {
    return {}
  }

  gotoUserProfile(user) {
    const pathArray = pathHelper.buildPathArray(window.location, user, "profile")

    pathHelper.gotoPage(pathArray)
  }

  loadData() {
    this.clearData(false)
    this.defaultParameters()
    this.refreshData()
  }

  refreshData() {
    const userCredentials = userCredentialsHelper.get()
    this.removeField("userHeaders")
    const { filters, sorting, page } = this.data
    const pathEntries = this.pathEntries()

    list(
      pathEntries,
      userCredentials,
      { ...filters, ...sorting, page },
      (users, userHeaders) => {
        this.addData(
          {
            users,
            page: pageHelper.updatePageFromLastPage(userHeaders)
          },
          this.redrawView
        )
      },
      this.onError
    )

    function list(pathEntries, userCredentials, params, onSuccess, onError) {
      const healthPlan = pathEntries['health-plans']

      if (valueHelper.isValue(healthPlan)) {
        userApi.indexForHealthPlan(userCredentials, healthPlan.value, params, onSuccess, onError)
        return
      }

      userApi.index(userCredentials, params, onSuccess, onError)
    }
  }

  title() {
    return "Users"
  }
}

export { UsersPageViewModel }
