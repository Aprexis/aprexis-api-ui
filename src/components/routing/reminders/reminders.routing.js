import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { ReminderRouting } from "./"
import { NoMatch } from ".."
import { RemindersPage } from "../../pages/reminders"
import { valueHelper } from '@aprexis/aprexis-api-utility'
import { pathHelper } from "../../../helpers"

class RemindersRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const remindersPrefix = pathHelper.pluralPrefix(window.location, "reminders")

    return (
      <Switch>
        <Route
          exact
          path={remindersPrefix}
          render={(props) => (<RemindersPage {...props} {...contextProps} />)}
        />
        <Route
          path={`${remindersPrefix}/:reminder_id`}
          render={(props) => (<ReminderRouting {...props} {...contextProps} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { RemindersRouting }
