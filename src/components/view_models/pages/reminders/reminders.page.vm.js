import { AbstractListPageViewModel } from "../"
import { reminderApi } from "../../../../api"
import { pageHelper, pathHelper, reminderHelper, userCredentialsHelper } from "../../../../helpers"

const reminderListMethods = [
  { pathKey: "patients", method: reminderApi.listForPatient }
]

class RemindersPageViewModel extends AbstractListPageViewModel {
  constructor(props) {
    super(props)

    this.api = this.api.bind(this)
    this.canCreate = this.canCreate.bind(this)
    this.createModal = this.createModal.bind(this)
    this.defaultParameters = this.defaultParameters.bind(this)
    this.editModal = this.editModal.bind(this)
    this.filterDescriptions = this.filterDescriptions.bind(this)
    this.filtersOptions = this.filtersOptions.bind(this)
    this.gotoReminderProfile = this.gotoReminderProfile.bind(this)
    this.helper = this.helper.bind(this)
    this.loadData = this.loadData.bind(this)
    this.refreshData = this.refreshData.bind(this)
    this.title = this.title.bind(this)
  }

  api() {
    return reminderApi
  }

  canCreate() {
    const { currentUser } = this.props
    const pathEntries = this.pathEntries()

    return this.helper().canBeCreated(currentUser, pathEntries)
  }

  createModal() {
    const pathEntries = this.pathEntries()
    const patientId = pathHelper.id(pathEntries, "patients")

    this.api().buildNew(
      userCredentialsHelper.get(),
      patientId,
      (reminder) => {
        this.props.launchModal(
          "reminder",
          { operation: "create", onUpdateView: this.refreshData, reminder }
        )
      },
      this.onError
    )
  }

  defaultParameters() {
    const filters = {}
    const sorting = { sort: "start_date-,remind_at,remind_at_time_zone,patient.last_name,patient.first_name" }

    this.addData({ filters, sorting, page: this.defaultPage() })
  }

  editModal(reminderToEdit, nextOperation) {
    this.api().edit(
      userCredentialsHelper.get(),
      this.helper().id(reminderToEdit),
      (reminder) => {
        this.props.launchModal(
          "reminder",
          {
            operation: "update",
            onUpdateView: nextOperation,
            reminder
          }
        )
      },
      this.onError
    )
  }

  filterDescriptions(_filters, _filtersOptions) {
    const filterDescriptions = []

    return filterDescriptions
  }

  filtersOptions() {
    return {}
  }

  gotoReminderProfile(reminder) {
    const pathArray = pathHelper.buildPathArray(window.location, reminder, "profile")

    pathHelper.gotoPage(pathArray)
  }

  helper() {
    return reminderHelper
  }

  loadData() {
    this.clearData()
    this.defaultParameters()
    this.refreshData()
  }

  refreshData() {
    this.removeField("reminderHeaders")
    this.fetchList(
      reminderListMethods,
      (reminders, reminderHeaders) => {
        this.addData(
          { reminders, page: pageHelper.updatePageFromLastPage(reminderHeaders) },
          this.redrawView
        )
      },
      this.onError
    )
  }

  title() {
    return "Reminders"
  }
}

export { RemindersPageViewModel }
