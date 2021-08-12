import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { PatientPhysicianRouting } from "./"
import { NoMatch } from "../"
import { PatientPhysiciansPage } from "../../pages/patient_physicians"
import { pathHelper, valueHelper } from "../../../helpers"

class PatientPhysiciansRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const patientPhysiciansPrefix = pathHelper.pluralPrefix(window.location, "patient-physicians")

    return (
      <Switch>
        <Route
          exact
          path={patientPhysiciansPrefix}
          render={(props) => (<PatientPhysiciansPage {...props} {...contextProps} />)}
        />
        <Route
          path={`${patientPhysiciansPrefix}/:patient_physician_id`}
          render={(props) => (<PatientPhysicianRouting {...props} {...contextProps} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { PatientPhysiciansRouting }
