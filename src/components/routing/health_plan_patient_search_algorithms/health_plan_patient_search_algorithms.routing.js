import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { HealthPlanPatientSearchAlgorithmRouting } from "./health_plan_patient_search_algorithm.routing"
import { NoMatch } from ".."
import { HealthPlanPatientSearchAlgorithmsPage } from "../../pages/health_plan_patient_search_algorithms"
import { valueHelper } from '@aprexis/aprexis-api-utility'
import { pathHelper } from "../../../helpers"

class HealthPlanPatientSearchAlgorithmsRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const healthPlanPatientSearchAlgorithmsPrefix = pathHelper.pluralPrefix(window.location, "patient-search-algorithms")

    return (
      <Switch>
        <Route
          exact
          path={healthPlanPatientSearchAlgorithmsPrefix}
          render={(props) => (<HealthPlanPatientSearchAlgorithmsPage {...props} {...contextProps} />)}
        />
        <Route
          path={`${healthPlanPatientSearchAlgorithmsPrefix}/:patient_search_algorithm_id`}
          render={(props) => (<HealthPlanPatientSearchAlgorithmRouting {...props} {...contextProps} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { HealthPlanPatientSearchAlgorithmsRouting }
