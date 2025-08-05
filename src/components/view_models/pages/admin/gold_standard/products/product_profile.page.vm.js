import { AbstractPageViewModel } from "../../../abstract.page.vm.js"
import { goldStandardProductApi, goldStandardProductHelper } from "@aprexis/aprexis-api-utility"
import { apiEnvironmentHelper, pathHelper, userCredentialsHelper } from "../../../../../../helpers/index.js"

class ProductProfilePageViewModel extends AbstractPageViewModel {
  constructor(props) {
    super(props)

    this.gotoMarketedProduct = this.gotoMarketedProduct.bind(this)
    this.loadData = this.loadData.bind(this)
  }

  gotoMarketedProduct(goldStandardProduct) {
    pathHelper.gotoPage(
      ["admin", "gold-standard", "marketed-products", goldStandardProductHelper.goldStandardMarketedProductId(goldStandardProduct), "profile"]
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
