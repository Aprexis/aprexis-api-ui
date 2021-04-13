import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { DiseasesRouting } from "./diseases"
import { NoMatch } from "../"
import { pathHelper } from "../../../helpers"

class AdminRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser
    }
    const adminPrefix = pathHelper.pluralPrefix(window.location, "admin")

    return (
      <Switch>
        <Route
          path={`${adminPrefix}/diseases`}
          render={(props) => (<DiseasesRouting {...props} {...contextProps} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { AdminRouting }
