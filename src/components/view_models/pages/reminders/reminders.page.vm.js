import { AbstractListPageViewModel } from "../"
import { reminderApi } from "../../../../api"
import { pageHelper } from "../../../../helpers"

const reminderListMethods = [
  { pathKey: "patients", method: reminderApi.listForPatient }
]

class RemindersPageViewModel extends AbstractListPageViewModel {
  constructor(props) {
    super(props)

    this.canCreate = this.canCreate.bind(this)
    this.defaultParameters = this.defaultParameters.bind(this)
    this.filterDescriptions = this.filterDescriptions.bind(this)
    this.filtersOptions = this.filtersOptions.bind(this)
    //this.gotoReminderProfile = this.gotoReminderProfile.bind(this)
    this.loadData = this.loadData.bind(this)
    this.refreshData = this.refreshData.bind(this)
    this.title = this.title.bind(this)
  }

  canCreate() {
    return false
  }

  defaultParameters() {
    const filters = {}
    const sorting = { sort: "start_date-,remind_at,remind_at_time_zone,patient.last_name,patient.first_name" }

    this.addData({ filters, sorting, page: this.defaultPage() })
  }

  filterDescriptions(filters, filtersOptions) {
    const filterDescriptions = []

    return filterDescriptions
  }

  filtersOptions() {
    return {}
  }

  /* TODO: enable once the page is written.
  gotoReminderProfile(reminder) {
    const pathArray = pathHelper.buildPathArray(window.location, reminder, "profile")

    pathHelper.gotoPage(pathArray)
  }
  */

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
