import { AbstractListPageViewModel } from "../../../abstract_list.page.vm.js"
import { goldStandardTherapeuticConceptApi, pageHelper } from "@aprexis/aprexis-api-utility"
import { apiEnvironmentHelper, filtersHelper, pathHelper, userCredentialsHelper } from "../../../../../../helpers/index.js"

class ChildConceptsPageViewModel extends AbstractListPageViewModel {
  constructor(props) {
    super(props)

    this.buildConceptsLocation = this.buildConceptsLocation.bind(this)
    this.defaultParameters = this.defaultParameters.bind(this)
    this.filterDescriptions = this.filterDescriptions.bind(this)
    this.filtersOptions = this.filtersOptions.bind(this)
    this.gotoChildConceptProfile = this.gotoChildConceptProfile.bind(this)
    this.loadData = this.loadData.bind(this)
    this.refreshData = this.refreshData.bind(this)
    this.title = this.title.bind(this)
  }

  buildConceptsLocation(location) {
    const target = 'therapeutic-concepts'
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

  gotoChildConceptProfile(childConcept) {
    const conceptsLocation = this.buildConceptsLocation(window.location)
    const pathArray = pathHelper.buildPathArray(conceptsLocation, { model: childConcept, idField: 'therapeutic_concept_id' }, "profile")

    pathHelper.gotoPage(pathArray)
  }

  loadData() {
    this.clearData()
    this.defaultParameters()
    this.refreshData()
  }

  refreshData() {
    const userCredentials = userCredentialsHelper.get()
    this.removeField("childConceptHeaders")
    const { filters, sorting, page } = this.data
    const pathEntries = this.pathEntries()
    const therapeutic_concept_id = pathHelper.pathEntryValue(pathEntries, "therapeutic-concepts")

    goldStandardTherapeuticConceptApi.childrenOf(
      apiEnvironmentHelper.apiEnvironment(userCredentials, this.props.reconnectAndRetry),
      therapeutic_concept_id,
      { ...filters, ...sorting, page },
      (childConcepts, childConceptHeaders) => {
        this.addData(
          {
            childConcepts,
            page: pageHelper.updatePageFromLastPage(childConceptHeaders)
          },
          this.redrawView
        )
      },
      this.onError
    )
  }

  title() {
    return "Child Concepts"
  }
}

export { ChildConceptsPageViewModel }
