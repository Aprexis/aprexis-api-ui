import { AbstractListPageViewModel } from "../../../.."
import { goldStandardDrugItemInactiveIngredientApi, pageHelper } from "@aprexis/aprexis-api-utility"
import { apiEnvironmentHelper, pathHelper, userCredentialsHelper } from "../../../../../../../helpers"

class DrugItemInactiveIngredientsPageViewModel extends AbstractListPageViewModel {
  constructor(props) {
    super(props)

    this.defaultParameters = this.defaultParameters.bind(this)
    this.filterDescriptions = this.filterDescriptions.bind(this)
    this.filtersOptions = this.filtersOptions.bind(this)
    this.gotoDrugItemInactiveIngredientProfile = this.gotoDrugItemInactiveIngredientProfile.bind(this)
    this.loadData = this.loadData.bind(this)
    this.refreshData = this.refreshData.bind(this)
    this.title = this.title.bind(this)
  }

  defaultParameters() {
    const filters = {}
    const sorting = { sort: "" }
    this.addData({ filters, sorting, page: this.defaultPage() })
  }

  filterDescriptions(_filters, _filtersOptions) {
    return []
  }

  filtersOptions() {
    return {}
  }

  gotoDrugItemInactiveIngredientProfile(drugItemInactiveIngredient) {
    const pathArray = pathHelper.buildPathArray(window.location, { model: drugItemInactiveIngredient, association: 'ingredient', idField: 'ingredient_id' }, "profile")

    pathHelper.gotoPage(pathArray)
  }

  loadData() {
    this.clearData()
    this.defaultParameters()
    this.refreshData()
  }

  refreshData() {
    const userCredentials = userCredentialsHelper.get()
    this.removeField("drugItemInactiveIngredientHeaders")
    const pathEntries = this.pathEntries()
    const drug_item_id = pathHelper.pathEntryValue(pathEntries, "drug-items")
    const { filters, sorting, page } = this.data

    goldStandardDrugItemInactiveIngredientApi.listForDrugItem(
      apiEnvironmentHelper.apiEnvironment(userCredentials, this.props.reconnectAndRetry),
      drug_item_id,
      { ...filters, ...sorting, page },
      (drugItemInactiveIngredients, drugItemInactiveIngredientHeaders) => {
        this.addData(
          {
            drugItemInactiveIngredients,
            page: pageHelper.updatePageFromLastPage(drugItemInactiveIngredientHeaders)
          },
          this.redrawView
        )
      },
      this.onError
    )
  }


  title() {
    return "Drug Item Inactive Ingredients"
  }
}

export { DrugItemInactiveIngredientsPageViewModel }
