import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { PackageVersionsRouting } from "../package_versions"
import { NoMatch } from "../../.."
import { PackageProfilePage } from "../../../../pages/admin/gold_standard/packages"
import { valueHelper } from "@aprexis/aprexis-api-utility"
import { pathHelper } from "../../../../../helpers"

class PackageRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const packagePrefix = pathHelper.singularPrefix(window.location, "packages", ":package_id")

    return (
      <Switch>
        {
          <Route
            path={`${packagePrefix}/package-versions`}
            render={(props) => (<PackageVersionsRouting {...props} {...contextProps} />)}
          />
        }
        <Route
          exact
          path={`${packagePrefix}/profile`}
          render={(props) => (<PackageProfilePage {...props} {...contextProps} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { PackageRouting }
