import { AbstractPageViewModel } from "../../../"
import { goldStandardSpecificDrugProductApi, goldStandardSpecificDrugProductHelper } from "@aprexis/aprexis-api-utility"
import { apiEnvironmentHelper, pathHelper, userCredentialsHelper } from "../../../../../../helpers"

class SpecificDrugProductProfilePageViewModel extends AbstractPageViewModel {
  constructor(props) {
    super(props)

    this.gotoGenericProduct = this.gotoGenericProduct.bind(this)
    this.loadData = this.loadData.bind(this)
  }

  gotoGenericProduct(goldStandardSpecificDrugProduct) {
    pathHelper.gotoPage(
      ["admin", "gold-standard", "generic-products", goldStandardSpecificDrugProductHelper.goldStandardGenericProductId(goldStandardSpecificDrugProduct), "profile"]
    )
  }

  loadData() {
    this.clearData(false)

    const userCredentials = userCredentialsHelper.get()
    const pathEntries = this.pathEntries()
    const specific_drug_product_id = pathHelper.pathEntryValue(pathEntries, "specific-drug-products")

    goldStandardSpecificDrugProductApi.profile(
      apiEnvironmentHelper.apiEnvironment(userCredentials, this.props.reconnectAndRetry),
      specific_drug_product_id,
      (specificDrugProduct) => { this.addField("specificDrugProduct", specificDrugProduct, this.redrawView) },
      this.onError
    )
  }
}

export { SpecificDrugProductProfilePageViewModel }
