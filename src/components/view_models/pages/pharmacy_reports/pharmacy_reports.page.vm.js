import { AbstractListPageViewModel } from "../"
import { pharmacyReportApi, pharmacyReportHelper, pageHelper } from "@aprexis/aprexis-api-utility"
import { pathHelper } from "../../../../helpers"

const pharmacyReportListMethods = [
  { pathKey: "pharmacy-chains", method: pharmacyReportApi.listForPharmacyChain }
]

class PharmacyReportsPageViewModel extends AbstractListPageViewModel {
  constructor(props) {
    super(props)

    this.api = this.api.bind(this)
    this.defaultParameters = this.defaultParameters.bind(this)
    this.filterDescriptions = this.filterDescriptions.bind(this)
    this.filtersOptions = this.filtersOptions.bind(this)
    this.gotoPharmacyReportProfile = this.gotoPharmacyReportProfile.bind(this)
    this.helper = this.helper.bind(this)
    this.loadData = this.loadData.bind(this)
    this.refreshData = this.refreshData.bind(this)
  }

  api() {
    return pharmacyReportApi
  }

  defaultParameters() {
    const filters = {}
    const sorting = { sort: "end_date-,pharmacy.name,pharmacy_store.name,pharmacy_store.store_number,health_plan.name" }
    this.addData({ filters, sorting, page: this.defaultPage() })
  }

  filterDescriptions(_filters, _filtersOptions) {
    return [
    ]
  }

  filtersOptions() {
    return {}
  }

  gotoPharmacyReportProfile(pharmacyReport) {
    const pathArray = pathHelper.buildPathArray(window.location, pharmacyReport, "profile")

    pathHelper.gotoPage(pathArray)
  }

  helper() {
    return pharmacyReportHelper
  }

  loadData() {
    this.clearData()
    this.defaultParameters()
    this.refreshData()
  }

  refreshData() {
    this.removeField("pharmacyReportHeaders")

    this.fetchList(
      pharmacyReportListMethods,
      (pharmacyReports, pharmacyReportHeaders) => {
        this.addData(
          { pharmacyReports, "page": pageHelper.updatePageFromLastPage(pharmacyReportHeaders) },
          this.redrawView
        )
      },
      this.onError
    )
  }

  title() {
    return "Pharmacy Reports"
  }
}

export { PharmacyReportsPageViewModel }
