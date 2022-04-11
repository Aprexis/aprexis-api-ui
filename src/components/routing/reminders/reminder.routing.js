import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { NoMatch } from "../"
import { ReminderProfilePage } from "../../pages/reminders"
import { pathHelper, valueHelper } from "../../../helpers"

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
