import { AbstractListPageViewModel } from "../"
import { caregiverApi, caregiverHelper, pageHelper, patientHelper, valueHelper } from "@aprexis/aprexis-api-utility"
import { apiEnvironmentHelper, filtersHelper, pathHelper, userCredentialsHelper } from "../../../../helpers"

const caregiverListMethods = [
  { pathKey: "patients", method: caregiverApi.listForPatient }
]

class CaregiversPageViewModel extends AbstractListPageViewModel {
  constructor(props) {
    super(props)

    this.api = this.api.bind(this)
    this.canCreate = this.canCreate.bind(this)
    this.createModal = this.createModal.bind(this)
    this.defaultParameters = this.defaultParameters.bind(this)
    this.editModal = this.editModal.bind(this)
    this.filterDescriptions = this.filterDescriptions.bind(this)
    this.filtersOptions = this.filtersOptions.bind(this)
    this.gotoCaregiverProfile = this.gotoCaregiverProfile.bind(this)
    this.helper = this.helper.bind(this)
    this.loadData = this.loadData.bind(this)
    this.refreshData = this.refreshData.bind(this)
    this.title = this.title.bind(this)
  }

  canCreate() {
    return canBeCreated(this.props.currentUser, this.pathEntries(), this.props.context)

    function canBeCreated(user, pathEntries, context) {
      if (!pathHelper.isSingular(pathEntries, "patients") || !valueHelper.isValue(context)) {
        return false
      }

      const patient = context.patients
      return patientHelper.canEdit(user, patient, patientHelper.healthPlan(patient))
    }

  }

  api() {
    return caregiverApi
  }

  createModal() {
    const pathEntries = this.pathEntries()
    const patientId = pathHelper.id(pathEntries, "patients")

    this.api().buildNew(
      apiEnvironmentHelper.apiEnvironment(userCredentialsHelper.get()),
      patientId,
      (caregiver) => {
        this.props.launchModal(
          "caregiver",
          { operation: "create", onUpdateView: this.refreshData, caregiver }
        )
      },
      this.onError
    )
  }

  defaultParameters() {
    const filters = {}
    const sorting = { sort: "last_name,first_name" }
    this.addData({ filters, sorting, page: this.defaultPage() })
  }

  editModal(caregiverToEdit) {
    this.api().edit(
      apiEnvironmentHelper.apiEnvironment(userCredentialsHelper.get()),
      caregiverToEdit.id,
      (caregiver) => {
        this.props.launchModal(
          "caregiver",
          { operation: "update", onUpdateView: this.refreshData, caregiver })
      },
      this.onError
    )
  }

  filterDescriptions(_filters, _filtersOptions) {
    return [
      filtersHelper.stringFilter("Name", "for_name")
    ]
  }

  filtersOptions() {
    return {}
  }

  gotoCaregiverProfile(caregiver) {
    const pathArray = pathHelper.buildPathArray(window.location, caregiver, "profile")

    pathHelper.gotoPage(pathArray)
  }

  helper() {
    return caregiverHelper
  }

  loadData() {
    this.clearData()
    this.defaultParameters()
    this.refreshData()
  }

  refreshData() {
    this.removeField("caregiverHeaders")

    this.fetchList(
      caregiverListMethods,
      (caregivers, caregiverHeaders) => {
        this.addData(
          { caregivers, "page": pageHelper.updatePageFromLastPage(caregiverHeaders) },
          this.redrawView
        )
      },
      this.onError
    )
  }

  title() {
    return "Caregivers"
  }
}

export { CaregiversPageViewModel }
