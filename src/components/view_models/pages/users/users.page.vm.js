import { AbstractListPageViewModel } from "../abstract_list.page.vm.js"
import { userApi, pageHelper, userHelper } from "@aprexis/aprexis-api-utility"
import { filtersHelper, pathHelper } from "../../../../helpers/index.js"

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

const userListMethods = [
  { pathKey: 'health-plans', method: userApi.indexForHealthPlan },
  { method: userApi.index }
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

  filterDescriptions(_filters, _filtersOptions) {
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
    this.removeField("userHeaders")
    this.fetchList(
      userListMethods,
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
  }

  title() {
    return "Users"
  }
}

export { UsersPageViewModel }
