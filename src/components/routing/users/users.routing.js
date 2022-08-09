import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { UserRouting } from "./"
import { NoMatch } from "../"
import { UsersPage } from "../../pages/users"
import { valueHelper } from '@aprexis/aprexis-api-utility'
import { pathHelper } from "../../../helpers"

class UsersRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const usersPrefix = pathHelper.pluralPrefix(window.location, "users")

    return (
      <Switch>
        <Route
          exact
          path={usersPrefix}
          render={(props) => (<UsersPage {...props} {...contextProps} />)}
        />
        <Route
          path={`${usersPrefix}/:user_id`}
          render={(props) => (<UserRouting {...props} {...contextProps} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { UsersRouting }
