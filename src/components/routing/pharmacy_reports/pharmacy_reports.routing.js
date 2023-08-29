import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { PharmacyReportRouting } from "./"
import { NoMatch } from "../"
import { PharmacyReportsPage } from "../../pages/pharmacy_reports"
import { valueHelper } from '@aprexis/aprexis-api-utility'
import { pathHelper } from "../../../helpers"

class PharmacyReportsRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const pharmacyReportsPrefix = pathHelper.pluralPrefix(window.location, "pharmacy-reports")

    return (
      <Switch>
        <Route
          exact
          path={pharmacyReportsPrefix}
          render={(props) => (<PharmacyReportsPage {...props} {...contextProps} />)}
        />
        <Route
          path={`${pharmacyReportsPrefix}/:pharmacy_report_id`}
          render={(props) => (<PharmacyReportRouting {...props} {...contextProps} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { PharmacyReportsRouting }
