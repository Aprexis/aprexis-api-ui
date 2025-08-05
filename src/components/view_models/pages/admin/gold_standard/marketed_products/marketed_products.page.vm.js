import { AbstractListPageViewModel } from "../../../abstract_list.page.vm.js"
import { goldStandardMarketedProductApi, pageHelper, valueHelper } from "@aprexis/aprexis-api-utility"
import { apiEnvironmentHelper, filtersHelper, pathHelper, userCredentialsHelper } from "../../../../../../helpers/index.js"

class MarketedProductsPageViewModel extends AbstractListPageViewModel {
  constructor(props) {
    super(props)

    this.defaultParameters = this.defaultParameters.bind(this)
    this.filterDescriptions = this.filterDescriptions.bind(this)
    this.filtersOptions = this.filtersOptions.bind(this)
    this.gotoMarketedProductProfile = this.gotoMarketedProductProfile.bind(this)
    this.loadData = this.loadData.bind(this)
    this.refreshData = this.refreshData.bind(this)
    this.title = this.title.bind(this)
  }

  defaultParameters() {
    const filters = {}
    const sorting = { sort: "name" }
    this.addData({ filters, sorting, page: this.defaultPage() })
  }

  filterDescriptions(_filters, _filtersOptions) {
    return [
      filtersHelper.stringFilter("Name", "for_marketed_product")
    ]
  }

  filtersOptions() {
    return {}
  }

  gotoMarketedProductProfile(marketedProduct) {
    const pathArray = pathHelper.buildPathArray(window.location, { model: marketedProduct, idField: 'marketed_product_id' }, "profile")

    pathHelper.gotoPage(pathArray)
  }

  loadData() {
    this.clearData()
    this.defaultParameters()
    this.refreshData()
  }

  refreshData() {
    const userCredentials = userCredentialsHelper.get()
    this.removeField("marketedProductHeaders")
    const pathEntries = this.pathEntries()
    const specific_product_id = pathHelper.pathEntryValue(pathEntries, "specific-products")
    const { filters, sorting, page } = this.data

    if (valueHelper.isNumberValue(specific_product_id)) {
      goldStandardMarketedProductApi.listForSpecificProduct(
        apiEnvironmentHelper.apiEnvironment(userCredentials, this.props.reconnectAndRetry),
        specific_product_id,
        { ...filters, ...sorting, page },
        (marketedProducts, marketedProductHeaders) => {
          this.addData(
            {
              marketedProducts,
              page: pageHelper.updatePageFromLastPage(marketedProductHeaders)
            },
            this.redrawView
          )
        },
        this.onError
      )
      return
    }

    goldStandardMarketedProductApi.list(
      apiEnvironmentHelper.apiEnvironment(userCredentials, this.props.reconnectAndRetry),
      { ...filters, ...sorting, page },
      (marketedProducts, marketedProductHeaders) => {
        this.addData(
          {
            marketedProducts,
            page: pageHelper.updatePageFromLastPage(marketedProductHeaders)
          },
          this.redrawView
        )
      },
      this.onError
    )
  }

  title() {
    return "Marketed Products"
  }
}

export { MarketedProductsPageViewModel }
