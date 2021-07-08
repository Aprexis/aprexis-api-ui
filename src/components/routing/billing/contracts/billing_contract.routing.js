import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { NoMatch } from "../../"
import { BillingContractPharmacyChainsRouting } from "../pharmacy_chains"
import { BillingContractPharmacyStoresRouting } from "../pharmacy_stores"
import { BillingContractProfilePage } from "../../../pages/billing/contracts"
import { pathHelper, valueHelper } from "../../../../helpers"

class BillingContractRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const billingContractPrefix = pathHelper.singularPrefix(
      window.location,
      "billing-contracts",
      ":billing_contract_id"
    )

    return (
      <Switch>
        <Route
          exact
          path={`${billingContractPrefix}/profile`}
          render={(props) => (<BillingContractProfilePage {...props} {...contextProps} />)}
        />
        <Route
          path={`${billingContractPrefix}/billing-contract-pharmacies`}
          render={(props) => (<BillingContractPharmacyChainsRouting {...props} {...contextProps} />)}
        />
        <Route
          path={`${billingContractPrefix}/billing-contract-pharmacy-stores`}
          render={(props) => (<BillingContractPharmacyStoresRouting {...props} {...contextProps} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { BillingContractRouting }
