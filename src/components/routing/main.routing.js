import { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { NoMatch } from "./no_match.js"
import { AdminRouting } from "./admin/index.js"
import { BillingRouting } from "./billing/index.js"
import { HealthPlansRouting } from "./health_plans/index.js"
import { PharmacyChainsRouting } from "./pharmacy_chains/index.js"
import { PharmacyStoresRouting } from "./pharmacy_stores/index.js"
import { UsersRouting } from "./users/index.js"
import { DashboardPage, HomePage } from "../pages/index.js"
import { valueHelper } from '@aprexis/aprexis-api-utility'
import { pathHelper } from "../../helpers/index.js"

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
