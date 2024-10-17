import { AbstractListPageViewModel } from "../../.."
import { goldStandardGenericProductApi, pageHelper, valueHelper } from "@aprexis/aprexis-api-utility"
import { apiEnvironmentHelper, filtersHelper, pathHelper, userCredentialsHelper } from "../../../../../../helpers"

class GenericProductsPageViewModel extends AbstractListPageViewModel {
  constructor(props) {
    super(props)

    this.defaultParameters = this.defaultParameters.bind(this)
    this.filterDescriptions = this.filterDescriptions.bind(this)
    this.filtersOptions = this.filtersOptions.bind(this)
    this.gotoGenericProductProfile = this.gotoGenericProductProfile.bind(this)
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
      filtersHelper.stringFilter("Name or Synonym", "for_generic_product")
    ]
  }

  filtersOptions() {
    return {}
  }

  gotoGenericProductProfile(genericProduct) {
    const pathArray = pathHelper.buildPathArray(window.location, { model: genericProduct, idField: 'generic_product_id' }, "profile")

    pathHelper.gotoPage(pathArray)
  }

  loadData() {
    this.clearData()
    this.defaultParameters()
    this.refreshData()
  }

  refreshData() {
    const userCredentials = userCredentialsHelper.get()
    this.removeField("genericProductHeaders")
    const pathEntries = this.pathEntries()
    const generic_product_clinical_id = pathEntries["generic-product-clinicals"].value
    const { filters, sorting, page } = this.data

    if (valueHelper.isNumberValue(generic_product_clinical_id)) {
      goldStandardGenericProductApi.listForGenericProductClinical(
        apiEnvironmentHelper.apiEnvironment(userCredentials, this.props.reconnectAndRetry),
        generic_product_clinical_id,
        { ...filters, ...sorting, page },
        (genericProducts, genericProductHeaders) => {
          this.addData(
            {
              genericProducts,
              page: pageHelper.updatePageFromLastPage(genericProductHeaders)
            },
            this.redrawView
          )
        },
        this.onError
      )
      return
    }

    goldStandardGenericProductApi.list(
      apiEnvironmentHelper.apiEnvironment(userCredentials, this.props.reconnectAndRetry),
      { ...filters, ...sorting, page },
      (genericProducts, genericProductHeaders) => {
        this.addData(
          {
            genericProducts,
            page: pageHelper.updatePageFromLastPage(genericProductHeaders)
          },
          this.redrawView
        )
      },
      this.onError
    )
  }

  title() {
    return "Generic Products"
  }
}

export { GenericProductsPageViewModel }
