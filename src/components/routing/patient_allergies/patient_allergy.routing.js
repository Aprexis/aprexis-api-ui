import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { NoMatch } from "../"
import { PatientAllergyProfilePage } from "../../pages/patient_allergies"
import { valueHelper } from '@aprexis/aprexis-api-utility'
import { pathHelper } from "../../../helpers"

class PatientAllergyRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const patientAllergyPrefix = pathHelper.singularPrefix(window.location, "patient-allergies", ":patient_allergy_id")

    return (
      <Switch>
        <Route
          exact
          path={`${patientAllergyPrefix}/profile`}
          render={(props) => (<PatientAllergyProfilePage {...props} {...contextProps} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { PatientAllergyRouting }
