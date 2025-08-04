import { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { BillingContractRouting } from "./billing_contract.routing.js"
import { NoMatch } from "../../index.js"
import { BillingContractsPage } from "../../../pages/billing/contracts/index.js"
import { valueHelper } from '@aprexis/aprexis-api-utility'
import { pathHelper } from "../../../../helpers/index.js"

class BillingContractsRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const billingContractsPrefix = pathHelper.pluralPrefix(window.location, "billing-contracts")

    return (
      <Switch>
        <Route
          exact
          path={billingContractsPrefix}
          render={(props) => (<BillingContractsPage {...props} {...contextProps} />)}
        />
        <Route
          path={`${billingContractsPrefix}/:billing_contract_id`}
          render={(props) => (<BillingContractRouting {...props} {...contextProps} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { BillingContractsRouting }
