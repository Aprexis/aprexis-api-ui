import { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { PatientMedicationRouting } from "./patient_medication.routing.js"
import { NoMatch } from "../index.js"
import { PatientMedicationsPage } from "../../pages/patient_medications/index.js"
import { valueHelper } from '@aprexis/aprexis-api-utility'
import { pathHelper } from "../../../helpers/index.js"

class PatientMedicationsRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const patientMedicationsPrefix = pathHelper.pluralPrefix(window.location, "patient-medications")

    return (
      <Switch>
        <Route
          exact
          path={patientMedicationsPrefix}
          render={(props) => (<PatientMedicationsPage {...props} {...contextProps} />)}
        />
        <Route
          path={`${patientMedicationsPrefix}/:patient_medication_id`}
          render={(props) => (<PatientMedicationRouting {...props} {...contextProps} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { PatientMedicationsRouting }
