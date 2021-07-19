import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { NoMatch } from "../../"
//import { BillingContractTermProfilePage } from "../../../pages/billing/terms"
//import { pathHelper, valueHelper } from "../../../../helpers"

class BillingContractTermRouting extends Component {
  render() {
    /*
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const billingContractTermPrefix = pathHelper.singularPrefix(
      window.location,
      "billing-contract-term",
      ":billing_contract_term_id"
    )
    */

    return (
      <Switch>
        {/*
        <Route
          exact
          path={`${billingContractTermPrefix}/profile`}
          render={(props) => (<BillingContractTermProfilePage {...props} {...contextProps} />)}
        />
        */}
        <Route component={NoMatch} />
      </Switch >
    )
  }
}

export { BillingContractTermRouting }
