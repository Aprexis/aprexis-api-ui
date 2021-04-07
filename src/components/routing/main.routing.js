import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { NoMatch } from "./"
import { HealthPlansRouting } from "./health_plans"
import { PharmacyChainsRouting } from "./pharmacy_chains"
import { UsersRouting } from "./users"
import { DashboardPage, HomePage } from "../pages"

class MainRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser
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
          render={(props) => (<DashboardPage {...props} {...contextProps} />)}
        />
        <Route path="/health-plans" render={(props) => (<HealthPlansRouting {...props} {...contextProps} />)} />
        <Route
          path="/pharmacy-chains"
          render={(props) => (<PharmacyChainsRouting {...props} {...contextProps} />)}
        />
        <Route path="/users" render={(props) => (<UsersRouting {...props} {...contextProps} />)} />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { MainRouting }
