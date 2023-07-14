import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { NoMatch } from ".."
//import { DryRunProgramPatientAssignmentProfilePage } from "../../pages/dry_run_program_patient_assignments"
//import { valueHelper } from '@aprexis/aprexis-api-utility'
//import { pathHelper } from "../../../helpers"

class DryRunProgramPatientAssignmentRouting extends Component {
  render() {
    /* Enable when needed
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const dryRunProgramPatientAssignmentPrefix = pathHelper.singularPrefix(window.location, "dry-run-program-patient-assignments", ":dry_run_program_patient_assignment_id")
    */

    return (
      <Switch>
        {/* Enable when page exists.
        <Route
          exact
          path={`${dryRunProgramPatientAssignmentPrefix}/profile`}
          render={(props) => (<DryRunProgramPatientAssignmentProfilePage {...props} {...contextProps} />)}
        />
        */}
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { DryRunProgramPatientAssignmentRouting }
