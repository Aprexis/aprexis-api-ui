import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { NoMatch } from ".."
import { HealthPlanPatientSearchAlgorithmBatchesRouting } from "./batches"
import { HealthPlanPatientSearchAlgorithmProfilePage } from "../../pages/health_plan_patient_search_algorithms"
import { valueHelper } from '@aprexis/aprexis-api-utility'
import { pathHelper } from "../../../helpers"

class HealthPlanPatientSearchAlgorithmRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const healthPlanPatientSearchAlgorithmPrefix = pathHelper.singularPrefix(window.location, "patient-search-algorithms", ":patient_search_algorithm_id")

    console.log(`Algorithm: ${healthPlanPatientSearchAlgorithmPrefix}`)

    return (
      <Switch>
        <Route
          path={`${healthPlanPatientSearchAlgorithmPrefix}/batches`}
          render={(props) => (<HealthPlanPatientSearchAlgorithmBatchesRouting {...props} {...contextProps} />)}
        />
        <Route
          exact
          path={`${healthPlanPatientSearchAlgorithmPrefix}/profile`}
          render={(props) => (<HealthPlanPatientSearchAlgorithmProfilePage {...props} {...contextProps} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { HealthPlanPatientSearchAlgorithmRouting }
