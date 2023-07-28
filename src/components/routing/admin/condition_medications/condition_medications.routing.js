import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { ConditionMedicationRouting } from "./"
import { NoMatch } from "../.."
import { ConditionMedicationsPage } from "../../../pages/admin/condition_medications"
import { valueHelper } from "@aprexis/aprexis-api-utility"
import { pathHelper } from "../../../../helpers"

class ConditionMedicationsRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const conditionMedicationPrefix = pathHelper.pluralPrefix(window.location, "condition-medications")

    return (
      <Switch>
        <Route
          exact
          path={conditionMedicationPrefix}
          render={(props) => (<ConditionMedicationsPage {...props} {...contextProps} />)}
        />
        <Route
          path={`${conditionMedicationPrefix}/:condition_medication_id`}
          render={(props) => (<ConditionMedicationRouting {...props} {...contextProps} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { ConditionMedicationsRouting }
