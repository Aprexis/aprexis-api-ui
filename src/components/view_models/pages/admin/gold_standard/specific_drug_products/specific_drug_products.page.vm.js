import { AbstractListPageViewModel } from "../../.."
import { goldStandardSpecificDrugProductApi, pageHelper, valueHelper } from "@aprexis/aprexis-api-utility"
import { apiEnvironmentHelper, filtersHelper, pathHelper, userCredentialsHelper } from "../../../../../../helpers"

class SpecificDrugProductsPageViewModel extends AbstractListPageViewModel {
  constructor(props) {
    super(props)

    this.defaultParameters = this.defaultParameters.bind(this)
    this.filterDescriptions = this.filterDescriptions.bind(this)
    this.filtersOptions = this.filtersOptions.bind(this)
    this.gotoSpecificDrugProductProfile = this.gotoSpecificDrugProductProfile.bind(this)
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
      filtersHelper.stringFilter("Name or Synonym", "for_specific_drug_product")
    ]
  }

  filtersOptions() {
    return {}
  }

  gotoSpecificDrugProductProfile(specificProduct) {
    const pathArray = pathHelper.buildPathArray(window.location, { model: specificProduct, idField: 'specific_drug_product_id' }, "profile")

    pathHelper.gotoPage(pathArray)
  }

  loadData() {
    this.clearData()
    this.defaultParameters()
    this.refreshData()
  }

  refreshData() {
    const userCredentials = userCredentialsHelper.get()
    this.removeField("specificDrugProductHeaders")
    const pathEntries = this.pathEntries()
    const generic_product_id = pathEntries["generic-products"].value
    const { filters, sorting, page } = this.data

    if (valueHelper.isNumberValue(generic_product_id)) {
      goldStandardSpecificDrugProductApi.listForGenericProduct(
        apiEnvironmentHelper.apiEnvironment(userCredentials, this.props.reconnectAndRetry),
        generic_product_id,
        { ...filters, ...sorting, page },
        (specificDrugProducts, specificDrugProductHeaders) => {
          this.addData(
            {
              specificDrugProducts,
              page: pageHelper.updatePageFromLastPage(specificDrugProductHeaders)
            },
            this.redrawView
          )
        },
        this.onError
      )
    }

    goldStandardSpecificDrugProductApi.list(
      apiEnvironmentHelper.apiEnvironment(userCredentials, this.props.reconnectAndRetry),
      { ...filters, ...sorting, page },
      (specificDrugProducts, specificDrugProductHeaders) => {
        this.addData(
          {
            specificDrugProducts,
            page: pageHelper.updatePageFromLastPage(specificDrugProductHeaders)
          },
          this.redrawView
        )
      },
      this.onError
    )
  }

  title() {
    return "Specific Drug Products"
  }
}

export { SpecificDrugProductsPageViewModel }
