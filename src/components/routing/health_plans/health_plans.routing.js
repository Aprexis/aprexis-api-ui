import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { HealthPlanRouting } from "./health_plan.routing"
import { NoMatch } from "../"
import { HealthPlansPage } from "../../pages/health_plans"
import { valueHelper } from '@aprexis/aprexis-api-utility'
import { pathHelper } from "../../../helpers"

class HealthPlansRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const healthPlansPrefix = pathHelper.pluralPrefix(window.location, "health-plans")

    return (
      <Switch>
        <Route
          exact
          path={healthPlansPrefix}
          render={(props) => (<HealthPlansPage {...props} {...contextProps} />)}
        />
        <Route
          path={`${healthPlansPrefix}/:health_plan_id`}
          render={(props) => (<HealthPlanRouting {...props} {...contextProps} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { HealthPlansRouting }
