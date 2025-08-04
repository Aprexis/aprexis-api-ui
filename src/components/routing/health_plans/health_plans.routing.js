import { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { HealthPlanRouting } from "./health_plan.routing.js"
import { NoMatch } from "../index.js"
import { HealthPlansPage } from "../../pages/health_plans/index.js"
import { valueHelper } from '@aprexis/aprexis-api-utility'
import { pathHelper } from "../../../helpers/index.js"

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
