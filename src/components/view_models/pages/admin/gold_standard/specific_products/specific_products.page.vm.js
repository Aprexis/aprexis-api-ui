import { AbstractListPageViewModel } from "../../../abstract_list.page.vm.js"
import { goldStandardSpecificProductApi, pageHelper, valueHelper } from "@aprexis/aprexis-api-utility"
import { apiEnvironmentHelper, filtersHelper, pathHelper, userCredentialsHelper } from "../../../../../../helpers/index.js"

class SpecificProductsPageViewModel extends AbstractListPageViewModel {
  constructor(props) {
    super(props)

    this.defaultParameters = this.defaultParameters.bind(this)
    this.filterDescriptions = this.filterDescriptions.bind(this)
    this.filtersOptions = this.filtersOptions.bind(this)
    this.gotoSpecificProductProfile = this.gotoSpecificProductProfile.bind(this)
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
      filtersHelper.stringFilter("Name or Synonym", "for_specific_product")
    ]
  }

  filtersOptions() {
    return {}
  }

  gotoSpecificProductProfile(specificProduct) {
    const pathArray = pathHelper.buildPathArray(window.location, { model: specificProduct, idField: 'specific_product_id' }, "profile")

    pathHelper.gotoPage(pathArray)
  }

  loadData() {
    this.clearData()
    this.defaultParameters()
    this.refreshData()
  }

  refreshData() {
    const userCredentials = userCredentialsHelper.get()
    this.removeField("specificProductHeaders")
    const pathEntries = this.pathEntries()
    const specific_drug_product_id = pathHelper.pathEntryValue(pathEntries, "specific-drug-products")
    const therapeutic_concept_id = pathHelper.pathEntryValue(pathEntries, "therapeutic-concepts")
    const { filters, sorting, page } = this.data

    if (valueHelper.isNumberValue(specific_drug_product_id)) {
      goldStandardSpecificProductApi.listForSpecificDrugProduct(
        apiEnvironmentHelper.apiEnvironment(userCredentials, this.props.reconnectAndRetry),
        specific_drug_product_id,
        { ...filters, ...sorting, page },
        (specificProducts, specificProductHeaders) => {
          this.addData(
            {
              specificProducts,
              page: pageHelper.updatePageFromLastPage(specificProductHeaders)
            },
            this.redrawView
          )
        },
        this.onError
      )
      return
    }
    if (valueHelper.isNumberValue(therapeutic_concept_id)) {
      goldStandardSpecificProductApi.listForTherapeuticConcept(
        apiEnvironmentHelper.apiEnvironment(userCredentials, this.props.reconnectAndRetry),
        therapeutic_concept_id,
        { ...filters, ...sorting, page },
        (specificProducts, specificProductHeaders) => {
          this.addData(
            {
              specificProducts,
              page: pageHelper.updatePageFromLastPage(specificProductHeaders)
            },
            this.redrawView
          )
        },
        this.onError
      )
      return
    }

    goldStandardSpecificProductApi.list(
      apiEnvironmentHelper.apiEnvironment(userCredentials, this.props.reconnectAndRetry),
      { ...filters, ...sorting, page },
      (specificProducts, specificProductHeaders) => {
        this.addData(
          {
            specificProducts,
            page: pageHelper.updatePageFromLastPage(specificProductHeaders)
          },
          this.redrawView
        )
      },
      this.onError
    )
  }

  title() {
    return "Specific Products"
  }
}

export { SpecificProductsPageViewModel }
