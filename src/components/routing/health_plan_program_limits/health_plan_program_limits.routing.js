import { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { HealthPlanProgramLimitRouting } from "./health_plan_program_limit.routing.js"
import { NoMatch } from "../index.js"
import { HealthPlanProgramLimitsPage } from "../../pages/health_plan_program_limits/index.js"
import { valueHelper } from '@aprexis/aprexis-api-utility'
import { pathHelper } from "../../../helpers/index.js"

class HealthPlanProgramLimitsRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const healthPlanProgramLimitsPrefix = pathHelper.pluralPrefix(window.location, "health-plan-program-limits")

    return (
      <Switch>
        <Route
          exact
          path={healthPlanProgramLimitsPrefix}
          render={(props) => (<HealthPlanProgramLimitsPage {...props} {...contextProps} />)}
        />
        <Route
          path={`${healthPlanProgramLimitsPrefix}/:health_plan_program_limit_id`}
          render={(props) => (<HealthPlanProgramLimitRouting {...props} {...contextProps} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { HealthPlanProgramLimitsRouting }
