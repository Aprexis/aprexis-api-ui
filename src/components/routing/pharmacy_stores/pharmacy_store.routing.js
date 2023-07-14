import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { NoMatch } from "../"
import { BillingClaimsRouting } from "../billing/claims"
import { DryRunProgramPatientAssignmentsRouting } from "../dry_run_program_patient_assignments"
import { InterventionsRouting } from "../interventions"
import { PatientsRouting } from "../patients"
import { PharmacyStoreProfilePage } from "../../pages/pharmacy_stores"
import { valueHelper } from '@aprexis/aprexis-api-utility'
import { pathHelper } from "../../../helpers"

class PharmacyStoreRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const pharmacyStorePrefix = pathHelper.singularPrefix(window.location, "pharmacy-stores", ":pharmacy_store_id")

    return (
      <Switch>
        <Route
          path={`${pharmacyStorePrefix}/billing-claims`}
          render={(props) => (<BillingClaimsRouting {...props} {...contextProps} />)}
        />
        <Route
          path={`${pharmacyStorePrefix}/dry-run-program-patient-assignments`}
          render={(props) => (<DryRunProgramPatientAssignmentsRouting {...props} {...contextProps} />)}
        />
        <Route
          path={`${pharmacyStorePrefix}/interventions`}
          render={(props) => (<InterventionsRouting {...props} {...contextProps} />)}
        />
        <Route
          path={`${pharmacyStorePrefix}/patients`}
          render={(props) => (<PatientsRouting {...props} {...contextProps} />)}
        />
        <Route
          exact
          path={`${pharmacyStorePrefix}/profile`}
          render={(props) => (<PharmacyStoreProfilePage {...props} {...contextProps} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { PharmacyStoreRouting }
