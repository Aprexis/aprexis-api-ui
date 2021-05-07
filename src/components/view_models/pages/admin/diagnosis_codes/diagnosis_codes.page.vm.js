import { AbstractListPageViewModel } from "../../"
import { diagnosisCodeApi } from "../../../../../api/admin"
import { filtersHelper, pageHelper, pathHelper, userCredentialsHelper, valueHelper } from "../../../../../helpers"
import { diagnosisCodes } from "../../../../../types"

class DiagnosisCodesPageViewModel extends AbstractListPageViewModel {
  constructor(props) {
    super(props)

    this.defaultParameters = this.defaultParameters.bind(this)
    this.filterDescriptions = this.filterDescriptions.bind(this)
    this.filtersOptions = this.filtersOptions.bind(this)
    this.gotoDiagnosisCodeProfile = this.gotoDiagnosisCodeProfile.bind(this)
    this.loadData = this.loadData.bind(this)
    this.refreshData = this.refreshData.bind(this)
  }

  defaultParameters() {
    const filters = {}
    const sorting = { sort: "type,code" }
    this.addData({ filters, sorting, page: this.defaultPage() })
  }

  filterDescriptions(filters, filtersOptions) {
    return [
      filtersHelper.selectIdFilter(
        "Type",
        "for_type",
        { options: Object.keys(diagnosisCodes).map((dc) => { return { id: dc, value: diagnosisCodes[dc] } }) }
      ),
      filtersHelper.stringFilter("Code", "for_code")
    ]
  }

  filtersOptions() {
    return {}
  }

  gotoDiagnosisCodeProfile(diagnosisCode) {
    const pathArray = pathHelper.buildPathArray(window.location, diagnosisCode, "profile")

    pathHelper.gotoPage(pathArray)
  }

  loadData() {
    this.clearData()
    this.defaultParameters()
    this.refreshData()
  }

  refreshData() {
    const userCredentials = userCredentialsHelper.get()
    this.removeField("diagnosisCodeHeaders")
    const { filters, sorting, page } = this.data
    const pathEntries = this.pathEntries()

    list(
      pathEntries,
      userCredentials,
      { ...filters, ...sorting, page },
      (diagnosisCodes, diagnosisCodeHeaders) => {
        this.addData({ diagnosisCodes })
        this.addField("page", pageHelper.updatePageFromLastPage(diagnosisCodeHeaders))
        this.redrawView()
      },
      this.onError
    )

    function list(pathEntries, userCredentials, params, onSuccess, onError) {
      const disease = pathEntries['diseases']

      if (valueHelper.isValue(disease) && valueHelper.isValue(disease.value)) {
        diagnosisCodeApi.listForDisease(userCredentials, disease.value, params, onSuccess, onError)
        return
      }

      diagnosisCodeApi.list(userCredentials, params, onSuccess, onError)
    }
  }
}

export { DiagnosisCodesPageViewModel }
