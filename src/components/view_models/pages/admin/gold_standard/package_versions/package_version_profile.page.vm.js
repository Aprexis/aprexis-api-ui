import { AbstractPageViewModel } from "../../.."
import { goldStandardPackageVersionApi, goldStandardPackageVersionHelper } from "@aprexis/aprexis-api-utility"
import { apiEnvironmentHelper, pathHelper, userCredentialsHelper } from "../../../../../../helpers"

class PackageVersionProfilePageViewModel extends AbstractPageViewModel {
  constructor(props) {
    super(props)

    this.gotoPackage = this.gotoPackage.bind(this)
    this.gotoProduct = this.gotoProduct.bind(this)
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

  gotoProduct(goldStandardPackageVersion) {
    pathHelper.gotoPage(
      [
        "admin",
        "gold-standard",
        "products",
        goldStandardPackageVersionHelper.goldStandardProductId(goldStandardPackageVersion),
        "profile"]
    )
  }

  loadData() {
    this.clearData(false)

    const userCredentials = userCredentialsHelper.get()
    const pathEntries = this.pathEntries()
    const package_id = pathHelper.pathEntryValue(pathEntries, "packages")
    const version = pathHelper.pathEntryValue(pathEntries, "package-versions")

    goldStandardPackageVersionApi.profileForPackage(
      apiEnvironmentHelper.apiEnvironment(userCredentials, this.props.reconnectAndRetry),
      package_id,
      version,
      (packageVersion) => { this.addField("packageVersion", packageVersion, this.redrawView) },
      this.onError
    )
  }
}

export { PackageVersionProfilePageViewModel }
