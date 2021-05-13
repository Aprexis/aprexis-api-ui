import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { NoMatch } from "../"
import { UserProfilePage } from "../../pages/users"
import { pathHelper, valueHelper } from "../../../helpers"

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
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { UserRouting }
