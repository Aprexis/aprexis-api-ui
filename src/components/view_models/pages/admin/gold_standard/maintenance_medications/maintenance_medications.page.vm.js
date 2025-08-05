import { AbstractListPageViewModel } from "../../../abstract_list.page.vm.js"
import { goldStandardMaintenanceMedicationApi, pageHelper/*, valueHelper */ } from "@aprexis/aprexis-api-utility"
import { apiEnvironmentHelper, filtersHelper, pathHelper, userCredentialsHelper } from "../../../../../../helpers/index.js"

class MaintenanceMedicationsPageViewModel extends AbstractListPageViewModel {
  constructor(props) {
    super(props)

    this.defaultParameters = this.defaultParameters.bind(this)
    this.filterDescriptions = this.filterDescriptions.bind(this)
    this.filtersOptions = this.filtersOptions.bind(this)
    this.gotoMaintenanceMedicationProfile = this.gotoMaintenanceMedicationProfile.bind(this)
    this.loadData = this.loadData.bind(this)
    this.refreshData = this.refreshData.bind(this)
    this.title = this.title.bind(this)
  }

  defaultParameters() {
    const filters = {}
    const sorting = { sort: "ndc11" }
    this.addData({ filters, sorting, page: this.defaultPage() })
  }

  filterDescriptions(_filters, _filtersOptions) {
    return [
      filtersHelper.stringFilter("NDC11", "for_ndc")
    ]
  }

  filtersOptions() {
    return {}
  }

  gotoMaintenanceMedicationProfile(maintenanceMedication) {
    const pathArray = pathHelper.buildPathArray(
      window.location,
      { model: maintenanceMedication, association: 'package', idField: 'package_id' },
      "profile"
    )

    pathHelper.gotoPage(pathArray)
  }

  loadData() {
    this.clearData()
    this.defaultParameters()
    this.refreshData()
  }

  refreshData() {
    const userCredentials = userCredentialsHelper.get()
    this.removeField("maintenanceMedicationHeaders")
    const { filters, sorting, page } = this.data

    goldStandardMaintenanceMedicationApi.list(
      apiEnvironmentHelper.apiEnvironment(userCredentials, this.props.reconnectAndRetry),
      { ...filters, ...sorting, page },
      (maintenanceMedications, maintenanceMedicationHeaders) => {
        this.addData(
          {
            maintenanceMedications,
            page: pageHelper.updatePageFromLastPage(maintenanceMedicationHeaders)
          },
          this.redrawView
        )
      },
      this.onError
    )
  }

  title() {
    return "Maintenance Medications"
  }
}

export { MaintenanceMedicationsPageViewModel }
