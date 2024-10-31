import { AbstractPageViewModel } from "../../../../"
import { goldStandardDrugItemActiveIngredientApi, goldStandardDrugItemActiveIngredientHelper } from "@aprexis/aprexis-api-utility"
import { apiEnvironmentHelper, pathHelper, userCredentialsHelper } from "../../../../../../../helpers"

class DrugItemActiveIngredientProfilePageViewModel extends AbstractPageViewModel {
  constructor(props) {
    super(props)

    this.gotoDrugItem = this.gotoDrugItem.bind(this)
    this.loadData = this.loadData.bind(this)
  }

  gotoDrugItem(goldStandardDrugItemActiveIngredient) {
    pathHelper.gotoPage(
      ["admin", "gold-standard", "drug-items", goldStandardDrugItemActiveIngredientHelper.goldStandardDrugItemId(goldStandardDrugItemActiveIngredient), "profile"]
    )
  }

  loadData() {
    this.clearData(false)

    const userCredentials = userCredentialsHelper.get()
    const pathEntries = this.pathEntries()
    const drug_item_id = pathHelper.pathEntryValue(pathEntries, "drug-items")
    const drug_item_active_ingredient_id = pathHelper.pathEntryValue(pathEntries, "drug-item-active-ingredients")

    goldStandardDrugItemActiveIngredientApi.profileForDrugItem(
      apiEnvironmentHelper.apiEnvironment(userCredentials, this.props.reconnectAndRetry),
      drug_item_id,
      drug_item_active_ingredient_id,
      (drugItemActiveIngredient) => { this.addField("drugItemActiveIngredient", drugItemActiveIngredient, this.redrawView) },
      this.onError
    )
  }
}

export { DrugItemActiveIngredientProfilePageViewModel }
