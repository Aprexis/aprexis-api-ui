import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { valueHelper } from '@aprexis/aprexis-api-utility'
import { HealthPlanPatientSearchAlgorithmBatchRouting } from "./health_plan_patient_search_algorithm_batch.routing"
import { NoMatch } from "../.."
import { pathHelper } from "../../../../helpers"

class HealthPlanPatientSearchAlgorithmBatchesRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const healthPlanPatientSearchAlgorithmsPrefix = pathHelper.pluralPrefix(window.location, "batches")

    console.log(`Batches: ${healthPlanPatientSearchAlgorithmsPrefix}`)

    return (
      <Switch>
        <Route
          path={`${healthPlanPatientSearchAlgorithmsPrefix}/:batch_id`}
          render={(props) => (<HealthPlanPatientSearchAlgorithmBatchRouting {...props} {...contextProps} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { HealthPlanPatientSearchAlgorithmBatchesRouting }
