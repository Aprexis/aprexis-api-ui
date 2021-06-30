import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { NoMatch } from "../../"
import { BillingContractPharmacyChainProfilePage } from "../../../pages/billing/pharmacy_chains"
import { pathHelper, valueHelper } from "../../../../helpers"

class BillingContractPharmacyChainRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const billingContractPharmacyChainPrefix = pathHelper.singularPrefix(
      window.location,
      "billing-contract-pharmacies",
      ":billing_contract_pharmacy_id"
    )

    console.log(`Location: ${window.location.pathname}`)
    console.log(`Prefix: ${billingContractPharmacyChainPrefix}`)

    return (
      <Switch>
        <Route
          exact
          path={`${billingContractPharmacyChainPrefix}/profile`}
          render={(props) => (<BillingContractPharmacyChainProfilePage {...props} {...contextProps} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { BillingContractPharmacyChainRouting }
