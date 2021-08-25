import { AbstractListPageViewModel } from "../"
import { caregiverApi } from "../../../../api"
import { caregiverHelper, filtersHelper, pageHelper, pathHelper, userCredentialsHelper } from "../../../../helpers"

const caregiverListMethods = [
  { pathKey: "patients", method: caregiverApi.listForPatient }
]

class CaregiversPageViewModel extends AbstractListPageViewModel {
  constructor(props) {
    super(props)

    this.canCreate = this.canCreate.bind(this)
    this.createModal = this.createModal.bind(this)
    this.defaultParameters = this.defaultParameters.bind(this)
    this.editModal = this.editModal.bind(this)
    this.filterDescriptions = this.filterDescriptions.bind(this)
    this.filtersOptions = this.filtersOptions.bind(this)
    this.gotoCaregiverProfile = this.gotoCaregiverProfile.bind(this)
    this.loadData = this.loadData.bind(this)
    this.refreshData = this.refreshData.bind(this)
    this.title = this.title.bind(this)
  }

  canCreate() {
    return caregiverHelper.canBeCreated(this.props.currentUser, this.pathEntries(), this.props.context)
  }

  createModal() {
    const pathEntries = this.pathEntries()
    const patientId = pathHelper.id(pathEntries, "patients")

    caregiverApi.buildNew(
      userCredentialsHelper.get(),
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
    caregiverApi.edit(
      userCredentialsHelper.get(),
      caregiverToEdit.id,
      (caregiver) => {
        this.props.launchModal(
          "caregiver",
          { operation: "update", onUpdateView: this.refreshData, caregiver })
      },
      this.onError
    )
  }

  filterDescriptions(filters, filtersOptions) {
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
