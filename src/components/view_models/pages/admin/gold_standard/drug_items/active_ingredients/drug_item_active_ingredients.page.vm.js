import { AbstractListPageViewModel } from "../../../../abstract_list.page.vm.js"
import { goldStandardDrugItemActiveIngredientApi, pageHelper } from "@aprexis/aprexis-api-utility"
import { apiEnvironmentHelper, pathHelper, userCredentialsHelper } from "../../../../../../../helpers/index.js"

class DrugItemActiveIngredientsPageViewModel extends AbstractListPageViewModel {
  constructor(props) {
    super(props)

    this.defaultParameters = this.defaultParameters.bind(this)
    this.filterDescriptions = this.filterDescriptions.bind(this)
    this.filtersOptions = this.filtersOptions.bind(this)
    this.gotoDrugItemActiveIngredientProfile = this.gotoDrugItemActiveIngredientProfile.bind(this)
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

  gotoDrugItemActiveIngredientProfile(drugItemActiveIngredient) {
    const pathArray = pathHelper.buildPathArray(window.location, { model: drugItemActiveIngredient, association: 'ingredient', idField: 'ingredient_id' }, "profile")

    pathHelper.gotoPage(pathArray)
  }

  loadData() {
    this.clearData()
    this.defaultParameters()
    this.refreshData()
  }

  refreshData() {
    const userCredentials = userCredentialsHelper.get()
    this.removeField("drugItemActiveIngredientHeaders")
    const pathEntries = this.pathEntries()
    const drug_item_id = pathHelper.pathEntryValue(pathEntries, "drug-items")
    const { filters, sorting, page } = this.data

    goldStandardDrugItemActiveIngredientApi.listForDrugItem(
      apiEnvironmentHelper.apiEnvironment(userCredentials, this.props.reconnectAndRetry),
      drug_item_id,
      { ...filters, ...sorting, page },
      (drugItemActiveIngredients, drugItemActiveIngredientHeaders) => {
        this.addData(
          {
            drugItemActiveIngredients,
            page: pageHelper.updatePageFromLastPage(drugItemActiveIngredientHeaders)
          },
          this.redrawView
        )
      },
      this.onError
    )
  }


  title() {
    return "Drug Item Active Ingredients"
  }
}

export { DrugItemActiveIngredientsPageViewModel }
