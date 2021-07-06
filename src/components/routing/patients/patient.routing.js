import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { NoMatch } from "../"
import { InterventionsRouting } from "../interventions"
import { LabTestValuesRouting } from "../lab_test_values"
import { MedicalClaimsRouting } from "../medical_claims"
import { PatientAllergiesRouting } from "../patient_allergies"
import { PatientMedicationsRouting } from "../patient_medications"
import { PatientNotesRouting } from "../patient_notes"
import { PatientProfilePage } from "../../pages/patients"
import { PharmacyClaimsRouting } from "../pharmacy_claims"
import { pathHelper, valueHelper } from "../../../helpers"

class PatientRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
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
          path={`${patientPrefix}/medical-claims`}
          render={(props) => (<MedicalClaimsRouting {...props} {...contextProps} />)}
        />
        <Route
          path={`${patientPrefix}/patient-allergies`}
          render={(props) => (<PatientAllergiesRouting {...props} {...contextProps} />)}
        />
        <Route
          path={`${patientPrefix}/patient-medications`}
          render={(props) => (<PatientMedicationsRouting {...props} {...contextProps} />)}
        />
        <Route
          path={`${patientPrefix}/patient-notes`}
          render={(props) => (<PatientNotesRouting {...props} {...contextProps} />)}
        />
        <Route
          path={`${patientPrefix}/pharmacy-claims`}
          render={(props) => (<PharmacyClaimsRouting {...props} {...contextProps} />)}
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
