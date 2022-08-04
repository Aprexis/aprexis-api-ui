import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { NoMatch } from "../../"
import { DiagnosisCodeProfilePage } from "../../../pages/admin/diagnosis_codes"
import { valueHelper } from '@aprexis/aprexis-api-utility'
import { pathHelper } from "../../../../helpers"

class DiagnosisCodeRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const diagnosisCodePrefix = pathHelper.singularPrefix(window.location, "diagnosis-codes", ":diagnosis_code_id")

    return (
      <Switch>
        <Route
          exact
          path={`${diagnosisCodePrefix}/profile`}
          render={(props) => (<DiagnosisCodeProfilePage {...props} {...contextProps} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { DiagnosisCodeRouting }
