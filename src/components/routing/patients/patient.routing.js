import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { NoMatch } from "../"
import { InterventionsRouting } from "../interventions"
import { LabTestValuesRouting } from "../lab_test_values"
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
          path={`${patientPrefix}/interventions`}
          render={(props) => (<InterventionsRouting {...props} {...contextProps} />)}
        />
        <Route
          path={`${patientPrefix}/lab-test-values`}
          render={(props) => (<LabTestValuesRouting {...props} {...contextProps} />)}
        />
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
