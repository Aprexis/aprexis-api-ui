import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { NoMatch } from "../"
import { PatientProfilePage } from "../../pages/patients"
import { pathHelper } from "../../../helpers"

class PatientRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser
    }
    const patientPrefix = pathHelper.singularPrefix(window.location, "patients", ":patient_id")

    return (
      <Switch>
        <Route
          exact
          path={`${patientPrefix}/profile`}
          render={(props) => (<PatientProfilePage {...props} {...contextProps} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { PatientRouting }
