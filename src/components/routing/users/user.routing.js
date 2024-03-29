import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { NoMatch } from "../"
import { AppointmentsRouting } from "../appointments"
import { UserProfilePage } from "../../pages/users"
import { valueHelper } from '@aprexis/aprexis-api-utility'
import { pathHelper } from "../../../helpers"

class UserRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const userPrefix = pathHelper.singularPrefix(window.location, "users", ":user_id")

    return (
      <Switch>
        <Route
          exact
          path={`${userPrefix}/profile`}
          render={(props) => (<UserProfilePage {...props} {...contextProps} />)}
        />
        <Route
          path={`${userPrefix}/appointments`}
          render={(props) => (<AppointmentsRouting {...props} {...contextProps} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { UserRouting }
