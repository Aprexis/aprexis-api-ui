import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { NoMatch } from "../"
import { PharmacyReportProfilePage } from "../../pages/pharmacy_reports"
import { valueHelper } from '@aprexis/aprexis-api-utility'
import { pathHelper } from "../../../helpers"

class PharmacyReportRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const pharmacyReportPrefix = pathHelper.singularPrefix(window.location, "pharmacy-reports", ":pharmacy_report_id")

    return (
      <Switch>
        <Route
          exact
          path={`${pharmacyReportPrefix}/profile`}
          render={(props) => (<PharmacyReportProfilePage {...props} {...contextProps} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { PharmacyReportRouting }
