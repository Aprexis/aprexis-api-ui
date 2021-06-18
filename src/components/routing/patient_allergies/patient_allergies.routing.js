import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { PatientAllergyRouting } from "./"
import { NoMatch } from "../"
import { PatientAllergiesPage } from "../../pages/patients"
import { pathHelper, valueHelper } from "../../../helpers"

class PatientAllergiesRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const patientAllergiesPrefix = pathHelper.pluralPrefix(window.location, "patient-allergies")

    return (
      <Switch>
        <Route
          exact
          path={patientAllergiesPrefix}
          render={(props) => (<PatientAllergiesPage {...props} {...contextProps} />)}
        />
        <Route
          path={`${patientAllergiesPrefix}/:patient_allergy_id`}
          render={(props) => (<PatientAllergyRouting {...props} {...contextProps} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { PatientAllergiesRouting }
