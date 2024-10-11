import { AbstractListPageViewModel } from "../../.."
import { goldStandardTherapeuticConceptApi, pageHelper, valueHelper } from "@aprexis/aprexis-api-utility"
import { apiEnvironmentHelper, filtersHelper, pathHelper, userCredentialsHelper } from "../../../../../../helpers"

class TherapeuticConceptsPageViewModel extends AbstractListPageViewModel {
  constructor(props) {
    super(props)

    this.defaultParameters = this.defaultParameters.bind(this)
    this.filterDescriptions = this.filterDescriptions.bind(this)
    this.filtersOptions = this.filtersOptions.bind(this)
    this.gotoTherapeuticConceptProfile = this.gotoTherapeuticConceptProfile.bind(this)
    this.loadData = this.loadData.bind(this)
    this.refreshData = this.refreshData.bind(this)
    this.title = this.title.bind(this)
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

  gotoTherapeuticConceptProfile(therapeuticConcept) {
    const pathArray = pathHelper.buildPathArray(window.location, { model: therapeuticConcept, idField: 'therapeutic_concept_id' }, "profile")

    pathHelper.gotoPage(pathArray)
  }

  loadData() {
    this.clearData()
    this.defaultParameters()
    this.refreshData()
  }

  refreshData() {
    const userCredentials = userCredentialsHelper.get()
    this.removeField("therapeuticConceptHeaders")
    const { filters, sorting, page } = this.data
    const { child_concept_id, parent_concept_id } = (this.props.location.state || {})

    console.log(`State: ${JSON.stringify(this.props.location.state)}`)

    if (valueHelper.isNumberValue(parent_concept_id)) {
      goldStandardTherapeuticConceptApi.childrenOf(
        apiEnvironmentHelper.apiEnvironment(userCredentials, this.props.reconnectAndRetry),
        parent_concept_id,
        { ...filters, ...sorting, page },
        (therapeuticConcepts, therapeuticConceptHeaders) => {
          this.addData(
            {
              therapeuticConcepts,
              page: pageHelper.updatePageFromLastPage(therapeuticConceptHeaders)
            },
            this.redrawView
          )
        },
        this.onError
      )
      return
    }

    if (valueHelper.isNumberValue(child_concept_id)) {
      goldStandardTherapeuticConceptApi.parentsOf(
        apiEnvironmentHelper.apiEnvironment(userCredentials, this.props.reconnectAndRetry),
        child_concept_id,
        { ...filters, ...sorting, page },
        (therapeuticConcepts, therapeuticConceptHeaders) => {
          this.addData(
            {
              therapeuticConcepts,
              page: pageHelper.updatePageFromLastPage(therapeuticConceptHeaders)
            },
            this.redrawView
          )
        },
        this.onError
      )
      return
    }

    goldStandardTherapeuticConceptApi.index(
      apiEnvironmentHelper.apiEnvironment(userCredentials, this.props.reconnectAndRetry),
      { ...filters, ...sorting, page },
      (therapeuticConcepts, therapeuticConceptHeaders) => {
        this.addData(
          {
            therapeuticConcepts,
            page: pageHelper.updatePageFromLastPage(therapeuticConceptHeaders)
          },
          this.redrawView
        )
      },
      this.onError
    )
  }

  title() {
    return "Therapeutic Concepts"
  }
}

export { TherapeuticConceptsPageViewModel }
