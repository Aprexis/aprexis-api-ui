import { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { PatientNoteRouting } from "./patient_note.routing.js"
import { NoMatch } from "../index.js"
import { PatientNotesPage } from "../../pages/patient_notes/index.js"
import { valueHelper } from '@aprexis/aprexis-api-utility'
import { pathHelper } from "../../../helpers/index.js"

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
