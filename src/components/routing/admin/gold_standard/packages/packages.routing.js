import { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { PackageRouting } from "./package.routing.js"
import { NoMatch } from "../../../index.js"
import { PackagesPage } from "../../../../pages/admin/gold_standard/packages/index.js"
import { valueHelper } from "@aprexis/aprexis-api-utility"
import { pathHelper } from "../../../../../helpers/index.js"

class PackagesRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const packagesPrefix = pathHelper.pluralPrefix(window.location, "packages")

    return (
      <Switch>
        <Route
          exact
          path={packagesPrefix}
          render={(props) => (<PackagesPage {...props} {...contextProps} />)}
        />
        <Route
          path={`${packagesPrefix}/:package_id`}
          render={(props) => (<PackageRouting {...props} {...contextProps} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { PackagesRouting }
