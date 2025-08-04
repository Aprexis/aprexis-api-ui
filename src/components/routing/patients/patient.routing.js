import { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { NoMatch } from "../index.js"
import { CaregiversRouting } from "../caregivers/index.js"
import { InterventionsRouting } from "../interventions/index.js"
import { LabTestValuesRouting } from "../lab_test_values/index.js"
import { MedicalClaimsRouting } from "../medical_claims/index.js"
import { UserPage } from "../../pages/patients/index.js"
import { PatientAllergiesRouting } from "../patient_allergies/index.js"
import { PatientDiseasesRouting } from "../patient_diseases/index.js"
import { PatientHealthPlanInsuranceDetailsRouting } from "../patient_health_plan_insurance_details/index.js"
import { PatientMedicationsRouting } from "../patient_medications/index.js"
import { PatientNotesRouting } from "../patient_notes/index.js"
import { PatientPhysiciansRouting } from "../patient_physicians/index.js"
import { PatientSupplementsRouting } from "../patient_supplements/index.js"
import { PatientProfilePage } from "../../pages/patients/index.js"
import { PharmacyClaimsRouting } from "../pharmacy_claims/index.js"
import { RemindersRouting } from "../reminders/index.js"
import { valueHelper } from '@aprexis/aprexis-api-utility'
import { pathHelper } from "../../../helpers/index.js"

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
          path={`${patientPrefix}/caregivers`}
          render={(props) => (<CaregiversRouting {...props} {...contextProps} />)}
        />
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
          path={`${patientPrefix}/patient-diseases`}
          render={(props) => (<PatientDiseasesRouting {...props} {...contextProps} />)}
        />
        <Route
          path={`${patientPrefix}/patient-health-plan-insurance-details`}
          render={(props) => (<PatientHealthPlanInsuranceDetailsRouting {...props} {...contextProps} />)}
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
          path={`${patientPrefix}/patient-physicians`}
          render={(props) => (<PatientPhysiciansRouting {...props}  {...contextProps} />)}
        />
        <Route
          path={`${patientPrefix}/patient-supplements`}
          render={(props) => (<PatientSupplementsRouting {...props} {...contextProps} />)}
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
        <Route
          path={`${patientPrefix}/reminders`}
          render={(props) => (<RemindersRouting {...props} {...contextProps} />)}
        />
        <Route
          exact
          path={`${patientPrefix}/user`}
          render={(props) => (<UserPage {...props} {...contextProps} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { PatientRouting }
