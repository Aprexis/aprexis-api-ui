import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { MedicationRouting } from "./"
import { NoMatch } from "../../"
import { MedicationsPage } from "../../../pages/admin/medications"
import { pathHelper, valueHelper } from "../../../../helpers"

class MedicationsRouting extends Component {
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
          render={(props) => (<MedicationsPage {...props} {...contextProps} />)}
        />
        <Route
          path={`${medicationsPrefix}/:medication_id`}
          render={(props) => (<MedicationRouting {...props} {...contextProps} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { MedicationsRouting }
