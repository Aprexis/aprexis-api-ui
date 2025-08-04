import { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { NoMatch } from "../../index.js"
import { BillingContractPharmacyChainProfilePage } from "../../../pages/billing/pharmacy_chains/index.js"
import { valueHelper } from '@aprexis/aprexis-api-utility'
import { pathHelper } from "../../../../helpers/index.js"

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
