import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { PhysicianRouting } from "./"
import { NoMatch } from "../../"
import { PhysiciansPage } from "../../../pages/admin/physicians"
import { valueHelper } from '@aprexis/aprexis-api-utility'
import { pathHelper } from "../../../../helpers"

class PhysiciansRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const PhysiciansPrefix = pathHelper.pluralPrefix(window.location, "physicians")

    return (
      <Switch>
        <Route
          exact
          path={PhysiciansPrefix}
          render={(props) => (<PhysiciansPage {...props} {...contextProps} />)}
        />
        <Route
          path={`${PhysiciansPrefix}/:physician_id`}
          render={(props) => (<PhysicianRouting {...props} {...contextProps} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { PhysiciansRouting }
