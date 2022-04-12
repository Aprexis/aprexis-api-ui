import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { NoMatch } from ".."
//import { PatientDiseaseProfilePage } from "../../pages/patient_diseases"
//import { pathHelper, valueHelper } from "../../../helpers"

class PatientDiseaseRouting extends Component {
  render() {
    //const { context, currentAdminUser, currentUser } = this.props
    //const contextProps = {
    //  context,
    //  currentAdminUser,
    //  currentUser,
    //  ...valueHelper.importantProps(this.props)
    //}
    //const patientDiseasePrefix = pathHelper.singularPrefix(window.location, "patient-allergies", ":patient_disease_id")

    return (
      <Switch>
        {/*
          <Route
            exact
            path={`${patientDiseasePrefix}/profile`}
            render={(props) => (<PatientDiseaseProfilePage {...props} {...contextProps} />)}
          />
        */}
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { PatientDiseaseRouting }
