import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { HealthPlanProgramReportRouting } from "."
import { NoMatch } from ".."
import { HealthPlanProgramReportsPage } from "../../pages/health_plan_program_reports"
import { valueHelper } from '@aprexis/aprexis-api-utility'
import { pathHelper } from "../../../helpers"

class HealthPlanProgramReportsRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const healthPlanProgramReportsPrefix = pathHelper.pluralPrefix(window.location, "health-plan-program-reports")

    return (
      <Switch>
        <Route
          exact
          path={healthPlanProgramReportsPrefix}
          render={(props) => (<HealthPlanProgramReportsPage {...props} {...contextProps} />)}
        />
        <Route
          path={`${healthPlanProgramReportsPrefix}/:health_plan_program_report_id`}
          render={(props) => (<HealthPlanProgramReportRouting {...props} {...contextProps} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { HealthPlanProgramReportsRouting }
