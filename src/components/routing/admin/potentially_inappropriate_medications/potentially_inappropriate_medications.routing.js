import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { PotentiallyInappropriateMedicationRouting } from "./"
import { NoMatch } from "../.."
import { PotentiallyInappropriateMedicationsPage } from "../../../pages/admin/potentially_inappropriate_medications"
import { valueHelper } from '@aprexis/aprexis-api-utility'
import { pathHelper } from "../../../../helpers"

class PotentiallyInappropriateMedicationsRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const medicationsPrefix = pathHelper.pluralPrefix(window.location, "medications")

    return (
      <Switch>
        <Route
          exact
          path={medicationsPrefix}
          render={(props) => (<PotentiallyInappropriateMedicationsPage {...props} {...contextProps} />)}
        />
        <Route
          path={`${medicationsPrefix}/:potentially_inappropriate_medication_id`}
          render={(props) => (<PotentiallyInappropriateMedicationRouting {...props} {...contextProps} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { PotentiallyInappropriateMedicationsRouting }
