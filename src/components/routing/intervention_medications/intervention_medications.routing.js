import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { InterventionMedicationRouting } from "./"
import { NoMatch } from "../"
import { InterventionMedicationsPage } from "../../pages/intervention_medications"
import { valueHelper } from "@aprexis/aprexis-api-utility"
import { pathHelper } from "../../../helpers"

class InterventionMedicationsRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const interventionMedicationsPrefix = pathHelper.pluralPrefix(window.location, "intervention-medications")

    return (
      <Switch>
        <Route
          exact
          path={interventionMedicationsPrefix}
          render={(props) => (<InterventionMedicationsPage {...props} {...contextProps} />)}
        />
        <Route
          path={`${interventionMedicationsPrefix}/:intervention_medication_id`}
          render={(props) => (<InterventionMedicationRouting {...props} {...contextProps} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { InterventionMedicationsRouting }
