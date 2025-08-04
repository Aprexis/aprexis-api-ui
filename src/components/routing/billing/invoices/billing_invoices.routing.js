import { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { BillingInvoiceRouting } from "./billing_invoice.routing.js"
import { NoMatch } from "../../index.js"
import { BillingInvoicesPage } from "../../../pages/billing/invoices/index.js"
import { valueHelper } from '@aprexis/aprexis-api-utility'
import { pathHelper } from "../../../../helpers/index.js"

class BillingInvoicesRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const billingInvoicesPrefix = pathHelper.pluralPrefix(window.location, "billing-invoices")

    return (
      <Switch>
        <Route
          exact
          path={billingInvoicesPrefix}
          render={(props) => (<BillingInvoicesPage {...props} {...contextProps} />)}
        />
        <Route
          path={`${billingInvoicesPrefix}/:billing_invoice_id`}
          render={(props) => (<BillingInvoiceRouting {...props} {...contextProps} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { BillingInvoicesRouting }
