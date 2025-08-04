import { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { NoMatch } from "../index.js"
import { DryRunProgramPatientAssignmentsRouting } from "../dry_run_program_patient_assignments/index.js"
import { InterventionsRouting } from "../interventions/index.js"
import { PharmacyStoreProgramReportsRouting } from "../pharmacy_store_program_reports/index.js"
import { ProgramProfilePage, PatientAssignmentAlgorithmPage } from "../../pages/programs/index.js"
import { valueHelper } from '@aprexis/aprexis-api-utility'
import { pathHelper } from "../../../helpers/index.js"

class ProgramRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const programPrefix = pathHelper.singularPrefix(window.location, "programs", ":program_id")

    return (
      <Switch>
        <Route
          path={`${programPrefix}/dry-run-program-patient-assignments`}
          render={(props) => (<DryRunProgramPatientAssignmentsRouting {...props} {...contextProps} />)}
        />
        <Route
          path={`${programPrefix}/interventions`}
          render={(props) => (<InterventionsRouting {...props} {...contextProps} />)}
        />
        <Route
          exact
          path={`${programPrefix}/patient-assignment-algorithm`}
          render={(props) => (<PatientAssignmentAlgorithmPage {...props} {...contextProps} />)}
        />
        <Route
          path={`${programPrefix}/pharmacy-store-program-reports`}
          render={(props) => (<PharmacyStoreProgramReportsRouting {...props} {...contextProps} />)}
        />
        <Route
          exact
          path={`${programPrefix}/profile`}
          render={(props) => (<ProgramProfilePage {...props} {...contextProps} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { ProgramRouting }
