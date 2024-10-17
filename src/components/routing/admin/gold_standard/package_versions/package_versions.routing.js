import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { PackageVersionRouting } from "./package_version.routing"
import { NoMatch } from "../../.."
import { PackageVersionsPage } from "../../../../pages/admin/gold_standard/package_versions"
import { valueHelper } from "@aprexis/aprexis-api-utility"
import { pathHelper } from "../../../../../helpers"

class PackageVersionsRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const packageVersionsPrefix = pathHelper.pluralPrefix(window.location, "package-versions")

    return (
      <Switch>
        <Route
          exact
          path={packageVersionsPrefix}
          render={(props) => (<PackageVersionsPage {...props} {...contextProps} />)}
        />
        <Route
          path={`${packageVersionsPrefix}/:package_version_id`}
          render={(props) => (<PackageVersionRouting {...props} {...contextProps} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { PackageVersionsRouting }
