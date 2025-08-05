import { AbstractListPageViewModel } from "../abstract_list.page.vm.js"
import { reminderApi, pageHelper, reminderHelper } from "@aprexis/aprexis-api-utility"
import { apiEnvironmentHelper, authorizationHelper, pathHelper, userCredentialsHelper } from "../../../../helpers/index.js"

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

    return canBeCreated(currentUser, pathEntries)

    function canBeCreated(user, pathEntries) {
      if (!authorizationHelper.canCreateReminder(user, pathEntries)) {
        return false
      }

      return pathHelper.isSingular(pathEntries, "patients")
    }
  }

  createModal() {
    const pathEntries = this.pathEntries()
    const patientId = pathHelper.id(pathEntries, "patients")

    this.api().buildNew(
      apiEnvironmentHelper.apiEnvironment(userCredentialsHelper.get(), this.props.reconnectAndRetry),
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
    const sorting = { sort: "start_date-,remind_at,patient.last_name,patient.first_name" }

    this.addData({ filters, sorting, page: this.defaultPage() })
  }

  editModal(reminderToEdit, nextOperation) {
    this.api().edit(
      apiEnvironmentHelper.apiEnvironment(userCredentialsHelper.get(), this.props.reconnectAndRetry),
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
