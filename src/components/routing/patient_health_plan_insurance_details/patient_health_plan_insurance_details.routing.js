import { Component } from "react"
import { Route, Switch } from "react-router-dom"
//import { PatientHealthPlanInsuranceDetailRouting } from "./patient_health_plan_insurance_detail.routing.js"
import { NoMatch } from "../index.js"
//import { PatientHealthPlanInsuranceDetailsPage } from "../../pages/patient_health_plan_insurance_details/index.js"
import { PatientHealthPlanInsuranceDetailProfileForPatientPage } from "../../pages/patient_health_plan_insurance_details/index.js"
import { valueHelper } from '@aprexis/aprexis-api-utility'
import { pathHelper } from "../../../helpers/index.js"

class PatientHealthPlanInsuranceDetailsRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const patientHealthPlanInsuranceDetailsPrefix = pathHelper.pluralPrefix(window.location, "patient-health-plan-insurance-details")

    return (
      <Switch>
        <Route
          exact
          path={`${patientHealthPlanInsuranceDetailsPrefix}/profile-for-patient`}
          render={(props) => (<PatientHealthPlanInsuranceDetailProfileForPatientPage {...props} {...contextProps} />)}
        />
        {/*
        <Route
          exact
          path={patientHealthPlanInsuranceDetailsPrefix}
          render={(props) => (<PatientHealthPlanInsuranceDetailsPage {...props} {...contextProps} />)}
        />
        <Route
          path={`${patientHealthPlanInsuranceDetailsPrefix}/:patient_health_plan_insurance_detail_id`}
          render={(props) => (<PatientHealthPlanInsuranceDetailRouting {...props} {...contextProps} />)}
        />
      */}
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { PatientHealthPlanInsuranceDetailsRouting }
