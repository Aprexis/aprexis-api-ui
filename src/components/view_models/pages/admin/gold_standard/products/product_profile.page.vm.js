import { AbstractPageViewModel } from "../../.."
import { goldStandardProductApi, goldStandardProductHelper } from "@aprexis/aprexis-api-utility"
import { apiEnvironmentHelper, pathHelper, userCredentialsHelper } from "../../../../../../helpers"

class ProductProfilePageViewModel extends AbstractPageViewModel {
  constructor(props) {
    super(props)

    this.gotoProduct = this.gotoProduct.bind(this)
    this.loadData = this.loadData.bind(this)
  }

  gotoProduct(goldStandardProduct) {
    pathHelper.gotoPage(
      ["admin", "gold-standard", "products", goldStandardProductHelper.goldStandardProductId(goldStandardProduct), "profile"]
    )
  }

  loadData() {
    this.clearData(false)

    const userCredentials = userCredentialsHelper.get()
    const pathEntries = this.pathEntries()
    const product_id = pathHelper.pathEntryValue(pathEntries, "products")

    goldStandardProductApi.profile(
      apiEnvironmentHelper.apiEnvironment(userCredentials, this.props.reconnectAndRetry),
      product_id,
      (product) => { this.addField("product", product, this.redrawView) },
      this.onError
    )
  }
}

export { ProductProfilePageViewModel }
