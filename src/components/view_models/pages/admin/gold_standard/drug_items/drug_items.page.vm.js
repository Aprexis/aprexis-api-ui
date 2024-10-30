import { AbstractListPageViewModel } from "../../.."
import { goldStandardDrugItemApi, pageHelper, valueHelper } from "@aprexis/aprexis-api-utility"
import { apiEnvironmentHelper, filtersHelper, pathHelper, userCredentialsHelper } from "../../../../../../helpers"

class DrugItemsPageViewModel extends AbstractListPageViewModel {
  constructor(props) {
    super(props)

    this.defaultParameters = this.defaultParameters.bind(this)
    this.filterDescriptions = this.filterDescriptions.bind(this)
    this.filtersOptions = this.filtersOptions.bind(this)
    this.gotoDrugItemProfile = this.gotoDrugItemProfile.bind(this)
    this.loadData = this.loadData.bind(this)
    this.refreshData = this.refreshData.bind(this)
    this.title = this.title.bind(this)
  }

  defaultParameters() {
    const filters = {}
    const sorting = { sort: "item_name_long" }
    this.addData({ filters, sorting, page: this.defaultPage() })
  }

  filterDescriptions(_filters, _filtersOptions) {
    return [
      filtersHelper.stringFilter("Name", "for_drug_item")
    ]
  }

  filtersOptions() {
    return {}
  }

  gotoDrugItemProfile(drugItem) {
    const pathArray = pathHelper.buildPathArray(window.location, { model: drugItem, idField: 'drug_item_id' }, "profile")

    pathHelper.gotoPage(pathArray)
  }

  loadData() {
    this.clearData()
    this.defaultParameters()
    this.refreshData()
  }

  refreshData() {
    const userCredentials = userCredentialsHelper.get()
    this.removeField("drugItemHeaders")
    const pathEntries = this.pathEntries()
    const product_id = pathHelper.pathEntryValue(pathEntries, "products")
    const { filters, sorting, page } = this.data

    if (valueHelper.isNumberValue(product_id)) {
      goldStandardDrugItemApi.listForProduct(
        apiEnvironmentHelper.apiEnvironment(userCredentials, this.props.reconnectAndRetry),
        product_id,
        { ...filters, ...sorting, page },
        (drugItems, drugItemHeaders) => {
          this.addData(
            {
              drugItems,
              page: pageHelper.updatePageFromLastPage(drugItemHeaders)
            },
            this.redrawView
          )
        },
        this.onError
      )
      return
    }

    goldStandardDrugItemApi.index(
      apiEnvironmentHelper.apiEnvironment(userCredentials, this.props.reconnectAndRetry),
      { ...filters, ...sorting, page },
      (drugItems, drugItemHeaders) => {
        this.addData(
          {
            drugItems,
            page: pageHelper.updatePageFromLastPage(drugItemHeaders)
          },
          this.redrawView
        )
      },
      this.onError
    )
  }

  title() {
    return "Drug Items"
  }
}

export { DrugItemsPageViewModel }
