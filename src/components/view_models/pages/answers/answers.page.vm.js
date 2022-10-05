import { AbstractListPageViewModel } from ".."
import { answerApi, answerHelper, pageHelper } from "@aprexis/aprexis-api-utility"
import { apiEnvironmentHelper, filtersHelper, userCredentialsHelper } from "../../../../helpers"

const answerListMethods = [
  { pathKey: "interventions", method: answerApi.listForIntervention }
]
class AnswersPageViewModel extends AbstractListPageViewModel {
  constructor(props) {
    super(props)

    this.api = this.api.bind(this)
    this.defaultParameters = this.defaultParameters.bind(this)
    this.editModal = this.editModal.bind(this)
    this.filterDescriptions = this.filterDescriptions.bind(this)
    this.filtersOptions = this.filtersOptions.bind(this)
    this.helper = this.helper.bind(this)
    this.loadData = this.loadData.bind(this)
    this.refreshData = this.refreshData.bind(this)
    this.title = this.title.bind(this)
  }

  api() {
    return answerApi
  }

  defaultParameters() {
    const filters = {}
    const sorting = { sort: "question_key" }
    this.addData({ filters, sorting, page: this.defaultPage() })
  }

  editModal(answerToEdit) {
    this.api().edit(
      apiEnvironmentHelper.apiEnvironment(userCredentialsHelper.get()),
      answerToEdit.id,
      (answer) => {
        this.props.launchModal(
          "answer",
          { operation: "update", onUpdateView: this.refreshData, answer })
      },
      this.onError
    )
  }

  filterDescriptions(_filters, _filtersOptions) {
    return [
      filtersHelper.stringFilter("Question Key", "for_question_key")
    ]
  }

  filtersOptions() {
    return {}
  }

  helper() {
    return answerHelper
  }

  loadData() {
    this.clearData()
    this.defaultParameters()
    this.refreshData()
  }

  refreshData() {
    this.removeField("answerHeaders")
    this.fetchList(
      answerListMethods,
      (answers, answerHeaders) => {
        this.addData(
          { answers, page: pageHelper.updatePageFromLastPage(answerHeaders) },
          this.redrawView
        )
      },
      this.onError
    )
  }

  title() {
    return "Answers"
  }
}

export { AnswersPageViewModel }
