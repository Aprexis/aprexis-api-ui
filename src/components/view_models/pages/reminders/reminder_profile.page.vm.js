import { AbstractPageViewModel } from "../"
import { reminderApi, reminderHelper } from "@aprexis/aprexis-api-utility"
import { apiEnvironmentHelper, pathHelper, userCredentialsHelper } from "../../../../helpers"

class ReminderProfilePageViewModel extends AbstractPageViewModel {
  constructor(props) {
    super(props)

    this.editProfileModal = this.editProfileModal.bind(this)
    this.loadData = this.loadData.bind(this)
  }

  editProfileModal(reminderToEdit) {
    reminderApi.edit(
      apiEnvironmentHelper.apiEnvironment(userCredentialsHelper.get(), this.props.reconnectAndRetry),
      reminderHelper.id(reminderToEdit),
      (reminder) => {
        this.props.launchModal(
          "reminder",
          {
            operation: "update",
            onUpdateView: this.loadData,
            reminder
          }
        )
      },
      this.onError
    )
  }

  loadData() {
    this.clearData(false)

    const userCredentials = userCredentialsHelper.get()
    const pathEntries = this.pathEntries()
    const reminder_id = pathHelper.pathEntryValue(pathEntries, 'reminders')
    reminderApi.profile(
      apiEnvironmentHelper.apiEnvironment(userCredentials, this.props.reconnectAndRetry),
      reminder_id,
      (reminder) => { this.addField('reminder', reminder, this.redrawView) },
      this.onError
    )
  }
}

export { ReminderProfilePageViewModel }
