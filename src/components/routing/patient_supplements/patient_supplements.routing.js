import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { PatientSupplementRouting } from "./"
import { NoMatch } from "../"
import { PatientSupplementsPage } from "../../pages/patient_supplements"
import { pathHelper, valueHelper } from "../../../helpers"

class PatientSupplementsRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const patientSupplementsPrefix = pathHelper.pluralPrefix(window.location, "patient-supplements")

    return (
      <Switch>
        <Route
          exact
          path={patientSupplementsPrefix}
          render={(props) => (<PatientSupplementsPage {...props} {...contextProps} />)}
        />
        <Route
          path={`${patientSupplementsPrefix}/:patient_supplement_id`}
          render={(props) => (<PatientSupplementRouting {...props} {...contextProps} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { PatientSupplementsRouting }
