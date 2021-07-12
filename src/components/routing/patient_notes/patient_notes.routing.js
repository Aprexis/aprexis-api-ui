import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { PatientNoteRouting } from "./"
import { NoMatch } from "../"
import { PatientNotesPage } from "../../pages/patient_notes"
import { pathHelper, valueHelper } from "../../../helpers"

class PatientNotesRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const patientNotesPrefix = pathHelper.pluralPrefix(window.location, "patient-notes")

    return (
      <Switch>
        <Route
          exact
          path={patientNotesPrefix}
          render={(props) => (<PatientNotesPage {...props} {...contextProps} />)}
        />
        <Route
          path={`${patientNotesPrefix}/:patient_note_id`}
          render={(props) => (<PatientNoteRouting {...props} {...contextProps} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { PatientNotesRouting }
