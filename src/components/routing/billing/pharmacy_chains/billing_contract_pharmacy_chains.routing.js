import { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { BillingContractPharmacyChainRouting } from "./billing_contract_pharmacy_chain.routing.js"
import { NoMatch } from "../../index.js"
import { BillingContractPharmacyChainsPage } from "../../../pages/billing/pharmacy_chains/index.js"
import { valueHelper } from '@aprexis/aprexis-api-utility'
import { pathHelper } from "../../../../helpers/index.js"

class BillingContractPharmacyChainsRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const pharmacyChainsPrefix = pathHelper.pluralPrefix(window.location, "billing-contract-pharmacies")

    return (
      <Switch>
        <Route
          exact
          path={pharmacyChainsPrefix}
          render={(props) => (<BillingContractPharmacyChainsPage {...props} {...contextProps} />)}
        />
        <Route
          path={`${pharmacyChainsPrefix}/:pharmacy_chain_id`}
          render={(props) => (<BillingContractPharmacyChainRouting {...props} {...contextProps} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { BillingContractPharmacyChainsRouting }
