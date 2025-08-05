import { AbstractListPageViewModel } from "../abstract_list.page.vm.js"
import { pharmacyStoreProgramReportApi, pharmacyStoreProgramReportHelper, pageHelper } from "@aprexis/aprexis-api-utility"
import { pathHelper } from "../../../../helpers/index.js"

const pharmacyStoreProgramReportListMethods = [
  { pathKey: "pharmacy-stores", method: pharmacyStoreProgramReportApi.listForPharmacyStore },
  { pathKey: "programs", method: pharmacyStoreProgramReportApi.listForProgram }
]

class PharmacyStoreProgramReportsPageViewModel extends AbstractListPageViewModel {
  constructor(props) {
    super(props)

    this.api = this.api.bind(this)
    this.defaultParameters = this.defaultParameters.bind(this)
    this.filterDescriptions = this.filterDescriptions.bind(this)
    this.filtersOptions = this.filtersOptions.bind(this)
    this.gotoPharmacyStoreProgramReportProfile = this.gotoPharmacyStoreProgramReportProfile.bind(this)
    this.helper = this.helper.bind(this)
    this.loadData = this.loadData.bind(this)
    this.refreshData = this.refreshData.bind(this)
  }

  api() {
    return pharmacyStoreProgramReportApi
  }

  defaultParameters() {
    const filters = {}
    const sorting = { sort: "created_at-,pharmacy_store.name,pharmacy_store.store_number,program.name" }
    this.addData({ filters, sorting, page: this.defaultPage() })
  }

  filterDescriptions(_filters, _filtersOptions) {
    return [
    ]
  }

  filtersOptions() {
    return {}
  }

  gotoPharmacyStoreProgramReportProfile(pharmacyStoreProgramReport) {
    const pathArray = pathHelper.buildPathArray(window.location, pharmacyStoreProgramReport, "profile")

    pathHelper.gotoPage(pathArray)
  }

  helper() {
    return pharmacyStoreProgramReportHelper
  }

  loadData() {
    this.clearData()
    this.defaultParameters()
    this.refreshData()
  }

  refreshData() {
    this.removeField("pharmacyStoreProgramReportHeaders")

    this.fetchList(
      pharmacyStoreProgramReportListMethods,
      (pharmacyStoreProgramReports, pharmacyStoreProgramReportHeaders) => {
        this.addData(
          { pharmacyStoreProgramReports, "page": pageHelper.updatePageFromLastPage(pharmacyStoreProgramReportHeaders) },
          this.redrawView
        )
      },
      this.onError
    )
  }

  title() {
    return "Pharmacy Store Program Reports"
  }
}

export { PharmacyStoreProgramReportsPageViewModel }
