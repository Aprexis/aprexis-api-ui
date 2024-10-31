import { AbstractPageViewModel } from "../../../.."
import { goldStandardDrugItemInactiveIngredientApi, goldStandardDrugItemInactiveIngredientHelper } from "@aprexis/aprexis-api-utility"
import { apiEnvironmentHelper, pathHelper, userCredentialsHelper } from "../../../../../../../helpers"

class DrugItemInactiveIngredientProfilePageViewModel extends AbstractPageViewModel {
  constructor(props) {
    super(props)

    this.gotoDrugItem = this.gotoDrugItem.bind(this)
    this.loadData = this.loadData.bind(this)
  }

  gotoDrugItem(goldStandardDrugItemInactiveIngredient) {
    pathHelper.gotoPage(
      ["admin", "gold-standard", "drug-items", goldStandardDrugItemInactiveIngredientHelper.goldStandardDrugItemId(goldStandardDrugItemInactiveIngredient), "profile"]
    )
  }

  loadData() {
    this.clearData(false)

    const userCredentials = userCredentialsHelper.get()
    const pathEntries = this.pathEntries()
    const drug_item_id = pathHelper.pathEntryValue(pathEntries, "drug-items")
    const drug_item_inactive_ingredient_id = pathHelper.pathEntryValue(pathEntries, "drug-item-inactive-ingredients")

    goldStandardDrugItemInactiveIngredientApi.profileForDrugItem(
      apiEnvironmentHelper.apiEnvironment(userCredentials, this.props.reconnectAndRetry),
      drug_item_id,
      drug_item_inactive_ingredient_id,
      (drugItemInactiveIngredient) => { this.addField("drugItemInactiveIngredient", drugItemInactiveIngredient, this.redrawView) },
      this.onError
    )
  }
}

export { DrugItemInactiveIngredientProfilePageViewModel }
