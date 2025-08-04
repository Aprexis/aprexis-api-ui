import { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { NoMatch } from "../index.js"
//import { PatientSupplementProfilePage } from "../../pages/patient_supplements/index.js"
//import { valueHelper } from '@aprexis/aprexis-api-utility'
//import { pathHelper } from "../../../helpers/index.js"

class PatientSupplementRouting extends Component {
  render() {
    /*
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const patientSupplementPrefix = pathHelper.singularPrefix(
      window.location,
      "patient-supplements",
      ":patient_supplement_id"
    )
    */

    return (
      <Switch>
        {/*
        <Route
          exact
          path={`${patientSupplementPrefix}/profile`}
          render={(props) => (<PatientSupplementProfilePage {...props} {...contextProps} />)}
        />
        */}
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { PatientSupplementRouting }
