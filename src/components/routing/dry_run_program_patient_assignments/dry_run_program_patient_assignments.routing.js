import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { DryRunProgramPatientAssignmentRouting } from "./dry_run_program_patient_assignment.routing"
import { NoMatch } from ".."
import { DryRunProgramPatientAssignmentsPage } from "../../pages/dry_run_program_patient_assignments"
import { valueHelper } from '@aprexis/aprexis-api-utility'
import { pathHelper } from "../../../helpers"

class DryRunProgramPatientAssignmentsRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const dryRunProgramPatientAssignmentsPrefix = pathHelper.pluralPrefix(window.location, "dry-run-program-patient-assignments")

    return (
      <Switch>
        <Route
          exact
          path={dryRunProgramPatientAssignmentsPrefix}
          render={(props) => (<DryRunProgramPatientAssignmentsPage {...props} {...contextProps} />)}
        />
        <Route
          path={`${dryRunProgramPatientAssignmentsPrefix}/:dry_run_program_patient_assignment_id`}
          render={(props) => (<DryRunProgramPatientAssignmentRouting {...props} {...contextProps} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { DryRunProgramPatientAssignmentsRouting }
