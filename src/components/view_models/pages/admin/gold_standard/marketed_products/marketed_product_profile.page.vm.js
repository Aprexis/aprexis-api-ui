import { AbstractPageViewModel } from "../../.."
import { goldStandardMarketedProductApi, goldStandardMarketedProductHelper } from "@aprexis/aprexis-api-utility"
import { apiEnvironmentHelper, pathHelper, userCredentialsHelper } from "../../../../../../helpers"

class MarketedProductProfilePageViewModel extends AbstractPageViewModel {
  constructor(props) {
    super(props)

    this.gotSpecificProduct = this.gotoSpecificProduct.bind(this)
    this.loadData = this.loadData.bind(this)
  }

  gotoSpecificProduct(goldStandardMarketedProduct) {
    pathHelper.gotoPage(
      ["admin", "gold-standard", "specific-products", goldStandardMarketedProductHelper.goldStandardSpecificProductId(goldStandardMarketedProduct), "profile"]
    )
  }

  loadData() {
    this.clearData(false)

    const userCredentials = userCredentialsHelper.get()
    const pathEntries = this.pathEntries()
    const marketed_product_id = pathEntries["marketed-products"].value

    goldStandardMarketedProductApi.profile(
      apiEnvironmentHelper.apiEnvironment(userCredentials, this.props.reconnectAndRetry),
      marketed_product_id,
      (marketedProduct) => { this.addField("marketedProduct", marketedProduct, this.redrawView) },
      this.onError
    )
  }
}

export { MarketedProductProfilePageViewModel }
