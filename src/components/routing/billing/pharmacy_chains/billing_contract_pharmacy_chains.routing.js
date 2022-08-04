import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { BillingContractPharmacyChainRouting } from "./"
import { NoMatch } from "../../"
import { BillingContractPharmacyChainsPage } from "../../../pages/billing/pharmacy_chains"
import { valueHelper } from '@aprexis/aprexis-api-utility'
import { pathHelper } from "../../../../helpers"

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
