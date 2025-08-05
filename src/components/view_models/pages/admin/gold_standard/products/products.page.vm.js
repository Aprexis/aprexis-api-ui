import { AbstractListPageViewModel } from "../../../abstract_list.page.vm.js"
import { goldStandardProductApi, pageHelper, valueHelper } from "@aprexis/aprexis-api-utility"
import { apiEnvironmentHelper, filtersHelper, pathHelper, userCredentialsHelper } from "../../../../../../helpers/index.js"

class ProductsPageViewModel extends AbstractListPageViewModel {
  constructor(props) {
    super(props)

    this.defaultParameters = this.defaultParameters.bind(this)
    this.filterDescriptions = this.filterDescriptions.bind(this)
    this.filtersOptions = this.filtersOptions.bind(this)
    this.gotoProductProfile = this.gotoProductProfile.bind(this)
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
      filtersHelper.stringFilter("Name", "for_product"),
      filtersHelper.stringFilter("NDC", "for_ndc")
    ]
  }

  filtersOptions() {
    return {}
  }

  gotoProductProfile(Product) {
    const pathArray = pathHelper.buildPathArray(window.location, { model: Product, idField: 'product_id' }, "profile")

    pathHelper.gotoPage(pathArray)
  }

  loadData() {
    this.clearData()
    this.defaultParameters()
    this.refreshData()
  }

  refreshData() {
    const userCredentials = userCredentialsHelper.get()
    this.removeField("productHeaders")
    const pathEntries = this.pathEntries()
    const marketed_product_id = pathHelper.pathEntryValue(pathEntries, "marketed-products")
    const { filters, sorting, page } = this.data

    if (valueHelper.isNumberValue(marketed_product_id)) {
      goldStandardProductApi.listForMarketedProduct(
        apiEnvironmentHelper.apiEnvironment(userCredentials, this.props.reconnectAndRetry),
        marketed_product_id,
        { ...filters, ...sorting, page },
        (Products, ProductHeaders) => {
          this.addData(
            {
              Products,
              page: pageHelper.updatePageFromLastPage(ProductHeaders)
            },
            this.redrawView
          )
        },
        this.onError
      )
      return
    }

    goldStandardProductApi.list(
      apiEnvironmentHelper.apiEnvironment(userCredentials, this.props.reconnectAndRetry),
      { ...filters, ...sorting, page },
      (Products, ProductHeaders) => {
        this.addData(
          {
            Products,
            page: pageHelper.updatePageFromLastPage(ProductHeaders)
          },
          this.redrawView
        )
      },
      this.onError
    )
  }

  title() {
    return "Products"
  }
}

export { ProductsPageViewModel }
