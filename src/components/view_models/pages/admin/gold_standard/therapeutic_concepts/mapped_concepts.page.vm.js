import { AbstractListPageViewModel } from "../../../abstract_list.page.vm.js"
import { goldStandardTherapeuticConceptApi, pageHelper } from "@aprexis/aprexis-api-utility"
import { apiEnvironmentHelper, filtersHelper, pathHelper, userCredentialsHelper } from "../../../../../../helpers/index.js"

class MappedConceptsPageViewModel extends AbstractListPageViewModel {
  constructor(props) {
    super(props)

    this.buildConceptsLocation = this.buildConceptsLocation.bind(this)
    this.defaultParameters = this.defaultParameters.bind(this)
    this.filterDescriptions = this.filterDescriptions.bind(this)
    this.filtersOptions = this.filtersOptions.bind(this)
    this.gotoMappedConceptProfile = this.gotoMappedConceptProfile.bind(this)
    this.loadData = this.loadData.bind(this)
    this.refreshData = this.refreshData.bind(this)
    this.title = this.title.bind(this)
  }

  buildConceptsLocation(location) {
    const target = 'gold-standard'
    return {
      ...location,
      pathname: location.pathname.substring(0, location.pathname.indexOf(target) + target.length)
    }
  }

  defaultParameters() {
    const filters = {}
    const sorting = { sort: "concept_name" }
    this.addData({ filters, sorting, page: this.defaultPage() })
  }

  filterDescriptions(_filters, _filtersOptions) {
    return [
      filtersHelper.stringFilter("Concept", "for_therapeutic_concept")
    ]
  }

  filtersOptions() {
    return {}
  }

  gotoMappedConceptProfile(mappedConcept) {
    const conceptsLocation = this.buildConceptsLocation(window.location)
    const pathArray = pathHelper.buildPathArray(conceptsLocation, "therapeutic-concepts", { model: mappedConcept, idField: 'therapeutic_concept_id' }, "profile")

    pathHelper.gotoPage(pathArray)
  }

  loadData() {
    this.clearData()
    this.defaultParameters()
    this.refreshData()
  }

  refreshData() {
    const userCredentials = userCredentialsHelper.get()
    this.removeField("mappedConceptHeaders")
    const { filters, sorting, page } = this.data
    const pathEntries = this.pathEntries()
    const specific_product_id = pathHelper.pathEntryValue(pathEntries, "specific-products")

    goldStandardTherapeuticConceptApi.indexForSpecificProduct(
      apiEnvironmentHelper.apiEnvironment(userCredentials, this.props.reconnectAndRetry),
      specific_product_id,
      { ...filters, ...sorting, page },
      (mappedConcepts, mappedConceptHeaders) => {
        this.addData(
          {
            mappedConcepts,
            page: pageHelper.updatePageFromLastPage(mappedConceptHeaders)
          },
          this.redrawView
        )
      },
      this.onError
    )
  }

  title() {
    return "Mapped Concepts"
  }
}

export { MappedConceptsPageViewModel }
