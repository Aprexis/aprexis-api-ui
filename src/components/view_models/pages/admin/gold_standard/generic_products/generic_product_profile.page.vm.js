import { AbstractPageViewModel } from "../../../abstract.page.vm.js"
import { goldStandardGenericProductApi, goldStandardGenericProductHelper } from "@aprexis/aprexis-api-utility"
import { apiEnvironmentHelper, pathHelper, userCredentialsHelper } from "../../../../../../helpers/index.js"

class GenericProductProfilePageViewModel extends AbstractPageViewModel {
  constructor(props) {
    super(props)

    this.gotoGenericProductClinical = this.gotoGenericProductClinical.bind(this)
    this.loadData = this.loadData.bind(this)
  }

  gotoGenericProductClinical(goldStandardGenericProduct) {
    pathHelper.gotoPage(
      ["admin", "gold-standard", "generic-product-clinicals", goldStandardGenericProductHelper.goldStandardGenericProductClinicalId(goldStandardGenericProduct), "profile"]
    )
  }

  loadData() {
    this.clearData(false)

    const userCredentials = userCredentialsHelper.get()
    const pathEntries = this.pathEntries()
    const generic_product_id = pathHelper.pathEntryValue(pathEntries, "generic-products")

    goldStandardGenericProductApi.profile(
      apiEnvironmentHelper.apiEnvironment(userCredentials, this.props.reconnectAndRetry),
      generic_product_id,
      (genericProduct) => { this.addField("genericProduct", genericProduct, this.redrawView) },
      this.onError
    )
  }
}

export { GenericProductProfilePageViewModel }
