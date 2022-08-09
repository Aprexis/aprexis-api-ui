import { AbstractListPageViewModel } from "../.."
import { systemSettingApi, pageHelper, systemSettingHelper } from "@aprexis/aprexis-api-utility"
import { apiEnvironmentHelper, userCredentialsHelper } from "../../../../../helpers"

class SystemSettingsPageViewModel extends AbstractListPageViewModel {
  constructor(props) {
    super(props)

    this.api = this.api.bind(this)
    this.defaultParameters = this.defaultParameters.bind(this)
    this.filterDescriptions = this.filterDescriptions.bind(this)
    this.filtersOptions = this.filtersOptions.bind(this)
    //this.gotoSettingProfile = this.gotoSettingProfile.bind(this)
    this.helper = this.helper.bind(this)
    this.loadData = this.loadData.bind(this)
    this.refreshData = this.refreshData.bind(this)
    this.title = this.title.bind(this)
  }

  api() {
    return systemSettingApi
  }

  defaultParameters() {
    const filters = {}
    const sorting = { sort: "key" }
    this.addData({ filters, sorting, page: this.defaultPage() })
  }

  filterDescriptions(_filters, _filtersOptions) {
    return []
  }

  filtersOptions() {
    return {}
  }

  /*
  gotoSettingProfile(systemSetting) {
    const pathArray = pathHelper.buildPathArray(window.location, systemSetting, "profile")

    pathHelper.gotoPage(pathArray)
  }
  */

  helper() {
    return systemSettingHelper
  }

  loadData() {
    this.clearData()
    this.defaultParameters()
    this.refreshData()
  }

  refreshData() {
    const userCredentials = userCredentialsHelper.get()
    this.removeField("systemSettingHeaders")
    const { filters, sorting, page } = this.data

    this.api().index(
      apiEnvironmentHelper.apiEnvironment(userCredentials),
      { ...filters, ...sorting, page },
      (systemSettings, systemSettingHeaders) => {
        this.addData(
          {
            systemSettings,
            page: pageHelper.updatePageFromLastPage(systemSettingHeaders)
          },
          this.redrawView
        )
      },
      this.onError
    )
  }

  title() {
    return "System Settings"
  }
}

export { SystemSettingsPageViewModel }
