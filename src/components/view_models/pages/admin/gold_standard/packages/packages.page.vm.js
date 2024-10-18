import { AbstractListPageViewModel } from "../../.."
import { goldStandardPackageApi, pageHelper, valueHelper } from "@aprexis/aprexis-api-utility"
import { apiEnvironmentHelper, filtersHelper, pathHelper, userCredentialsHelper } from "../../../../../../helpers"

class PackagesPageViewModel extends AbstractListPageViewModel {
  constructor(props) {
    super(props)

    this.defaultParameters = this.defaultParameters.bind(this)
    this.filterDescriptions = this.filterDescriptions.bind(this)
    this.filtersOptions = this.filtersOptions.bind(this)
    this.gotoPackageProfile = this.gotoPackageProfile.bind(this)
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
      filtersHelper.stringFilter("Name", "for_package")
    ]
  }

  filtersOptions() {
    return {}
  }

  gotoPackageProfile(Package) {
    const pathArray = pathHelper.buildPathArray(window.location, { model: Package, idField: 'package_id' }, "profile")

    pathHelper.gotoPage(pathArray)
  }

  loadData() {
    this.clearData()
    this.defaultParameters()
    this.refreshData()
  }

  refreshData() {
    const userCredentials = userCredentialsHelper.get()
    this.removeField("packageHeaders")
    const pathEntries = this.pathEntries()
    const product_id = pathEntries["products"].value
    const { filters, sorting, page } = this.data

    if (valueHelper.isNumberValue(product_id)) {
      goldStandardPackageApi.listForProduct(
        apiEnvironmentHelper.apiEnvironment(userCredentials, this.props.reconnectAndRetry),
        product_id,
        { ...filters, ...sorting, page },
        (Packages, PackageHeaders) => {
          this.addData(
            {
              Packages,
              page: pageHelper.updatePageFromLastPage(PackageHeaders)
            },
            this.redrawView
          )
        },
        this.onError
      )
      return
    }

    goldStandardPackageApi.list(
      apiEnvironmentHelper.apiEnvironment(userCredentials, this.props.reconnectAndRetry),
      { ...filters, ...sorting, page },
      (Packages, PackageHeaders) => {
        this.addData(
          {
            Packages,
            page: pageHelper.updatePageFromLastPage(PackageHeaders)
          },
          this.redrawView
        )
      },
      this.onError
    )
  }

  title() {
    return "Packages"
  }
}

export { PackagesPageViewModel }
