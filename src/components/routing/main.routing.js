import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { NoMatch } from "./"
import { AdminRouting } from "./admin"
import { BillingRouting } from "./billing"
import { HealthPlansRouting } from "./health_plans"
import { PharmacyChainsRouting } from "./pharmacy_chains"
import { PharmacyStoresRouting } from "./pharmacy_stores"
import { UsersRouting } from "./users"
import { DashboardPage, HomePage } from "../pages"
import { valueHelper } from '@aprexis/aprexis-api-utility'
import { pathHelper } from "../../helpers"

class MainRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const reactUrlRoot = pathHelper.root()

    return (
      <Switch>
        <Route
          exact
          path={`${reactUrlRoot}/`}
          render={(props) => (<HomePage {...props} {...contextProps} />)}
        />
        <Route
          exact
          path={`${reactUrlRoot}/dashboard`}
          render={(props) => (<DashboardPage {...props} {...this.props} {...contextProps} />)}
        />
        <Route
          path={`${reactUrlRoot}/admin`}
          render={(props) => (<AdminRouting {...props} {...contextProps} />)}
        />
        <Route
          path={`${reactUrlRoot}/billing`}
          render={(props) => (<BillingRouting {...props} {...contextProps} />)}
        />
        <Route
          path={`${reactUrlRoot}/health-plans`}
          render={(props) => (<HealthPlansRouting {...props} {...contextProps} />)}
        />
        <Route
          path={`${reactUrlRoot}/pharmacy-chains`}
          render={(props) => (<PharmacyChainsRouting {...props} {...contextProps} />)}
        />
        <Route
          path={`${reactUrlRoot}/pharmacy-stores`}
          render={(props) => (<PharmacyStoresRouting {...props} {...contextProps} />)}
        />
        <Route
          path={`${reactUrlRoot}/users`}
          render={(props) => (<UsersRouting {...props} {...contextProps} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { MainRouting }
