import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { NoMatch } from "../../.."
import { PackageVersionProfilePage } from "../../../../pages/admin/gold_standard/package_versions"
import { valueHelper } from "@aprexis/aprexis-api-utility"
import { pathHelper } from "../../../../../helpers"

class PackageVersionRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const packageVersionPrefix = pathHelper.singularPrefix(window.location, "package-versions", ":package_version_id")

    return (
      <Switch>
        <Route
          exact
          path={`${packageVersionPrefix}/profile`}
          render={(props) => (<PackageVersionProfilePage {...props} {...contextProps} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { PackageVersionRouting }
