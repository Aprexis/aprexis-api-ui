import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { NoMatch } from "../../.."
import { MaintenanceMedicationProfilePage } from "../../../../pages/admin/gold_standard/maintenance_medications"
import { valueHelper } from "@aprexis/aprexis-api-utility"
import { pathHelper } from "../../../../../helpers"

class MaintenanceMedicationRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const maintenanceMedicationPrefix = pathHelper.singularPrefix(window.location, "maintenance-medications", ":package_id")

    return (
      <Switch>
        <Route
          exact
          path={`${maintenanceMedicationPrefix}/profile`}
          render={(props) => (<MaintenanceMedicationProfilePage {...props} {...contextProps} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { MaintenanceMedicationRouting }
