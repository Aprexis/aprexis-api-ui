import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { NoMatch } from "../.."
import { ConditionMedicationProfilePage } from "../../../pages/admin/condition_medications"
import { valueHelper } from '@aprexis/aprexis-api-utility'
import { pathHelper } from "../../../../helpers"

class ConditionMedicationRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const conditionMedicationPrefix = pathHelper.singularPrefix(window.location, "condition-medications", ":condition_medication_id")

    return (
      <Switch>
        <Route
          exact
          path={`${conditionMedicationPrefix}/profile`}
          render={(props) => (<ConditionMedicationProfilePage {...props} {...contextProps} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { ConditionMedicationRouting }
