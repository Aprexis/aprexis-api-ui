import { AbstractPageViewModel } from "../../.."
import { goldStandardDrugItemApi, goldStandardDrugItemHelper } from "@aprexis/aprexis-api-utility"
import { apiEnvironmentHelper, pathHelper, userCredentialsHelper } from "../../../../../../helpers"

class DrugItemProfilePageViewModel extends AbstractPageViewModel {
  constructor(props) {
    super(props)

    this.gotoProduct = this.gotoProduct.bind(this)
    this.loadData = this.loadData.bind(this)
  }

  gotoProduct(goldStandardDrugItem) {
    pathHelper.gotoPage(
      ["admin", "gold-standard", "products", goldStandardDrugItemHelper.goldStandardProductId(goldStandardDrugItem), "profile"]
    )
  }

  loadData() {
    this.clearData(false)

    const userCredentials = userCredentialsHelper.get()
    const pathEntries = this.pathEntries()
    const drug_item_id = pathHelper.pathEntryValue(pathEntries, "drug-items")

    goldStandardDrugItemApi.profile(
      apiEnvironmentHelper.apiEnvironment(userCredentials, this.props.reconnectAndRetry),
      drug_item_id,
      (drugItem) => { this.addField("drugItem", drugItem, this.redrawView) },
      this.onError
    )
  }
}

export { DrugItemProfilePageViewModel }
