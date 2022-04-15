import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { NoMatch } from "../../"
import { PhysicianProfilePage } from "../../../pages/admin/physicians"
import { pathHelper, valueHelper } from "../../../../helpers"

class PhysicianRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const medicalClaimPrefix = pathHelper.singularPrefix(window.location, "physicians", ":physician_id")

    return (
      <Switch>
        <Route
          exact
          path={`${medicalClaimPrefix}/profile`}
          render={(props) => (<PhysicianProfilePage {...props} {...contextProps} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { PhysicianRouting }
