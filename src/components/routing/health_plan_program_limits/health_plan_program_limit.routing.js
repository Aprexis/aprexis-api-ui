import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { NoMatch } from ".."
//import { HealthPlanProgramLimitProfilePage } from "../../pages/health_plan_program_limits"
//import { pathHelper, valueHelper } from "../../../helpers"

class HealthPlanProgramLimitRouting extends Component {
  render() {
    /*
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const healthPlanProgramLimitPrefix = pathHelper.singularPrefix(window.location, "health-plan-program-limits", ":health_plan_program_limit_id")
    */

    return (
      <Switch>
        {/*
        <Route
          exact
          path={`${healthPlanProgramLimitPrefix}/profile`}
          render={(props) => (<HealthPlanProgramLimitProfilePage {...props} {...contextProps} />)}
        />
    */}
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { HealthPlanProgramLimitRouting }
