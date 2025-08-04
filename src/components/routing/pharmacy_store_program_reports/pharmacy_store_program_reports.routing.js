import { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { PharmacyStoreProgramReportRouting } from "./pharmacy_store_program_report.routing.js"
import { NoMatch } from "../index.js"
import { PharmacyStoreProgramReportsPage } from "../../pages/pharmacy_store_program_reports/index.js"
import { valueHelper } from '@aprexis/aprexis-api-utility'
import { pathHelper } from "../../../helpers/index.js"

class PharmacyStoreProgramReportsRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const pharmacyStoreProgramReportsPrefix = pathHelper.pluralPrefix(window.location, "pharmacy-store-program-reports")

    return (
      <Switch>
        <Route
          exact
          path={pharmacyStoreProgramReportsPrefix}
          render={(props) => (<PharmacyStoreProgramReportsPage {...props} {...contextProps} />)}
        />
        <Route
          path={`${pharmacyStoreProgramReportsPrefix}/:pharmacy_store_program_report_id`}
          render={(props) => (<PharmacyStoreProgramReportRouting {...props} {...contextProps} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { PharmacyStoreProgramReportsRouting }
