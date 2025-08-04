import { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { PhysicianRouting } from "./physician_routing.js"
import { NoMatch } from "../../index.js"
import { PhysiciansPage } from "../../../pages/admin/physicians/index.js"
import { valueHelper } from '@aprexis/aprexis-api-utility'
import { pathHelper } from "../../../../helpers/index.js"

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
