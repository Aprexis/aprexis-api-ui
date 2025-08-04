import { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { NoMatch } from "../index.js"
import { PharmacyStoreProgramReportProfilePage } from "../../pages/pharmacy_store_program_reports/index.js"
import { valueHelper } from '@aprexis/aprexis-api-utility'
import { pathHelper } from "../../../helpers/index.js"

class PharmacyStoreProgramReportRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const pharmacyStoreProgramReportPrefix = pathHelper.singularPrefix(window.location, "pharmacy-store-program-reports", ":pharmacy_store_program_report_id")

    return (
      <Switch>
        <Route
          exact
          path={`${pharmacyStoreProgramReportPrefix}/profile`}
          render={(props) => (<PharmacyStoreProgramReportProfilePage {...props} {...contextProps} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { PharmacyStoreProgramReportRouting }
