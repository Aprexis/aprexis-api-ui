import { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { HealthPlanProgramReportRouting } from "./health_plan_program_report.routing.js"
import { NoMatch } from "../index.js"
import { HealthPlanProgramReportsPage } from "../../pages/health_plan_program_reports/index.js"
import { valueHelper } from '@aprexis/aprexis-api-utility'
import { pathHelper } from "../../../helpers/index.js"

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
