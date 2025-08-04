import { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { PharmacyClaimRouting } from "./pharmacy_claim.routing.js"
import { NoMatch } from "../index.js"
import { PharmacyClaimsPage } from "../../pages/pharmacy_claims/index.js"
import { valueHelper } from '@aprexis/aprexis-api-utility'
import { pathHelper } from "../../../helpers/index.js"

class PharmacyClaimsRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const PharmacyClaimsPrefix = pathHelper.pluralPrefix(window.location, "pharmacy-claims")

    return (
      <Switch>
        <Route
          exact
          path={PharmacyClaimsPrefix}
          render={(props) => (<PharmacyClaimsPage {...props} {...contextProps} />)}
        />
        <Route
          path={`${PharmacyClaimsPrefix}/:pharmacy_claim_id`}
          render={(props) => (<PharmacyClaimRouting {...props} {...contextProps} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { PharmacyClaimsRouting }
