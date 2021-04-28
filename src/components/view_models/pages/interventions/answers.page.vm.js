import { AbstractListPageViewModel } from "../"
import { answerApi } from "../../../../api"
import { filtersHelper, pageHelper, pathHelper, userCredentialsHelper, valueHelper } from "../../../../helpers"

class AnswersPageViewModel extends AbstractListPageViewModel {
  constructor(props) {
    super(props)

    this.defaultParameters = this.defaultParameters.bind(this)
    this.filterDescriptions = this.filterDescriptions.bind(this)
    this.filtersOptions = this.filtersOptions.bind(this)
    this.loadData = this.loadData.bind(this)
    this.refreshData = this.refreshData.bind(this)
  }

  defaultParameters() {
    const filters = {}
    const sorting = { sort: "question_key" }
    this.addData({ filters, sorting, page: this.defaultPage() })
  }

  filterDescriptions(filters, filtersOptions) {
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

    list(
      userCredentials,
      { ...filters, ...sorting, page },
      (answers, answerHeaders) => {
        this.addData({ answers })
        this.addField("page", pageHelper.updatePageFromLastPage(answerHeaders))
        this.redrawView()
      },
      this.onError
    )

    function list(userCredentials, params, onSuccess, onError) {
      const pathEntries = pathHelper.parsePathEntries(window.location)
      const intervention = pathEntries["interventions"]

      if (valueHelper.isValue(intervention)) {
        answerApi.listForIntervention(userCredentials, intervention.value, params, onSuccess, onError)
        return
      }

      throw new Error("An intervention is required for answers")
    }
  }
}

export { AnswersPageViewModel }
