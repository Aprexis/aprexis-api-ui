import { AbstractPageViewModel } from "../../.."
import { goldStandardPackageApi, goldStandardPackageHelper } from "@aprexis/aprexis-api-utility"
import { apiEnvironmentHelper, pathHelper, userCredentialsHelper } from "../../../../../../helpers"

class PackageProfilePageViewModel extends AbstractPageViewModel {
  constructor(props) {
    super(props)

    this.gotoProduct = this.gotoProduct.bind(this)
    this.loadData = this.loadData.bind(this)
  }

  gotoProduct(goldStandardPackage) {
    pathHelper.gotoPage(
      ["admin", "gold-standard", "products", goldStandardPackageHelper.goldStandardProductId(goldStandardPackage), "profile"]
    )
  }

  loadData() {
    this.clearData(false)

    const userCredentials = userCredentialsHelper.get()
    const pathEntries = this.pathEntries()
    const package_id = pathEntries["packages"].value

    goldStandardPackageApi.profile(
      apiEnvironmentHelper.apiEnvironment(userCredentials, this.props.reconnectAndRetry),
      package_id,
      (gsPackage) => { this.addField("gsPackage", gsPackage, this.redrawView) },
      this.onError
    )
  }
}

export { PackageProfilePageViewModel }
