import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { NoMatch } from "../"
import { PatientPhysicianProfilePage } from "../../pages/patient_physicians"
import { valueHelper } from '@aprexis/aprexis-api-utility'
import { pathHelper } from "../../../helpers"

class PatientPhysicianRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const patientPhysicianPrefix = pathHelper.singularPrefix(
      window.location,
      "patient-physicians",
      ":patient_physician_id"
    )

    return (
      <Switch>
        <Route
          exact
          path={`${patientPhysicianPrefix}/profile`}
          render={(props) => (<PatientPhysicianProfilePage {...props} {...contextProps} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { PatientPhysicianRouting }
