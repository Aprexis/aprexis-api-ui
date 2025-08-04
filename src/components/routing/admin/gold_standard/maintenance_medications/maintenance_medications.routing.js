import { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { MaintenanceMedicationRouting } from "./maintenance_medication.routing.js"
import { NoMatch } from "../../../index.js"
import { MaintenanceMedicationsPage } from "../../../../pages/admin/gold_standard/maintenance_medications/index.js"
import { valueHelper } from "@aprexis/aprexis-api-utility"
import { pathHelper } from "../../../../../helpers/index.js"

class MaintenanceMedicationsRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const maintenanceMedicationsPrefix = pathHelper.pluralPrefix(window.location, "maintenance-medications")

    return (
      <Switch>
        <Route
          exact
          path={maintenanceMedicationsPrefix}
          render={(props) => (<MaintenanceMedicationsPage {...props} {...contextProps} />)}
        />
        <Route
          path={`${maintenanceMedicationsPrefix}/:package_id`}
          render={(props) => (<MaintenanceMedicationRouting {...props} {...contextProps} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { MaintenanceMedicationsRouting }
