import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { MedicalClaimRouting } from "./"
import { NoMatch } from "../"
import { MedicalClaimsPage } from "../../pages/medical_claims"
import { pathHelper, valueHelper } from "../../../helpers"

class MedicalClaimsRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const MedicalClaimsPrefix = pathHelper.pluralPrefix(window.location, "medical-claims")

    return (
      <Switch>
        <Route
          exact
          path={MedicalClaimsPrefix}
          render={(props) => (<MedicalClaimsPage {...props} {...contextProps} />)}
        />
        <Route
          path={`${MedicalClaimsPrefix}/:medical_claim_id`}
          render={(props) => (<MedicalClaimRouting {...props} {...contextProps} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { MedicalClaimsRouting }
