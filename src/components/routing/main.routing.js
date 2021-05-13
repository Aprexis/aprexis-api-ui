import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { NoMatch } from "./"
import { AdminRouting } from "./admin"
import { HealthPlansRouting } from "./health_plans"
import { LabTestsRouting } from "./lab_tests"
import { PharmacyChainsRouting } from "./pharmacy_chains"
import { PharmacyStoresRouting } from "./pharmacy_stores"
import { UsersRouting } from "./users"
import { DashboardPage, HomePage } from "../pages"
import { valueHelper } from "../../helpers"
class MainRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }

    return (
      <Switch>
        <Route
          exact
          path="/"
          render={(props) => (<HomePage {...props} {...contextProps} />)}
        />
        <Route
          exact
          path="/dashboard"
          render={(props) => (<DashboardPage {...this.props} {...contextProps} />)}
        />
        <Route path="/admin" render={(props) => (<AdminRouting {...props} {...contextProps} />)} />
        <Route path="/health-plans" render={(props) => (<HealthPlansRouting {...props} {...contextProps} />)} />
        <Route path="/lab-tests" render={(props) => (<LabTestsRouting {...props} {...contextProps} />)} />
        <Route
          path="/pharmacy-chains"
          render={(props) => (<PharmacyChainsRouting {...props} {...contextProps} />)}
        />
        <Route
          path="/pharmacy-stores"
          render={(props) => (<PharmacyStoresRouting {...props} {...contextProps} />)}
        />
        <Route path="/users" render={(props) => (<UsersRouting {...props} {...contextProps} />)} />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { MainRouting }
