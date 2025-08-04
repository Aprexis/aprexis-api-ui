import { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { NoMatch } from "../index.js"
import { PatientAllergyProfilePage } from "../../pages/patient_allergies/index.js"
import { valueHelper } from '@aprexis/aprexis-api-utility'
import { pathHelper } from "../../../helpers/index.js"

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
