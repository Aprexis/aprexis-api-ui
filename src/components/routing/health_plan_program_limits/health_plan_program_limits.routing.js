import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { HealthPlanProgramLimitRouting } from "./"
import { NoMatch } from ".."
import { HealthPlanProgramLimitsPage } from "../../pages/health_plan_program_limits"
import { valueHelper } from '@aprexis/aprexis-api-utility'
import { pathHelper } from "../../../helpers"

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
