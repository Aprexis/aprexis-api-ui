import { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { NoMatch } from "../index.js"
import { ReminderProfilePage } from "../../pages/reminders/index.js"
import { valueHelper } from '@aprexis/aprexis-api-utility'
import { pathHelper } from "../../../helpers/index.js"

class ReminderRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const reminderPrefix = pathHelper.singularPrefix(window.location, "reminders", ":reminder_id")

    return (
      <Switch>
        {
          <Route
            exact
            path={`${reminderPrefix}/profile`}
            render={(props) => (<ReminderProfilePage {...props} {...contextProps} />)}
          />
        }
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { ReminderRouting }
