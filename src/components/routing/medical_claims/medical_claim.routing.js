import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { NoMatch } from "../"
import { MedicalClaimProfilePage } from "../../pages/medical_claims"
import { pathHelper, valueHelper } from "../../../helpers"

class MedicalClaimRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const medicalClaimPrefix = pathHelper.singularPrefix(window.location, "medical-claims", ":medical_claim_id")

    return (
      <Switch>
        <Route
          exact
          path={`${medicalClaimPrefix}/profile`}
          render={(props) => (<MedicalClaimProfilePage {...props} {...contextProps} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { MedicalClaimRouting }
