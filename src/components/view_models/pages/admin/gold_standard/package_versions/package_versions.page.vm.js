import { AbstractListPageViewModel } from "../../.."
import { goldStandardPackageVersionApi, pageHelper, valueHelper } from "@aprexis/aprexis-api-utility"
import { apiEnvironmentHelper, filtersHelper, pathHelper, userCredentialsHelper } from "../../../../../../helpers"

class PackageVersionsPageViewModel extends AbstractListPageViewModel {
  constructor(props) {
    super(props)

    this.defaultParameters = this.defaultParameters.bind(this)
    this.filterDescriptions = this.filterDescriptions.bind(this)
    this.filtersOptions = this.filtersOptions.bind(this)
    this.gotoPackageVersionProfile = this.gotoPackageVersionProfile.bind(this)
    this.loadData = this.loadData.bind(this)
    this.refreshData = this.refreshData.bind(this)
    this.title = this.title.bind(this)
  }

  defaultParameters() {
    const filters = {}
    const sorting = { sort: "name" }
    this.addData({ filters, sorting, page: this.defaultPage() })
  }

  filterDescriptions(_filters, _filtersOptions) {
    return [
      filtersHelper.stringFilter("version", "for_package_version")
    ]
  }

  filtersOptions() {
    return {}
  }

  gotoPackageVersionProfile(PackageVersion) {
    const pathArray = pathHelper.buildPathArray(window.location, { model: PackageVersion, idField: 'version' }, "profile")

    pathHelper.gotoPage(pathArray)
  }

  loadData() {
    this.clearData()
    this.defaultParameters()
    this.refreshData()
  }

  refreshData() {
    const userCredentials = userCredentialsHelper.get()
    this.removeField("packageVersionHeaders")
    const pathEntries = this.pathEntries()
    const package_id = pathEntries["packages"].value
    const { filters, sorting, page } = this.data

    if (valueHelper.isNumberValue(package_id)) {
      goldStandardPackageVersionApi.listForPackage(
        apiEnvironmentHelper.apiEnvironment(userCredentials, this.props.reconnectAndRetry),
        package_id,
        { ...filters, ...sorting, page },
        (packageVersions, packageVersionHeaders) => {
          this.addData(
            {
              packageVersions,
              page: pageHelper.updatePageFromLastPage(packageVersionHeaders)
            },
            this.redrawView
          )
        },
        this.onError
      )
      return
    }

    goldStandardPackageVersionApi.list(
      apiEnvironmentHelper.apiEnvironment(userCredentials, this.props.reconnectAndRetry),
      { ...filters, ...sorting, page },
      (packageVersions, packageVersionHeaders) => {
        this.addData(
          {
            packageVersions,
            page: pageHelper.updatePageFromLastPage(packageVersionHeaders)
          },
          this.redrawView
        )
      },
      this.onError
    )
  }

  title() {
    return "Package Versions"
  }
}

export { PackageVersionsPageViewModel }
