import { AbstractListPageViewModel } from "../../.."
import { goldStandardGenericProductClinicalApi, pageHelper } from "@aprexis/aprexis-api-utility"
import { apiEnvironmentHelper, filtersHelper, pathHelper, userCredentialsHelper } from "../../../../../../helpers"

class GenericProductClinicalsPageViewModel extends AbstractListPageViewModel {
  constructor(props) {
    super(props)

    this.defaultParameters = this.defaultParameters.bind(this)
    this.filterDescriptions = this.filterDescriptions.bind(this)
    this.filtersOptions = this.filtersOptions.bind(this)
    this.gotoGenericProductClinicalProfile = this.gotoGenericProductClinicalProfile.bind(this)
    this.loadData = this.loadData.bind(this)
    this.refreshData = this.refreshData.bind(this)
    this.title = this.title.bind(this)
  }

  defaultParameters() {
    const filters = {}
    const sorting = { sort: "name" }
    this.addData({ filters, sorting, page: this.defaultPage() })
  }

  filterDescriptions(_filters, _filtersOptions) {
    return [
      filtersHelper.stringFilter("Name or Synonym", "for_generic_product_clinical")
    ]
  }

  filtersOptions() {
    return {}
  }

  gotoGenericProductClinicalProfile(genericProductClinical) {
    const pathArray = pathHelper.buildPathArray(window.location, { model: genericProductClinical, idField: 'generic_product_clinical_id' }, "profile")

    pathHelper.gotoPage(pathArray)
  }

  loadData() {
    this.clearData()
    this.defaultParameters()
    this.refreshData()
  }

  refreshData() {
    const userCredentials = userCredentialsHelper.get()
    this.removeField("genericProductClinicalHeaders")
    const { filters, sorting, page } = this.data

    goldStandardGenericProductClinicalApi.index(
      apiEnvironmentHelper.apiEnvironment(userCredentials, this.props.reconnectAndRetry),
      { ...filters, ...sorting, page },
      (genericProductClinicals, genericProductClinicalHeaders) => {
        this.addData(
          {
            genericProductClinicals,
            page: pageHelper.updatePageFromLastPage(genericProductClinicalHeaders)
          },
          this.redrawView
        )
      },
      this.onError
    )
  }

  title() {
    return "Generic Product Clinicals"
  }
}

export { GenericProductClinicalsPageViewModel }
