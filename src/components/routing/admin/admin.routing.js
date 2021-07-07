import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { DiagnosisCodesRouting } from "./diagnosis_codes"
import { DiseasesRouting } from "./diseases"
import { LabTestsRouting } from "./lab_tests"
import { MedicationsRouting } from "./medications"
import { NoMatch } from "../"
import { pathHelper, valueHelper } from "../../../helpers"

class AdminRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const adminPrefix = pathHelper.pluralPrefix(window.location, "admin")

    return (
      <Switch>
        <Route
          path={`${adminPrefix}/diagnosis-codes`}
          render={(props) => (<DiagnosisCodesRouting {...props} {...contextProps} />)}
        />
        <Route
          path={`${adminPrefix}/diseases`}
          render={(props) => (<DiseasesRouting {...props} {...contextProps} />)}
        />
        <Route
          path={`${adminPrefix}/lab-tests`}
          render={(props) => (<LabTestsRouting {...props} {...contextProps} />)}
        />
        <Route
          path={`${adminPrefix}/medications`}
          render={(props) => (<MedicationsRouting {...props} {...contextProps} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { AdminRouting }
