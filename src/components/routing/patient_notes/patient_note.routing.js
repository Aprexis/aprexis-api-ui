import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { NoMatch } from "../"
//import { PatientNoteProfilePage } from "../../pages/patients"
//import { pathHelper, valueHelper } from "../../../helpers"

class PatientNoteRouting extends Component {
  render() {
    /*
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const patientNotePrefix = pathHelper.singularPrefix(window.location, "patient-notes", ":patient_note_id")
    */

    return (
      <Switch>
        {/*
        <Route
          exact
          path={`${patientNotePrefix}/profile`}
          render={(props) => (<PatientNoteProfilePage {...props} {...contextProps} />)}
        />
        */}
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { PatientNoteRouting }
