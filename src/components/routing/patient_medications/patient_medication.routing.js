import { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { NoMatch } from "../index.js"
//import { PatientMedicationProfilePage } from "../../pages/patient_medications/index.js"
//import { valueHelper } from '@aprexis/aprexis-api-utility'
//import { pathHelper } from "../../../helpers/index.js"

class PatientMedicationRouting extends Component {
  render() {
    /*
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const patientMedicationPrefix = pathHelper.singularPrefix(window.location, "patient-medications", ":patient_medication_id")
    */

    return (
      <Switch>
        {/*
        <Route
          exact
          path={`${patientMedicationPrefix}/profile`}
          render={(props) => (<PatientMedicationProfilePage {...props} {...contextProps} />)}
        />
        */}
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { PatientMedicationRouting }
