import { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { valueHelper } from '@aprexis/aprexis-api-utility'
import { NoMatch } from "../../index.js"
import { HealthPlanPatientSearchAlgorithmBatchProfilePage } from "../../../pages/health_plan_patient_search_algorithms/batches/index.js"
import { pathHelper } from "../../../../helpers/index.js"

class HealthPlanPatientSearchAlgorithmBatchRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const healthPlanPatientSearchAlgorithmBatchPrefix = pathHelper.singularPrefix(window.location, "batches", ":batch_id")

    return (
      <Switch>
        <Route
          exact
          path={`${healthPlanPatientSearchAlgorithmBatchPrefix}/profile`}
          render={(props) => (<HealthPlanPatientSearchAlgorithmBatchProfilePage {...props} {...contextProps} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { HealthPlanPatientSearchAlgorithmBatchRouting }
