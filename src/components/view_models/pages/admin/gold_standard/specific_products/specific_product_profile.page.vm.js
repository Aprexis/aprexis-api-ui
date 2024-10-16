import { AbstractPageViewModel } from "../../../"
import { goldStandardSpecificProductApi, goldStandardSpecificProductHelper } from "@aprexis/aprexis-api-utility"
import { apiEnvironmentHelper, pathHelper, userCredentialsHelper } from "../../../../../../helpers"

class SpecificProductProfilePageViewModel extends AbstractPageViewModel {
  constructor(props) {
    super(props)

    this.gotoSpecificDrugProduct = this.gotoSpecificDrugProduct.bind(this)
    this.loadData = this.loadData.bind(this)
  }

  gotoSpecificDrugProduct(goldStandardSpecificProduct) {
    pathHelper.gotoPage(
      ["admin", "gold-standard", "specific-drug-products", goldStandardSpecificProductHelper.goldStandardSpecificDrugProductId(goldStandardSpecificProduct), "profile"]
    )
  }

  loadData() {
    this.clearData(false)

    const userCredentials = userCredentialsHelper.get()
    const pathEntries = this.pathEntries()
    const specific_product_id = pathEntries["specific-products"].value

    goldStandardSpecificProductApi.profile(
      apiEnvironmentHelper.apiEnvironment(userCredentials, this.props.reconnectAndRetry),
      specific_product_id,
      (specificProduct) => { this.addField("specificProduct", specificProduct, this.redrawView) },
      this.onError
    )
  }
}

export { SpecificProductProfilePageViewModel }
