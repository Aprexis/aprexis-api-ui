import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { NoMatch } from "../../"
import { BillingContractPharmacyStoreProfilePage } from "../../../pages/billing/pharmacy_stores"
import { valueHelper } from '@aprexis/aprexis-api-utility'
import { pathHelper } from "../../../../helpers"
class BillingContractPharmacyStoreRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const billingContractPharmacyStorePrefix = pathHelper.singularPrefix(
      window.location,
      "billing-contract-pharmacy-stores",
      ":billing_contract_pharmacy_store_id"
    )

    return (
      <Switch>
        <Route
          exact
          path={`${billingContractPharmacyStorePrefix}/profile`}
          render={(props) => (<BillingContractPharmacyStoreProfilePage {...props} {...contextProps} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { BillingContractPharmacyStoreRouting }
