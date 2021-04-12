import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { PatientRouting } from "./"
import { NoMatch } from "../"
import { PatientsPage } from "../../pages/patients"
import { pathHelper } from "../../../helpers"

class PatientsRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser
    }
    const patientsPrefix = pathHelper.pluralPrefix(window.location, "patients")

    return (
      <Switch>
        <Route
          exact
          path={patientsPrefix}
          render={(props) => (<PatientsPage {...props} {...contextProps} />)}
        />
        <Route
          path={`${patientsPrefix}/:patient_id`}
          render={(props) => (<PatientRouting {...props} {...contextProps} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { PatientsRouting }
