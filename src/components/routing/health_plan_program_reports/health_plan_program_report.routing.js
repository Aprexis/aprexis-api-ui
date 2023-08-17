import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { NoMatch } from ".."
import { HealthPlanProgramReportProfilePage } from "../../pages/health_plan_program_reports"
import { valueHelper } from '@aprexis/aprexis-api-utility'
import { pathHelper } from "../../../helpers"

class HealthPlanProgramReportRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const healthPlanProgramReportPrefix = pathHelper.singularPrefix(window.location, "health-plan-program-reports", ":health_plan_program_report_id")

    return (
      <Switch>
        <Route
          exact
          path={`${healthPlanProgramReportPrefix}/profile`}
          render={(props) => (<HealthPlanProgramReportProfilePage {...props} {...contextProps} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { HealthPlanProgramReportRouting }
