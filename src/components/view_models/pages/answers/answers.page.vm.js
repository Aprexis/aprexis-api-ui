import { AbstractListPageViewModel } from ".."
import { answerApi, pageHelper, valueHelper } from "@aprexis/aprexis-api-utility"
import { apiEnvironmentHelper, filtersHelper, userCredentialsHelper } from "../../../../helpers"

class AnswersPageViewModel extends AbstractListPageViewModel {
  constructor(props) {
    super(props)

    this.defaultParameters = this.defaultParameters.bind(this)
    this.filterDescriptions = this.filterDescriptions.bind(this)
    this.filtersOptions = this.filtersOptions.bind(this)
    this.loadData = this.loadData.bind(this)
    this.refreshData = this.refreshData.bind(this)
    this.title = this.title.bind(this)
  }

  defaultParameters() {
    const filters = {}
    const sorting = { sort: "question_key" }
    this.addData({ filters, sorting, page: this.defaultPage() })
  }

  filterDescriptions(_filters, _filtersOptions) {
    return [
      filtersHelper.stringFilter("Question Key", "for_question_key")
    ]
  }

  filtersOptions() {
    return {}
  }

  loadData() {
    this.clearData()
    this.defaultParameters()
    this.refreshData()
  }

  refreshData() {
    const userCredentials = userCredentialsHelper.get()
    this.removeField("answerHeaders")
    const { filters, sorting, page } = this.data
    const pathEntries = this.pathEntries()

    list(
      pathEntries,
      apiEnvironmentHelper.apiEnvironment(userCredentials),
      { ...filters, ...sorting, page },
      (answers, answerHeaders) => {
        this.addData(
          {
            answers,
            page: pageHelper.updatePageFromLastPage(answerHeaders)
          },
          this.redrawView
        )
      },
      this.onError
    )

    function list(pathEntries, userCredentials, params, onSuccess, onError) {
      const intervention = pathEntries["interventions"]

      if (valueHelper.isValue(intervention)) {
        answerApi.listForIntervention(apiEnvironmentHelper.apiEnvironment(userCredentials), intervention.value, params, onSuccess, onError)
        return
      }

      throw new Error("An intervention is required for answers")
    }
  }

  title() {
    return "Answers"
  }
}

export { AnswersPageViewModel }
