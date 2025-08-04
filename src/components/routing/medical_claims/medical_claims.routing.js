import { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { MedicalClaimRouting } from "./medical_claim.routing.js"
import { NoMatch } from "../index.js"
import { MedicalClaimsPage } from "../../pages/medical_claims/index.js"
import { valueHelper } from '@aprexis/aprexis-api-utility'
import { pathHelper } from "../../../helpers/index.js"

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
