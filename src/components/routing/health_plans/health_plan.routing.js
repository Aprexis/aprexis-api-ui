import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { NoMatch } from "../"
import { PatientsRouting } from "../patients"
import { HealthPlanPatientSearchAlgorithmsPage, HealthPlanProfilePage } from "../../pages/health_plans"
import { pathHelper } from "../../../helpers"

class HealthPlanRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser
    }
    const healthPlanPrefix = pathHelper.singularPrefix(window.location, "health-plans", ":health_plan_id")

    return (
      <Switch>
        <Route
          exact
          path={`${healthPlanPrefix}/patient-search-algorithms`}
          render={(props) => (<HealthPlanPatientSearchAlgorithmsPage {...props} {...contextProps} />)}
        />
        <Route
          path={`${healthPlanPrefix}/patients`}
          render={(props) => (<PatientsRouting {...props} {...contextProps} />)}
        />
        <Route
          exact
          path={`${healthPlanPrefix}/profile`}
          render={(props) => (<HealthPlanProfilePage {...props} {...contextProps} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { HealthPlanRouting }
