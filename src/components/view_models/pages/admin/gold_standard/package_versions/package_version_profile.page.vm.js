import { AbstractPageViewModel } from "../../.."
import { goldStandardPackageVersionApi, goldStandardPackageVersionHelper } from "@aprexis/aprexis-api-utility"
import { apiEnvironmentHelper, pathHelper, userCredentialsHelper } from "../../../../../../helpers"

class PackageVersionProfilePageViewModel extends AbstractPageViewModel {
  constructor(props) {
    super(props)

    this.gotoPackage = this.gotoPackage.bind(this)
    this.loadData = this.loadData.bind(this)
  }

  gotoPackage(goldStandardPackageVersion) {
    pathHelper.gotoPage(
      [
        "admin",
        "gold-standard",
        "packages",
        goldStandardPackageVersionHelper.goldStandardPackageId(goldStandardPackageVersion),
        "profile"]
    )
  }

  loadData() {
    this.clearData(false)

    const userCredentials = userCredentialsHelper.get()
    const pathEntries = this.pathEntries()
    const package_id = pathHelper.pathEntryValue(pathEntries, "packages")
    const version = pathHelper.pathEntryValue(pathEntries, "package-versions")

    goldStandardPackageVersionApi.profile(
      apiEnvironmentHelper.apiEnvironment(userCredentials, this.props.reconnectAndRetry),
      package_id,
      version,
      (PackageVersion) => { this.addField("PackageVersion", PackageVersion, this.redrawView) },
      this.onError
    )
  }
}

export { PackageVersionProfilePageViewModel }
