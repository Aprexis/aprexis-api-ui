import { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { PotentiallyInappropriateMedicationRouting } from "./potentially_inappropriate_medication.routing.js"
import { NoMatch } from "../../index.js"
import { PotentiallyInappropriateMedicationsPage } from "../../../pages/admin/potentially_inappropriate_medications/index.js"
import { valueHelper } from '@aprexis/aprexis-api-utility'
import { pathHelper } from "../../../../helpers/index.js"

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
